"use client";

interface ChatMenuProps {
  onSelect: (flow: 'emergency' | 'general') => void;
}

export default function ChatMenu({ onSelect }: ChatMenuProps) {
  return (
    <div className="p-6 flex flex-col gap-4">
      <button
        onClick={() => onSelect('emergency')}
        className="w-full bg-red-100 text-red-700 p-4 rounded-xl hover:bg-red-200 transition-colors text-left"
      >
        For Emergency
      </button>
      
      <button
        onClick={() => onSelect('general')}
        className="w-full bg-[#e5edff] text-[#1e40af] p-4 rounded-xl hover:bg-blue-100 transition-colors text-left"
      >
        General Inquiries/Booking
      </button>
    </div>
  );
} 