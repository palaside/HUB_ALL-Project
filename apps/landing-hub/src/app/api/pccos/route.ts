import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ 
  model: "gemini-2.5-flash",
  systemInstruction: "You are the 'PCCOS Core Intent Interpreter', an advanced AI operating system for the PALASIDE project. You speak in a concise, slightly robotic, but highly intelligent and helpful tone. Acknowledge commands as 'directives'. Do not break character. Keep your answers brief (1-3 sentences) unless asked for details. IMPORTANT: You must always respond in the Thai language (ภาษาไทย) for all interactions."
});

export async function GET() {
  // Mock Real-time Health Data
  return NextResponse.json({
    interpreterStatus: Math.random() > 0.8 ? 'PROCESSING' : 'IDLE',
    coreLoad: Math.floor(Math.random() * 40) + 10,
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { command, type } = body;

  if (type === 'QUICK_ACTION') {
    if (command === 'EMERGENCY_STOP') {
      return NextResponse.json({ message: 'CRITICAL: Emergency Stop Engaged. All systems halted.' });
    }
    if (command === 'REPLAN') {
      return NextResponse.json({ message: 'Task Re-planning initiated. Gathering new context...' });
    }
  }

  // Real LLM Chat Processing
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ message: "ERROR: GEMINI_API_KEY not found in server environment." });
    }
    
    // Call Gemini API
    const result = await model.generateContent(command);
    const responseText = result.response.text();
    
    return NextResponse.json({ message: responseText });
    
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ 
      message: "SYSTEM ERROR: Failed to reach Intent Interpreter core (API Error)." 
    });
  }
}
