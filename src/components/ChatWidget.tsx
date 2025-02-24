"use client";

import { useState } from 'react';
import ChatHeader from './ChatHeader';
import ChatMenu from './ChatMenu';
import EmergencyFlow from './EmergencyFlow';
import GeneralInquiriesForm from './GeneralInquiriesForm';
import ChatInterface from './ChatInterface';

type FlowType = 'menu' | 'emergency' | 'general' | 'chat';

export default function ChatWidget() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentFlow, setCurrentFlow] = useState<FlowType>('menu');
  const [userDetails, setUserDetails] = useState<{
    name: string;
    phone: string;
    email: string;
  } | null>(null);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`
        bg-white rounded-[20px] shadow-2xl transition-all duration-300 ease-in-out
        ${isExpanded ? 'w-[480px] h-[600px]' : 'w-auto h-auto'}
      `}>
        {!isExpanded ? (
          <button 
            onClick={() => setIsExpanded(true)}
            className="flex items-center gap-2 bg-[#1e2937] text-white px-6 py-3 rounded-[20px] hover:bg-[#2d3748] transition-all"
          >
            <span>Chat with us</span>
            <span className="text-xl">✨</span>
          </button>
        ) : (
          <div className="flex flex-col h-full">
            <ChatHeader onClose={() => setIsExpanded(false)} />
            
            <div className="flex-1 overflow-y-auto">
              {currentFlow === 'menu' && (
                <ChatMenu onSelect={(flow: 'emergency' | 'general') => setCurrentFlow(flow)} />
              )}
              
              {currentFlow === 'emergency' && (
                <EmergencyFlow onBack={() => setCurrentFlow('menu')} />
              )}
              
              {currentFlow === 'general' && (
                <GeneralInquiriesForm 
                  onSubmit={(details) => {
                    setUserDetails(details);
                    setCurrentFlow('chat');
                  }}
                  onBack={() => setCurrentFlow('menu')}
                />
              )}
              
              {currentFlow === 'chat' && userDetails && (
                <ChatInterface userDetails={userDetails} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 