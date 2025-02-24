export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export const SYSTEM_PROMPT = `You are an AI assistant for ${process.env.NEXT_PUBLIC_CLINIC_NAME}. 
Your role is to help patients with their inquiries and identify if they want to make a booking.
If they want to make a booking, clearly indicate this in your response.
Use the provided FAQ data when possible, and maintain a professional, friendly tone.
Do not make up information that isn't in the provided data.`;

export async function analyzeIntent(
  message: string,
  history: ChatMessage[]
): Promise<{
  isBookingRequest: boolean;
  response: string;
}> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, history }),
    });

    if (!response.ok) {
      throw new Error('Failed to get response');
    }

    return await response.json();
  } catch (error) {
    console.error('Chat API Error:', error);
    return {
      isBookingRequest: false,
      response: "I apologize, but I'm having trouble processing your request. Please try again later or contact the clinic directly."
    };
  }
} 