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
        bg-white rounded-lg shadow-lg
        ${isExpanded ? 'w-96 h-[600px]' : 'w-40 h-12'}
        transition-all duration-300 ease-in-out
      `}>
        {!isExpanded ? (
          <button 
            onClick={() => setIsExpanded(true)}
            className="w-full h-full bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Chat with us
          </button>
        ) : (
          <div className="flex flex-col h-full">
            <ChatHeader onClose={() => setIsExpanded(false)} />
            
            <div className="flex-1 overflow-y-auto p-4">
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