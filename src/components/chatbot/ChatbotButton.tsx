'use client';

import React, { useState } from 'react';

import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

import { Button } from '../ui/button';
import ChatWindow from './ChatWindow';

interface ChatbotButtonProps {
  title?: string;
  welcomeMessage?: string;
  onSendMessage: (
    message: string,
    language?: 'en' | 'cn'
  ) => Promise<{ response: string; navigateToSection?: string | null }>;
}

const ChatbotButton: React.FC<ChatbotButtonProps> = ({
  title = 'Mavis Chat',
  welcomeMessage = 'Hi there! 👋 This is Mavis. How can I help you today?',
  onSendMessage,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  const initialMessages = welcomeMessage
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

      <ChatWindow
        title={title}
        initialMessages={initialMessages}
        onSendMessage={handleSendMessage}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};

export default ChatbotButton;
