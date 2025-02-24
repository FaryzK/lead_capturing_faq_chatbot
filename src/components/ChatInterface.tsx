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

function TypingIndicator() {
  return (
    <div className="flex items-center space-x-2 p-3 bg-gray-100 rounded-2xl w-16">
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-typing-1"></div>
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-typing-2"></div>
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-typing-3"></div>
    </div>
  );
}

export default function ChatInterface({ userDetails }: ChatInterfaceProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sampleQuestions = [
    "Who are your doctors?",
    "What are your services?",
    "Where is the clinic?",
    "How do I book a session?"
  ];

  useEffect(() => {
    if (!isInitialized) {
      // Initial greeting with stable timestamp
      const timestamp = new Date().toISOString();
      const initialMessages: Message[] = [
        {
          id: '1',
          type: 'text',
          content: `Hey there! 👋 Welcome to our AI assistant! 🤖 Simply type - I'm as smart as ChatGPT and should be able to help :)`,
          sender: 'bot',
          timestamp: new Date(timestamp)
        }
      ];

      setMessages(initialMessages);
      setIsInitialized(true);
    }
  }, [isInitialized]);

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

  const handleSampleQuestionClick = (question: string) => {
    setInputValue(question);
    handleSendMessage(question);
  };

  const handleSendMessage = async (messageText?: string) => {
    const message = messageText || inputValue.trim();
    if (!message) return;

    setInputValue('');
    addMessage(message);
    setHasInteracted(true);

    const newHistory: ChatMessage[] = [
      ...chatHistory, 
      { role: 'user' as const, content: message }
    ];
    setChatHistory(newHistory);

    setIsTyping(true);

    try {
      const { isBookingRequest, response } = await analyzeIntent(message, chatHistory);

      if (isBookingRequest) {
        addMessage('Please fill out the booking form:', 'booking-form', 'bot');
      } else {
        addMessage(response, 'text', 'bot');
        setChatHistory([
          ...newHistory, 
          { role: 'assistant' as const, content: response }
        ]);
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
      {isInitialized && (
        <div className="flex-1 overflow-y-auto p-4">
          {/* Welcome Message */}
          <div className="mb-8 text-s text-gray-800">
            Hey there! 👋 Welcome to our AI assistant! 🤖 Simply type - I'm as smart as ChatGPT and should be able to help :)
          </div>

          {/* Sample Questions - Only show if no interaction yet */}
          {!hasInteracted && (
            <div className="flex flex-col gap-2 my-4">
              {sampleQuestions.map((question, index) => (
                <button
                  key={`question-${index}`}
                  onClick={() => handleSampleQuestionClick(question)}
                  className="text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-700 transition-colors flex items-center justify-between group"
                >
                  <span>{question}</span>
                  <svg 
                    className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transform rotate-45"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" 
                    />
                  </svg>
                </button>
              ))}
            </div>
          )}

          {/* Chat Messages */}
          {messages.slice(1).map((message) => (
            <div
              key={`${message.id}-${message.timestamp.toISOString()}`}
              className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
            >
              {message.type === 'booking-form' ? (
                <div className="w-full">
                  <BookingForm onSubmit={handleBookingSubmit} />
                </div>
              ) : (
                <div
                  className={`
                    inline-block max-w-[80%] rounded-lg p-3
                    ${message.sender === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-900'}
                  `}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="mb-4">
              <TypingIndicator />
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Input Area */}
      <div className="border-t p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={() => handleSendMessage()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
} 