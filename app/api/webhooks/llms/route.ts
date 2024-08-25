import { NextRequest, NextResponse } from 'next/server'
import { getLLMById } from '@/lib/actions/fetchLLMbyId.action';

export async function GET(request: NextRequest) {
  try {
    const llmId = request.nextUrl.searchParams.get('llmId');

    if (!llmId) {
        return NextResponse.json({ error: 'llm ID is required' }, { status: 400 });
      }

    const data = await getLLMById(llmId);

    return NextResponse.json(data)
  } 
  catch (error) 
  {
    console.error('Failed to retrieve llm data:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
