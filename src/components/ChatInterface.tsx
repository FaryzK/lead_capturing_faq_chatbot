"use client";

import { useState, useRef, useEffect } from 'react';
import { CONFIG } from '../config';
import { Message, BookingDetails, MessageType } from '../types/chat';
import BookingForm from './BookingForm';
import { analyzeIntent, ChatMessage } from '@/lib/openai';

interface ChatInterfaceProps {
  userDetails: {
    name: string;
    phone: string;
    email: string;
  };
}

export default function ChatInterface({ userDetails }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Initial greeting
    const initialMessages: Message[] = [
      {
        id: '1',
        type: 'text',
        content: `Hey ${userDetails.name}! 👋 Welcome to our AI assistant! 🤖 Simply type your question - I'm as smart as ChatGPT and should be able to help :)`,
        sender: 'bot',
        timestamp: new Date()
      },
      {
        id: '2',
        type: 'text',
        content: 'You can try asking:',
        sender: 'bot',
        timestamp: new Date()
      }
    ];

    setMessages(initialMessages);
  }, [userDetails.name]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (content: string, type: MessageType = 'text', sender: 'user' | 'bot' = 'user') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      sender,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    addMessage(userMessage);

    // Add to chat history
    const newHistory = [...chatHistory, { role: 'user', content: userMessage }];
    setChatHistory(newHistory);

    setIsTyping(true);

    try {
      const { isBookingRequest, response } = await analyzeIntent(userMessage, chatHistory);

      if (isBookingRequest) {
        addMessage('Please fill out the booking form:', 'booking-form', 'bot');
      } else {
        addMessage(response, 'text', 'bot');
        setChatHistory([...newHistory, { role: 'assistant', content: response }]);
      }
    } catch (error) {
      console.error('Error processing message:', error);
      addMessage(
        "I'm sorry, but I'm having trouble processing your request. Please try again later.",
        'text',
        'bot'
      );
    }

    setIsTyping(false);
  };

  const handleBookingSubmit = (bookingDetails: BookingDetails) => {
    const confirmationMessage = `
      Great! Your appointment booking details have been received:
      
      Service: ${bookingDetails.service}
      Date: ${bookingDetails.date}
      Time: ${bookingDetails.time}
      ${bookingDetails.comments ? `Comments: ${bookingDetails.comments}` : ''}
      
      The team at Dr Chan Family Clinic will get back to you soon to confirm your appointment.
      If you have any other questions or need further assistance, feel free to ask.
    `;

    addMessage(confirmationMessage, 'booking-confirmation', 'bot');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
          >
            <div
              className={`
                inline-block max-w-[80%] rounded-lg p-3
                ${message.sender === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-900'}
              `}
            >
              {message.type === 'booking-form' ? (
                <BookingForm onSubmit={handleBookingSubmit} />
              ) : (
                <div className="whitespace-pre-wrap">{message.content}</div>
              )}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex gap-2 text-gray-500">
            <div className="animate-bounce">.</div>
            <div className="animate-bounce delay-100">.</div>
            <div className="animate-bounce delay-200">.</div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
} 