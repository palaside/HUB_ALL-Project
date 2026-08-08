import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const SYSTEM_INSTRUCTION = `You are the '6C CONTEXT COMPRESSION ENGINE' of the PALASIDE project.
Your purpose is to take messy, raw project requirements or code documentation (the input) and compress them into a highly structured 'JSON Envelope' that represents the pure architectural essence of the request. This prevents AI context overflow in downstream tasks.

You must output ONLY valid JSON without any markdown code blocks (e.g., no \`\`\`json).
The JSON must strictly follow this structure:
{
  "project_name": "String (Extract or infer a short name)",
  "core_objectives": ["Array of string objectives"],
  "key_features": ["Array of string features"],
  "tech_stack_recommendations": ["Array of suggested tech stack"],
  "constraints": ["Array of potential constraints or edge cases"],
  "purity_score": "Number between 90 and 100 representing how well the context was compressed"
}

Respond ONLY in JSON. Use Thai language for the string values inside the JSON.`;

export async function POST(request: Request) {
  try {
    const { input } = await request.json();

    if (!input) {
      return NextResponse.json({ error: 'Missing input for compression' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_INSTRUCTION
    });

    const prompt = `Compress the following raw input into the required JSON format:\n\n${input}`;
    
    const result = await model.generateContent(prompt);
    let responseText = result.response.text().trim();
    
    // Clean up markdown if the LLM hallucinated it
    if (responseText.startsWith('```json')) {
      responseText = responseText.replace(/```json\n?/, '').replace(/```\n?$/, '').trim();
    } else if (responseText.startsWith('```')) {
      responseText = responseText.replace(/```\n?/, '').replace(/```\n?$/, '').trim();
    }

    // Try parsing to validate it
    const jsonEnvelope = JSON.parse(responseText);

    return NextResponse.json({ 
      success: true, 
      envelope: jsonEnvelope 
    });
  } catch (error) {
    console.error("Compression API Error:", error);
    return NextResponse.json({ error: 'Failed to compress context' }, { status: 500 });
  }
}
