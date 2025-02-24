"use client";

interface ChatHeaderProps {
  onClose: () => void;
}

export default function ChatHeader({ onClose }: ChatHeaderProps) {
  return (
    <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
      <div className="flex items-center gap-2">
        <h2 className="font-semibold">Dr Chan Family Clinic Assistant</h2>
        <span className="flex items-center">
          <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
          Online
        </span>
      </div>
      <button 
        onClick={onClose}
        className="text-white hover:text-gray-200 transition"
      >
        ✕
      </button>
    </div>
  );
} 