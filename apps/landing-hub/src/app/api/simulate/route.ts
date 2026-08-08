import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ 
  model: "gemini-2.5-flash",
  systemInstruction: "You are the 'PALASIDE Simulation Engine'. Your job is to simulate the exact behavior, logs, and outputs of specific internal software modules. You will receive the module's name (title), ID, and the user's input parameters. Generate a highly realistic, technical, and formatted console log output representing what that specific module would do. Use technical jargon relevant to the module's name. Respond in Thai language primarily (for the meaning), but keep system logs/tags in English (e.g. [SYS] INITIALIZING...). Output multiple lines of logs as if it were a real terminal execution. Do not use markdown code blocks (```), just output raw text with newlines."
});

export async function POST(request: Request) {
  try {
    const { featureId, title, input } = await request.json();

    if (!input || !title) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const prompt = `Simulate module execution.\nModule Name: ${title}\nModule ID: ${featureId}\nUser Input: ${input}\nGenerate the terminal execution logs now:`;
    
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    return NextResponse.json({ result: responseText });
  } catch (error) {
    console.error("Simulation API Error:", error);
    return NextResponse.json({ error: 'Failed to simulate module execution' }, { status: 500 });
  }
}
