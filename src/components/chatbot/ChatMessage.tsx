import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { Avatar } from '@/components/ui/avatar';

import { cn } from '@/lib/utils';

export interface ChatMessageProps {
  content: string;
  type: 'user' | 'bot';
  timestamp: Date;
}

// 配置
const PARAGRAPH_DELAY = 2000; // 段落之间的延迟 (ms)
const DISPLAY_SPEED = 300; // 段落显示速度 (完整显示一段需要的毫秒数)

const ChatMessage: React.FC<ChatMessageProps> = ({ content, type, timestamp }) => {
  const isUser = type === 'user';

  // 消息状态
  const [visibleParagraphs, setVisibleParagraphs] = useState<string[]>([]);
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paragraphs, setParagraphs] = useState<string[]>([]);

  // 音效引用
  const popSoundRef = useRef<HTMLAudioElement | null>(null);

  // 滚动标记元素
  const messageEndRef = useRef<HTMLDivElement>(null);

  // 初始化音效
  useEffect(() => {
    // 气泡音效
    popSoundRef.current = new Audio('/sounds/pop.mp3');
    popSoundRef.current.volume = 0.2;

    return () => {
      popSoundRef.current?.pause();
    };
  }, []);

  // 处理消息内容
  useEffect(() => {
    // 分段
    const parts = content.split(/<br\s*\/?><br\s*\/?>/);
    setParagraphs(parts);

    if (isUser) {
      // 用户消息直接全部显示
      setVisibleParagraphs(parts);
      // 播放气泡音
      popSoundRef.current?.play().catch((e) => console.log('音效播放失败:', e));
      return;
    }

    // 机器人消息从第一段开始
    setCurrentParagraphIndex(0);
    setVisibleParagraphs([]);
    setIsProcessing(true);

    // 播放气泡音
    popSoundRef.current?.play().catch((e) => console.log('音效播放失败:', e));

    // 显示第一段
    setTimeout(() => {
      setVisibleParagraphs([parts[0]]);

      // 如果只有一段，则处理完成
      if (parts.length <= 1) {
        setIsProcessing(false);
        return;
      }

      // 设置延迟显示下一段的计时器
      const timer = setTimeout(() => {
        setCurrentParagraphIndex(1);
      }, PARAGRAPH_DELAY);

      return () => clearTimeout(timer);
    }, DISPLAY_SPEED);
  }, [content, isUser]);

  // 处理后续段落的显示
  useEffect(() => {
    // 跳过初始状态和用户消息
    if (currentParagraphIndex === 0 || isUser || currentParagraphIndex >= paragraphs.length) return;

    setIsProcessing(true);

    // 播放气泡音
    popSoundRef.current?.play().catch((e) => console.log('音效播放失败:', e));

    // 显示当前段落
    setTimeout(() => {
      setVisibleParagraphs((prev) => [...prev, paragraphs[currentParagraphIndex]]);

      // 判断是否还有下一段
      if (currentParagraphIndex < paragraphs.length - 1) {
        // 延迟显示下一段
        setTimeout(() => {
          setCurrentParagraphIndex((prev) => prev + 1);
        }, PARAGRAPH_DELAY);
      } else {
        // 所有段落处理完成
        setIsProcessing(false);
      }
    }, DISPLAY_SPEED);
  }, [currentParagraphIndex, paragraphs, isUser]);

  // Scroll to bottom when new paragraphs are added or processing state changes
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [visibleParagraphs, isProcessing]);

  // 时间戳格式化
  const formattedTime = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // 渲染消息气泡
  const renderMessageBubble = (content: string, index: number, isLastBubble: boolean = false) => (
    <div
      key={`message-${index}`}
      className={cn('flex w-full mt-2', isUser ? 'justify-end' : 'justify-start')}
    >
      {/* 头像列 */}
      <div className={cn('flex-shrink-0', isUser ? 'order-2 ml-2' : 'order-1 mr-2')}>
        <Avatar className="h-9 w-9">
          <div className="relative h-full w-full">
            <Image
              src={isUser ? '/images/guest-avatar.svg' : '/images/chat-avatar.png'}
              alt={isUser ? 'User' : 'Mavis'}
              fill
              className="object-cover rounded-full"
            />
          </div>
        </Avatar>
      </div>

      {/* 消息内容列 */}
      <div className={cn('flex flex-col', isUser ? 'order-1 items-end' : 'order-2 items-start')}>
        {/* 消息发送者名称 */}
        <div className={cn('text-[10px] font-medium mb-1 text-[#706e6a]', isUser ? 'text-right' : 'text-left')}>
          {isUser ? 'You' : 'Mavis'}
        </div>

        {/* 消息内容 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: 0.1,
          }}
          className={cn(
            'py-2 rounded-xl text-[13px] px-3',
            isUser
              ? 'bg-[#333333af] text-[#fdfdfd] rounded-tr-none ml-12'
              : 'bg-[#efeee9] text-[#333] rounded-tl-none mr-12'
          )}
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* 仅在最后一条消息显示时间 */}
        {isLastBubble && <div className="text-[9px] text-gray-500 mt-1">{formattedTime}</div>}
      </div>
    </div>
  );

  return (
    <>
      {/* 用户消息 - 直接全部显示 */}
      {isUser &&
        paragraphs.map((paragraph, index) =>
          renderMessageBubble(
            paragraph,
            index,
            index === paragraphs.length - 1 // 最后一段显示时间
          )
        )}

      {/* 机器人消息 - 逐段显示 */}
      {!isUser && (
        <>
          {/* 已显示的段落 */}
          {visibleParagraphs.map((paragraph, index) =>
            renderMessageBubble(
              paragraph,
              index,
              !isProcessing && index === visibleParagraphs.length - 1 // 所有段落完成后，最后一段显示时间
            )
          )}

          {/* 显示typing指示器（三个点） */}
          {isProcessing && (
            <div className="flex w-full mt-3 justify-start">
              {/* 头像列 */}
              <div className="flex-shrink-0 mt-1 mr-2">
                <Avatar className="h-7 w-7">
                  <div className="relative h-full w-full">
                    <Image
                      src="/images/chat-avatar.png"
                      alt="Mavis"
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                </Avatar>
              </div>

              {/* 消息内容列 */}
              <div className="flex flex-col">
                {/* 消息发送者名称 */}
                <div className="text-[10px] font-medium mb-1">Mavis</div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center space-x-1 py-3 px-6 bg-[#efeee9] text-[#333] rounded-2xl rounded-tl-none text-xs"
                >
                  <span
                    className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: '0ms' }}
                  ></span>
                  <span
                    className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: '150ms' }}
                  ></span>
                  <span
                    className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: '300ms' }}
                  ></span>
                </motion.div>
              </div>
            </div>
          )}
        </>
      )}

      {/* 隐藏的音频元素 */}
      <audio
        id="popSound"
        src="/sounds/pop.mp3"
        preload="auto"
      >
        <track
          kind="captions"
          src="/sounds/pop-captions.vtt"
          srcLang="en"
          label="English captions"
        />
      </audio>

      {/* 滚动标记元素 - 确保滚动到最新消息 */}
      <div ref={messageEndRef} />
    </>
  );
};

export default ChatMessage;
