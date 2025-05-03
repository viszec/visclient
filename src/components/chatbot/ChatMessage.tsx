import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { Avatar } from '@/components/ui/avatar';

import { cn } from '@/lib/utils';

export interface ChatMessageProps {
  content: string;
  type: 'user' | 'bot';
  timestamp: Date;
  messageId?: string; // 添加唯一ID标识
}

// 创建一个全局消息状态缓存
type MessageState = {
  isFullyLoaded: boolean;
  visibleParagraphs: string[];
};

// 全局消息状态缓存
const messageStateCache = new Map<string, MessageState>();

// 配置
const PARAGRAPH_DELAY = 3000; // 段落之间的延迟 (ms)
const DISPLAY_SPEED = 1000; // 段落显示速度 (完整显示一段需要的毫秒数)

const ChatMessage: React.FC<ChatMessageProps> = ({ content, type, timestamp, messageId }) => {
  const isUser = type === 'user';

  // 为消息创建唯一ID
  const uniqueId = useRef(
    messageId || `${type}-${timestamp.getTime()}-${Math.random().toString(36).substring(2, 9)}`
  ).current;

  // 检查缓存中是否有此消息的状态
  const cachedState = messageStateCache.get(uniqueId);

  // 消息状态
  const [visibleParagraphs, setVisibleParagraphs] = useState<string[]>(cachedState?.visibleParagraphs || []);
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0);
  const [isProcessing, setIsProcessing] = useState(!cachedState?.isFullyLoaded && !isUser);
  const [paragraphs, setParagraphs] = useState<string[]>([]);
  const [isFullyLoaded, setIsFullyLoaded] = useState(cachedState?.isFullyLoaded || false);

  // 滚动标记元素
  const messageEndRef = useRef<HTMLDivElement>(null);

  // 在组件顶部添加新的初始化通知功能
  useEffect(() => {
    // 请求通知权限
    if ('Notification' in window && Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  }, []);

  // 创建播放系统声音的函数
  const playSystemSound = () => {
    try {
      // 尝试用系统音效API
      if ('Audio' in window) {
        const context = new (window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const oscillator = context.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.value = 800;
        oscillator.connect(context.destination);
        oscillator.start();
        oscillator.stop(context.currentTime + 0.1);
      } else if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        // 移动设备尝试振动
        navigator.vibrate(50);
      }
    } catch (e) {
      console.log('系统音效播放失败:', e);
    }
  };

  // 处理消息内容
  useEffect(() => {
    // 如果消息已完全加载，无需再次处理
    if (isFullyLoaded) return;

    // 替换matchAll方法
    const regex = /<p class='index-(\d+)'>(.*?)<\/p>/g;
    const matches: Array<{ index: number; text: string }> = [];
    let match;

    while ((match = regex.exec(content)) !== null) {
      matches.push({
        index: parseInt(match[1]),
        text: match[2],
      });
    }

    // 如果找到了带索引的段落
    const newParagraphs: string[] = [];
    if (matches.length > 0) {
      // 按索引排序
      const sortedParts = matches.sort((a, b) => a.index - b.index).map((part) => part.text);

      newParagraphs.push(...sortedParts);
      console.log('找到带索引段落:', sortedParts.length);
      setParagraphs(sortedParts);
    } else {
      // 如果没有找到带索引的段落，尝试直接使用内容
      newParagraphs.push(content);
      setParagraphs([content]);
    }

    if (isUser) {
      // 用户消息直接全部显示
      setVisibleParagraphs(newParagraphs);
      setIsFullyLoaded(true);

      // 更新缓存
      messageStateCache.set(uniqueId, {
        isFullyLoaded: true,
        visibleParagraphs: newParagraphs,
      });

      return;
    }

    // 如果缓存已存在，使用缓存状态
    if (cachedState?.isFullyLoaded) {
      setVisibleParagraphs(cachedState.visibleParagraphs);
      setIsProcessing(false);
      setIsFullyLoaded(true);
      return;
    }

    // 新消息或未完全加载的消息
    if (cachedState?.visibleParagraphs.length) {
      // 部分加载状态恢复
      setVisibleParagraphs(cachedState.visibleParagraphs);
      setCurrentParagraphIndex(cachedState.visibleParagraphs.length);

      // 判断是否还有段落需要加载
      if (cachedState.visibleParagraphs.length < newParagraphs.length) {
        setIsProcessing(true);

        // 延迟显示下一段
        setTimeout(() => {
          setCurrentParagraphIndex(cachedState.visibleParagraphs.length);
        }, PARAGRAPH_DELAY);
      } else {
        setIsProcessing(false);
        setIsFullyLoaded(true);

        // 更新缓存
        messageStateCache.set(uniqueId, {
          isFullyLoaded: true,
          visibleParagraphs: newParagraphs,
        });
      }
      return;
    }

    // 全新的机器人消息，从第一段开始
    if (newParagraphs.length > 0) {
      setCurrentParagraphIndex(0);
      setVisibleParagraphs([]);
      setIsProcessing(true);

      // 显示第一段 - 使用固定的时间
      const firstParagraphTimer = setTimeout(() => {
        setVisibleParagraphs([newParagraphs[0]]);

        // 更新缓存
        messageStateCache.set(uniqueId, {
          isFullyLoaded: false,
          visibleParagraphs: [newParagraphs[0]],
        });

        // 如果只有一段，则处理完成
        if (newParagraphs.length <= 1) {
          setIsProcessing(false);
          setIsFullyLoaded(true);

          // 更新缓存
          messageStateCache.set(uniqueId, {
            isFullyLoaded: true,
            visibleParagraphs: [newParagraphs[0]],
          });
          return;
        }

        // 设置延迟显示下一段的计时器 - 使用固定的PARAGRAPH_DELAY时间
        setTimeout(() => {
          setCurrentParagraphIndex(1);
        }, PARAGRAPH_DELAY);
      }, DISPLAY_SPEED); // 第一段的显示时间

      return () => clearTimeout(firstParagraphTimer);
    }
  }, [content, isUser, isFullyLoaded, uniqueId, cachedState]);

  // 处理后续段落的显示
  useEffect(() => {
    // 跳过不需要处理的情况
    if (
      isFullyLoaded ||
      currentParagraphIndex === 0 ||
      isUser ||
      paragraphs.length === 0 ||
      currentParagraphIndex >= paragraphs.length
    )
      return;

    setIsProcessing(true);

    // 使用系统通知声音替代
    playSystemSound();

    // 添加新段落
    const nextParagraph = paragraphs[currentParagraphIndex];
    const updatedParagraphs = [...visibleParagraphs];

    // 确保不添加重复段落
    if (!updatedParagraphs.includes(nextParagraph)) {
      updatedParagraphs.push(nextParagraph);
      setVisibleParagraphs(updatedParagraphs);

      // 更新缓存
      messageStateCache.set(uniqueId, {
        isFullyLoaded: currentParagraphIndex === paragraphs.length - 1,
        visibleParagraphs: updatedParagraphs,
      });
    }

    // 判断是否还有下一段
    if (currentParagraphIndex < paragraphs.length - 1) {
      // 延迟显示下一段
      setTimeout(() => {
        setCurrentParagraphIndex((prev) => prev + 1);
      }, PARAGRAPH_DELAY);
    } else {
      // 所有段落处理完成
      setIsProcessing(false);
      setIsFullyLoaded(true);
    }
  }, [currentParagraphIndex, paragraphs, isUser, visibleParagraphs, isFullyLoaded, uniqueId]);

  // Scroll to bottom when new paragraphs are added or processing state changes
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [visibleParagraphs, isProcessing]);

  // 时间戳格式化
  const formattedTime = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // 渲染消息气泡
  const renderMessageBubble = (content: string, index: number, isLastBubble: boolean = false) => (
    <div
      key={`message-${uniqueId}-${index}`}
      className={cn('flex w-full mt-4', isUser ? 'justify-end' : 'justify-start')}
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
        <div className={cn('text-[11px] font-medium mb-1 mt-1 text-[#575654]', isUser ? 'text-right' : 'text-left')}>
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
            'py-2 rounded-xl text-xs md:text-[13px] px-3 leading-tight md:leading-normal',
            isUser
              ? 'bg-[#333333af] text-[#fdfdfd] rounded-tr-none ml-6 md:ml-12'
              : 'bg-[#efeee9] text-[#333] rounded-tl-none mr-6 md:mr-12'
          )}
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* 仅在最后一条消息显示时间 */}
        {isLastBubble && <div className="text-[9px] text-gray-800 mt-1">{formattedTime}</div>}
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

      {/* 滚动标记元素 - 确保滚动到最新消息 */}
      <div ref={messageEndRef} />
    </>
  );
};

export default ChatMessage;
