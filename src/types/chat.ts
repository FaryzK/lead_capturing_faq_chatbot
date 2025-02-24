export type MessageType = 'text' | 'booking-form' | 'booking-confirmation';

export interface Message {
  id: string;
  type: MessageType;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface BookingDetails {
  service: string;
  date: string;
  time: string;
  comments?: string;
} 