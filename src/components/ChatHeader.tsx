"use client";

import Logo from './Logo';

interface ChatHeaderProps {
  onClose: () => void;
}

export default function ChatHeader({ onClose }: ChatHeaderProps) {
  return (
    <div className="bg-white border-b p-4 rounded-t-[20px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo />
          <div>
            <h2 className="font-semibold text-gray-800">Dr Chan Family Clinic</h2>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Always active</span>
            </div>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
} 