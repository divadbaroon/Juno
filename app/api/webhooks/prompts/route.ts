import { NextRequest, NextResponse } from 'next/server'
import { getPromptById } from '@/lib/actions/fetchPromptById.action';

export async function GET(request: NextRequest) {
  try {
    const promptId = request.nextUrl.searchParams.get('promptId');

    if (!promptId) {
        return NextResponse.json({ error: 'promptId is required' }, { status: 400 });
      }

    const data = await getPromptById(promptId);

    return NextResponse.json(data)
  } 
  catch (error) 
  {
    console.error('Failed to retrieve prompt data:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}