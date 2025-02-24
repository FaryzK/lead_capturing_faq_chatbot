"use client";

interface ChatMenuProps {
  onSelect: (flow: 'emergency' | 'general') => void;
}

export default function ChatMenu({ onSelect }: ChatMenuProps) {
  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={() => onSelect('emergency')}
        className="bg-red-600 text-white p-4 rounded-lg hover:bg-red-700 transition"
      >
        For Emergency
      </button>
      
      <button
        onClick={() => onSelect('general')}
        className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition"
      >
        General Inquiries/Booking
      </button>
    </div>
  );
} 