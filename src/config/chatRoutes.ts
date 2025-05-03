import { NextResponse } from 'next/server';

// Simple chat response example
export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    // Add a slight delay to simulate processing
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simple response logic
    let response = '';

    if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
      response = 'Hello! How can I help you today?';
    } else if (message.toLowerCase().includes('help')) {
      response =
        'I can help with information about services, projects, or scheduling a consultation. What would you like to know?';
    } else if (message.toLowerCase().includes('contact')) {
      response = 'You can reach out via the contact form or directly email at imavisma@gmail.com';
    } else if (message.toLowerCase().includes('service')) {
      response =
        'I offer frontend development, backend & API solutions, digital marketing, and UX/UI design services. Would you like to know more about any specific service?';
    } else if (message.toLowerCase().includes('price') || message.toLowerCase().includes('cost')) {
      response =
        'Pricing depends on the specific project requirements. Would you like to schedule a consultation to discuss your project in detail?';
    } else {
      response = "Thanks for your message! I'll get back to you soon. Is there anything specific you'd like to know?";
    }

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Failed to process chat message' }, { status: 500 });
  }
}
