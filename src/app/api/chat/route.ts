import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { ChatMessage, SYSTEM_PROMPT } from '@/lib/openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not set in environment variables');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const INTENT_PROMPT = `You are an AI assistant that analyzes user messages to determine if they want to make a new booking/appointment.
Only respond with "true" if the user wants to make a new booking/appointment.
Respond with "false" for all other cases, including:
- Questions about existing bookings
- Canceling bookings
- General questions about services
- Questions about booking policies
- Any other non-booking queries

User message: `;

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { 
        error: 'OpenAI API key not configured',
        isBookingRequest: false,
        response: "I apologize, but the chat service is not properly configured. Please contact the clinic directly."
      },
      { status: 500 }
    );
  }

  try {
    const { message, history } = await request.json();

    // First inference: Check booking intent
    const intentCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: INTENT_PROMPT },
        { role: "user", content: message }
      ],
      temperature: 0,  // Use 0 for more deterministic responses
      max_tokens: 10,
    });

    const isBookingRequest = intentCompletion.choices[0]?.message?.content?.toLowerCase().includes('true');

    // Second inference: Generate response
    const responseCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...history,
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const response = responseCompletion.choices[0]?.message?.content || '';

    return NextResponse.json({ isBookingRequest, response });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process request',
        isBookingRequest: false,
        response: "I apologize, but I'm having trouble processing your request. Please try again later or contact the clinic directly."
      },
      { status: 500 }
    );
  }
} 