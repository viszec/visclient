'use client';

import React, { useEffect, useRef, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Loader2, X } from 'lucide-react';

import ChatInput from './ChatInput';
import ChatMessage, { ChatMessageProps } from './ChatMessage';

// 添加这个全局变量存储滚动位置
let lastScrollPosition = 0;

interface ChatWindowProps {
  title?: string;
  initialMessages?: ChatMessageProps[];
  onSendMessage: (
    message: string,
    language: 'en' | 'cn'
  ) => Promise<{ response: string; navigateToSection?: string | null }>;
  isOpen: boolean;
  isMinimized?: boolean;
  language?: 'en' | 'cn';
  onClose: () => void;
  onToggleChat: () => void;
  onMessagesUpdate?: (messages: ChatMessageProps[]) => void;
  onLanguageChange?: (language: 'en' | 'cn') => void;
  onMinimizeChange?: (isMinimized: boolean) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  title = 'Mavis Chat',
  initialMessages = [],
  onSendMessage,
  isOpen,
  isMinimized: initialIsMinimized = false,
  language: initialLanguage = 'en',
  onClose,
  onToggleChat: _onToggleChat,
  onMessagesUpdate,
  onLanguageChange,
  onMinimizeChange,
}) => {
  // 使用useRef跟踪初始化状态，避免重复初始化
  const isInitialized = useRef(false);

  const [messages, setMessages] = useState<ChatMessageProps[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickButtons, setShowQuickButtons] = useState(initialMessages.length <= 1);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const shouldRestoreScroll = useRef<boolean>(false);
  const [language, setLanguage] = useState<'en' | 'cn'>(initialLanguage);
  const [isMinimized, setIsMinimized] = useState(initialIsMinimized);
  const lastIsMinimized = useRef(initialIsMinimized);
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  // 当语言从外部更新时同步状态
  useEffect(() => {
    setLanguage(initialLanguage);
  }, [initialLanguage]);

  // 当最小化状态从外部更新时同步状态
  useEffect(() => {
    setIsMinimized(initialIsMinimized);
  }, [initialIsMinimized]);

  // 仅在组件首次加载和初始消息变化时初始化消息
  useEffect(() => {
    // 确保只有当初始消息存在且当前没有消息时才初始化
    if (!isInitialized.current && initialMessages.length > 0) {
      setMessages(initialMessages);
      setShowQuickButtons(initialMessages.length <= 1);
      isInitialized.current = true;
    }
  }, [initialMessages]);

  // 当消息更新时，通知父组件
  useEffect(() => {
    if (onMessagesUpdate && messages.length > 0) {
      onMessagesUpdate(messages);
    }
  }, [messages, onMessagesUpdate]);

  // 欢迎消息逻辑 - 仅当没有任何消息时触发
  useEffect(() => {
    // 仅当消息为空时添加欢迎消息，避免重复添加
    if (messages.length === 0 && isOpen) {
      const welcomeMessage =
        language === 'cn'
          ? '你好！👋 我是Mavis。有什么可以帮到你吗？'
          : 'Hi there! 👋 This is Mavis. How can I help you?';

      const welcomeMsg = {
        content: welcomeMessage,
        type: 'bot' as const,
        timestamp: new Date(),
      };

      setMessages([welcomeMsg]);
      if (onMessagesUpdate) {
        onMessagesUpdate([welcomeMsg]);
      }
      setShowQuickButtons(true);
    }
  }, [language, messages.length, onMessagesUpdate, isOpen]);

  // 修改滚动事件监听
  useEffect(() => {
    const handleScroll = () => {
      if (chatContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;

        // 检测是否滚动到底部附近（20px误差范围）
        const isAtBottom = scrollHeight - scrollTop - clientHeight < 20;

        // 保存当前滚动位置
        lastScrollPosition = scrollTop;

        // 更新用户滚动状态
        setIsUserScrolling(!isAtBottom);
      }
    };

    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.addEventListener('scroll', handleScroll);
      return () => {
        chatContainer.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  // 修改滚动逻辑
  useEffect(() => {
    if (!isMinimized && messages.length > 0) {
      const scrollTimer = setTimeout(() => {
        // 只有当用户不是在浏览历史消息时，或者是窗口刚从最小化状态切换回来时，才滚动到底部
        if (!isUserScrolling || (isMinimized === false && lastIsMinimized.current === true)) {
          messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
        lastIsMinimized.current = isMinimized;
      }, 200);

      return () => clearTimeout(scrollTimer);
    }
  }, [messages, isMinimized, isUserScrolling]);

  // 监听聊天窗口开关状态
  useEffect(() => {
    if (isOpen) {
      // 当窗口打开时
      if (messages.length > 0) {
        if (lastScrollPosition > 0) {
          // 如果有保存的滚动位置，标记需要恢复
          shouldRestoreScroll.current = true;
        } else {
          // 如果没有保存的滚动位置，滚动到最新消息
          setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
          }, 300);
        }
      }
    } else {
      // 当窗口关闭时，重置状态
      // 注意：如果你希望在窗口完全关闭后保留滚动位置，则不需要这行
      lastScrollPosition = 0;
      shouldRestoreScroll.current = false;
    }
  }, [isOpen, messages.length]);

  const handleNewMessage = async (content: string) => {
    // Add user message
    const userMessage: ChatMessageProps = {
      content,
      type: 'user',
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    onMessagesUpdate?.(updatedMessages);
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

      const finalMessages = [...updatedMessages, botMessage];
      setMessages(finalMessages);
      onMessagesUpdate?.(finalMessages);

      // 处理导航逻辑
      if (navigateToSection) {
        setTimeout(() => {
          const sectionElement = document.getElementById(navigateToSection);
          if (sectionElement) {
            sectionElement.scrollIntoView({ behavior: 'smooth' });
          }
        }, 1000); // 延迟1秒导航，让用户能看到回复
      }
    } catch (error: unknown) {
      console.error('发送消息错误:', error);
      // Add error message
      const errorMessage: ChatMessageProps = {
        content: 'Sorry, something went wrong. Please try again.',
        type: 'bot',
        timestamp: new Date(),
      };

      const finalMessages = [...updatedMessages, errorMessage];
      setMessages(finalMessages);
      onMessagesUpdate?.(finalMessages);
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

  // 添加语言切换处理函数
  const handleLanguageChange = () => {
    const newLanguage = language === 'en' ? 'cn' : 'en';
    setLanguage(newLanguage);

    // 通知父组件语言变化
    if (onLanguageChange) {
      onLanguageChange(newLanguage);
    }

    // 清空消息记录并重置
    setMessages([]);
    isInitialized.current = false; // 重置初始化状态，允许添加新的欢迎消息
    setShowQuickButtons(true);
  };

  // 添加最小化/最大化切换功能
  const toggleMinimize = () => {
    const newMinimized = !isMinimized;
    setIsMinimized(newMinimized);

    // 通知父组件最小化状态变化
    if (onMinimizeChange) {
      onMinimizeChange(newMinimized);
    }
  };

  // 在组件内添加此useEffect
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 防止双击缩放
      let lastTouchEnd = 0;
      const handleTouchEnd = (e: TouchEvent) => {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
          e.preventDefault();
        }
        lastTouchEnd = now;
      };

      document.addEventListener('touchend', handleTouchEnd);

      return () => {
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={chatWindowRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={`fixed bottom-0 right-1 md:right-4 w-[300px] md:w-[370px] ${
            isMinimized ? 'h-[45px] md:h-[60px] border-b-0' : 'h-[500px] md:h-[600px]'
          } bg-[#adaca778] backdrop-blur-md rounded-lg shadow-xl flex flex-col overflow-hidden border border-gray-200 z-50 transition-all duration-300`}
        >
          {/* Header */}
          <div className={`flex items-center justify-between py-2 px-4 md:py-4 ${!isMinimized && 'border-b'}`}>
            <div className="flex items-center space-x-3">
              <h3 className="font-medium text-[#333333c6] text-sm">{title}</h3>

              {/* 语言切换开关放在标题旁边 */}
              <button
                onClick={handleLanguageChange}
                className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                  language === 'cn' ? 'bg-[#333333c4]' : 'bg-[#333333c4]'
                }`}
              >
                <span
                  className={`absolute text-[10px] left-1.5 ${
                    language === 'en' ? 'text-white/70 font-bold' : 'text-white/70'
                  }`}
                >
                  EN
                </span>
                <span
                  className={`absolute text-[12px] right-2.5 ${
                    language === 'cn' ? 'text-white/70 font-bold' : 'text-white/70'
                  }`}
                >
                  中
                </span>

                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-[#E6E5DF] transition-transform duration-300 ${
                    language === 'cn' ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center space-x-3">
              {/* 最小化/最大化按钮 - 根据状态显示不同箭头 */}
              <button
                onClick={toggleMinimize}
                className="text-[#908f8cc6] hover:text-white transition-colors duration-300"
              >
                {isMinimized ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
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
                className="flex-1 overflow-y-auto p-4 bg-transparent backdrop-blur-md transparent-scrollbar scrollbar-gutter-stable"
              >
                {messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-gray-500 text-xs">
                    {language === 'cn' ? '还没有消息。开始聊天吧！' : 'No messages yet. Start a conversation!'}
                  </div>
                ) : (
                  <>
                    {messages.map((msg, idx) => (
                      <ChatMessage
                        key={`msg-${msg.type}-${msg.timestamp.getTime()}-${idx}`}
                        messageId={`msg-${msg.type}-${msg.timestamp.getTime()}-${idx}`}
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
                          className="flex items-center justify-center space-x-2 bg-[#adaca7] text-[#ffffffed] text-xs py-2 px-4 rounded-full border border-gray-200 md:text-[13px] hover:bg-[#adaca7]/80 transition-colors"
                        >
                          <span>{language === 'cn' ? '我有问题想问你' : 'I have a question'}</span>
                        </button>
                        <button
                          onClick={() => handleQuickButtonClick('about')}
                          className="flex items-center justify-center space-x-2 bg-[#efeee9] text-[#333] text-xs py-2 px-4 rounded-full md:text-[13px] hover:bg-[#efeee9]/80 transition-colors"
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
