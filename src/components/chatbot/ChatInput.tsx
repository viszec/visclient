import React, { useState } from 'react';

import { SendHorizontal } from 'lucide-react';

import { Button } from '../ui/button';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  language: 'en' | 'cn';
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled = false, language }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2"
    >
      <div className="relative flex-1">
        <input
          type="text"
          placeholder={language === 'cn' ? '聊聊吧...' : "Let's chat..."}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={disabled}
          className="w-full p-2 px-4 border rounded-full focus:outline-none focus:ring-1 focus:ring-[#adaca7] bg-[#efeee9] text-gray-800 placeholder:text-gray-400 text-[13px]"
          style={{ fontSize: '13px' }}
        />
      </div>
      <Button
        type="submit"
        size="icon"
        variant="default"
        disabled={disabled || !message.trim()}
        className="rounded-full border-2 border-[#f9f8f7] bg-[#adaca7] hover:bg-[#adaca7]/80 hover:scale-105 transition-all duration-300"
      >
        <SendHorizontal className="h-4 w-4 text-[#f9f8f7] hover:scale-105 transition-all duration-300" />
      </Button>
    </form>
  );
};

export default ChatInput;
