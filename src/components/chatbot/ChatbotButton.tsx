'use client';

import React, { useEffect, useState } from 'react';

import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

import { Button } from '../ui/button';
import { ChatMessageProps } from './ChatMessage';
import ChatWindow from './ChatWindow';

interface ChatbotButtonProps {
  title?: string;
  welcomeMessage?: string;
  onSendMessage: (
    message: string,
    language?: 'en' | 'cn'
  ) => Promise<{ response: string; navigateToSection?: string | null }>;
}

// 本地存储键名
const STORAGE_KEYS = {
  IS_CHAT_OPEN: 'mavis_chat_is_open',
  CHAT_MESSAGES: 'mavis_chat_messages',
  CHAT_LANGUAGE: 'mavis_chat_language',
  IS_MINIMIZED: 'mavis_chat_is_minimized',
};

const ChatbotButton: React.FC<ChatbotButtonProps> = ({
  title = 'Mavis Chat',
  welcomeMessage = 'Hi there! 👋 This is Mavis. How can I help you today?',
  onSendMessage: _onSendMessage,
}) => {
  // 从localStorage初始化状态
  const [isOpen, setIsOpen] = useState(false);
  const [savedMessages, setSavedMessages] = useState<ChatMessageProps[]>([]);
  const [language, setLanguage] = useState<'en' | 'cn'>('en');
  const [isMinimized, setIsMinimized] = useState(false);

  // 页面加载时从localStorage读取状态
  useEffect(() => {
    // 检查浏览器环境
    if (typeof window === 'undefined') return;

    try {
      // 读取聊天窗口开关状态
      const storedIsOpen = localStorage.getItem(STORAGE_KEYS.IS_CHAT_OPEN);
      if (storedIsOpen) {
        setIsOpen(JSON.parse(storedIsOpen));
      }

      // 读取聊天记录
      const storedMessages = localStorage.getItem(STORAGE_KEYS.CHAT_MESSAGES);
      if (storedMessages) {
        const parsedMessages = JSON.parse(storedMessages) as ChatMessageProps[];
        // 将字符串时间戳转换回Date对象
        const messagesWithDates = parsedMessages.map((msg) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));
        setSavedMessages(messagesWithDates);
      }

      // 读取语言设置
      const storedLanguage = localStorage.getItem(STORAGE_KEYS.CHAT_LANGUAGE);
      if (storedLanguage) {
        setLanguage(JSON.parse(storedLanguage));
      }

      // 读取最小化状态
      const storedMinimized = localStorage.getItem(STORAGE_KEYS.IS_MINIMIZED);
      if (storedMinimized) {
        setIsMinimized(JSON.parse(storedMinimized));
      }
    } catch (error) {
      console.error('Error reading chat state from localStorage:', error);
    }
  }, []);

  const toggleChat = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);

    // 保存到localStorage
    localStorage.setItem(STORAGE_KEYS.IS_CHAT_OPEN, JSON.stringify(newIsOpen));

    // 如果是开启聊天，设置为非最小化状态
    if (newIsOpen) {
      setIsMinimized(false);
      localStorage.setItem(STORAGE_KEYS.IS_MINIMIZED, JSON.stringify(false));
    }
  };

  // 更新聊天记录的回调
  const handleMessagesUpdate = (messages: ChatMessageProps[]) => {
    localStorage.setItem(STORAGE_KEYS.CHAT_MESSAGES, JSON.stringify(messages));
  };

  // 更新语言设置的回调
  const handleLanguageChange = (newLanguage: 'en' | 'cn') => {
    setLanguage(newLanguage);
    localStorage.setItem(STORAGE_KEYS.CHAT_LANGUAGE, JSON.stringify(newLanguage));
  };

  // 更新最小化状态的回调
  const handleMinimizeChange = (isMinimized: boolean) => {
    setIsMinimized(isMinimized);
    localStorage.setItem(STORAGE_KEYS.IS_MINIMIZED, JSON.stringify(isMinimized));
  };

  // 处理关闭聊天窗口
  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem(STORAGE_KEYS.IS_CHAT_OPEN, JSON.stringify(false));

    // 清除聊天记录
    localStorage.removeItem(STORAGE_KEYS.CHAT_MESSAGES);
    setSavedMessages([]);
  };

  // 使用保存的消息或欢迎消息
  const initialMessages =
    savedMessages.length > 0
      ? savedMessages
      : welcomeMessage
        ? [
            {
              content: welcomeMessage,
              type: 'bot' as const,
              timestamp: new Date(),
            },
          ]
        : [];

  // Use the API to send messages
  const handleSendMessage = async (message: string, language: 'en' | 'cn') => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, language }),
      });

      const data = await response.json();
      console.log('API响应:', data, '语言:', language);

      return {
        response: data.response,
        navigateToSection: data.navigateToSection,
      };
    } catch (error) {
      console.error('Error sending message:', error);
      return {
        response: 'Sorry, something went wrong. Please try again.',
        navigateToSection: null,
      };
    }
  };

  return (
    <>
      {!isOpen && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          className="fixed bottom-1 right-1 z-50"
        >
          <Button
            onClick={toggleChat}
            size="lg"
            className="fixed md:w-14 md:h-14 w-12 h-12 bottom-4 right-4 bg-[#adaca7] text-[#efeee9] p-2 rounded-full shadow-lg z-[9998] hover:bg-[#adaca7]/80 transition-colors"
          >
            <MessageSquare className="h-6 w-6" />
          </Button>
        </motion.div>
      )}

      <ChatWindow
        title={title}
        initialMessages={initialMessages}
        onSendMessage={handleSendMessage}
        isOpen={isOpen}
        isMinimized={isMinimized}
        language={language}
        onClose={handleClose}
        onToggleChat={toggleChat}
        onMessagesUpdate={handleMessagesUpdate}
        onLanguageChange={handleLanguageChange}
        onMinimizeChange={handleMinimizeChange}
      />
    </>
  );
};

export default ChatbotButton;
