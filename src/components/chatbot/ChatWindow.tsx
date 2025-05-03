'use client';

import React, { useEffect, useRef, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { HelpCircle, Info, Loader2, Minimize2, X } from 'lucide-react';

import ChatInput from './ChatInput';
import ChatMessage, { ChatMessageProps } from './ChatMessage';

interface ChatWindowProps {
  title?: string;
  initialMessages?: ChatMessageProps[];
  onSendMessage: (
    message: string,
    language: 'en' | 'cn'
  ) => Promise<{ response: string; navigateToSection?: string | null }>;
  isOpen: boolean;
  onClose: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  title = 'Mavis Chat',
  initialMessages = [],
  onSendMessage,
  isOpen,
  onClose,
}) => {
  const [messages, setMessages] = useState<ChatMessageProps[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickButtons, setShowQuickButtons] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const [language, setLanguage] = useState<'en' | 'cn'>('en');
  const [isMinimized, setIsMinimized] = useState(false);

  const handleNewMessage = async (content: string) => {
    // Add user message
    const userMessage: ChatMessageProps = {
      content,
      type: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // 确保传递language参数到API
      const result = await onSendMessage(content, language);
      const { response, navigateToSection } = result;

      // Add bot response
      const botMessage: ChatMessageProps = {
        content: response,
        type: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);

      // 处理导航逻辑
      if (navigateToSection) {
        setTimeout(() => {
          const sectionElement = document.getElementById(navigateToSection);
          if (sectionElement) {
            sectionElement.scrollIntoView({ behavior: 'smooth' });
          }
        }, 1000); // 延迟1秒导航，让用户能看到回复
      }
    } catch (error) {
      // Add error message
      const errorMessage: ChatMessageProps = {
        content: 'Sorry, something went wrong. Please try again.',
        type: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // 修改快捷按钮，根据语言显示不同文本
  const handleQuickButtonClick = async (buttonType: 'question' | 'about') => {
    setShowQuickButtons(false);

    // 使用完全匹配的文本，不要用模糊匹配
    if (buttonType === 'question') {
      const text = language === 'cn' ? '我有问题想问你' : 'I have a question';
      console.log('发送问题按钮:', text);
      await handleNewMessage(text);
    } else if (buttonType === 'about') {
      const text = language === 'cn' ? '想了解你更多' : 'Tell me more about you';
      console.log('发送关于按钮:', text);
      await handleNewMessage(text);
    }
  };

  // 强化版滚动控制 - 处理滚轮事件
  const handleWheel = (e: WheelEvent) => {
    // 始终阻止事件冒泡和默认行为
    e.stopPropagation();
    e.preventDefault();

    if (!chatContainerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;

    // 计算新的滚动位置
    const newScrollTop = scrollTop + e.deltaY;

    // 限制滚动范围在容器内
    if (newScrollTop < 0) {
      chatContainerRef.current.scrollTop = 0;
    } else if (newScrollTop > scrollHeight - clientHeight) {
      chatContainerRef.current.scrollTop = scrollHeight - clientHeight;
    } else {
      chatContainerRef.current.scrollTop = newScrollTop;
    }
  };

  // 添加事件拦截逻辑
  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    const chatWindow = chatWindowRef.current;

    if (!chatContainer || !chatWindow || !isOpen) return;

    // 为消息容器添加滚轮事件监听
    const wheelHandler = (e: WheelEvent) => handleWheel(e);
    chatContainer.addEventListener('wheel', wheelHandler, { passive: false });

    // 为整个聊天窗口添加事件拦截，防止事件冒泡到页面
    const preventScrollPropagation = (e: Event) => {
      e.stopPropagation();
    };

    // 拦截各种可能引起页面滚动的事件
    chatWindow.addEventListener('wheel', preventScrollPropagation, { capture: true });
    chatWindow.addEventListener('touchstart', preventScrollPropagation, { capture: true, passive: false });
    chatWindow.addEventListener('touchmove', preventScrollPropagation, { capture: true, passive: false });

    return () => {
      // 移除所有事件监听器
      chatContainer.removeEventListener('wheel', wheelHandler);
      chatWindow.removeEventListener('wheel', preventScrollPropagation);
      chatWindow.removeEventListener('touchstart', preventScrollPropagation);
      chatWindow.removeEventListener('touchmove', preventScrollPropagation);
    };
  }, [isOpen]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 修改初始欢迎消息逻辑
  useEffect(() => {
    // 当语言改变时，如果没有消息，添加欢迎消息
    if (messages.length === 0) {
      const welcomeMessage =
        language === 'cn'
          ? '你好！👋 我是Mavis。有什么可以帮到你吗？'
          : 'Hi there! 👋 This is Mavis. How can I help you?';

      setMessages([
        {
          content: welcomeMessage,
          type: 'bot',
          timestamp: new Date(),
        },
      ]);
    }
  }, [language, messages.length]);

  // 添加语言切换处理函数
  const handleLanguageChange = () => {
    const newLanguage = language === 'en' ? 'cn' : 'en';
    setLanguage(newLanguage);

    // 清空消息记录并重置
    setMessages([]);
    setShowQuickButtons(true);

    // 欢迎消息会在useEffect中自动添加
  };

  // 添加最小化/最大化切换功能
  const toggleMinimize = () => {
    setIsMinimized((prev) => !prev);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={chatWindowRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={`fixed bottom-4 right-4 w-[370px] ${isMinimized ? 'h-[60px]' : 'h-[600px]'} bg-[#adaca778] backdrop-blur-lg rounded-lg shadow-xl flex flex-col overflow-hidden border border-gray-200 z-50 transition-all duration-300`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-3">
              <h3 className="font-medium text-[#333333c6] text-sm">{title}</h3>

              {/* 语言切换开关放在标题旁边 */}
              <button
                onClick={handleLanguageChange}
                className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-300 focus:outline-none ${language === 'cn' ? 'bg-[#333]' : 'bg-[#333333c4]'}`}
              >
                <span
                  className={`absolute text-[10px] left-1.5 ${language === 'en' ? 'text-white/70 font-bold' : 'text-white/70'}`}
                >
                  EN
                </span>
                <span
                  className={`absolute text-[11px] right-2.5 ${language === 'cn' ? 'text-white/70 font-bold' : 'text-white/70'}`}
                >
                  中
                </span>

                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 ${language === 'cn' ? 'translate-x-6' : 'translate-x-1'}`}
                />
              </button>
            </div>

            <div className="flex items-center space-x-3">
              {/* 最小化按钮 */}
              <button
                onClick={toggleMinimize}
                className="text-[#908f8cc6] hover:text-white transition-colors duration-300"
              >
                <Minimize2 size={16} />
              </button>

              {/* 关闭按钮 */}
              <button
                onClick={onClose}
                className="text-[#908f8cc6] hover:text-white transition-colors duration-300"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* 聊天内容区域 - 只在非最小化状态显示 */}
          {!isMinimized && (
            <>
              <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-4 bg-[#fefdf978] backdrop-blur-lg transparent-scrollbar"
              >
                {messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-gray-500 text-xs">
                    {language === 'cn' ? '还没有消息。开始聊天吧！' : 'No messages yet. Start a conversation!'}
                  </div>
                ) : (
                  <>
                    {messages.map((msg, idx) => (
                      <ChatMessage
                        key={idx}
                        content={msg.content}
                        type={msg.type}
                        timestamp={msg.timestamp}
                      />
                    ))}

                    {/* 快捷按钮区域 - 只在有初始消息且未使用时显示 */}
                    {showQuickButtons && messages.length === 1 && messages[0].type === 'bot' && (
                      <div className="flex flex-col max-w-[60%] space-y-2 mt-4 mb-2 ml-auto">
                        <button
                          onClick={() => handleQuickButtonClick('question')}
                          className="flex items-center justify-center space-x-2 bg-[#adaca7] text-[#f1f1f0] py-2 px-4 rounded-full text-[13px]  hover:bg-[#adaca7]/80 transition-colors"
                        >
                          <span>{language === 'cn' ? '我有问题想问你' : 'I have a question'}</span>
                        </button>
                        <button
                          onClick={() => handleQuickButtonClick('about')}
                          className="flex items-center justify-center space-x-2 bg-[#efeee9] text-[#333] py-2 px-4 rounded-full text-[13px]  hover:bg-[#efeee9]/80 transition-colors"
                        >
                          <span>{language === 'cn' ? '想了解你更多' : 'Tell me more'}</span>
                        </button>
                      </div>
                    )}
                  </>
                )}

                {isLoading && (
                  <div className="flex items-center justify-center py-2">
                    <Loader2 className="h-5 w-5 animate-spin text-[#adaca7]" />
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* 输入框 */}
              <div className="p-4 border-t">
                <ChatInput
                  onSendMessage={handleNewMessage}
                  disabled={isLoading}
                  language={language}
                />
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatWindow;
