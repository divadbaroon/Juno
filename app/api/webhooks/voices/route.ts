import { NextRequest, NextResponse } from 'next/server'
import { getVoiceById } from '@/lib/actions/fetchVoiceById.action';

export async function GET(request: NextRequest) {
  try {
    const voiceId = request.nextUrl.searchParams.get('voiceId');

    if (!voiceId) {
        return NextResponse.json({ error: 'voiceId is required' }, { status: 400 });
      }

    const data = await getVoiceById(voiceId);

    return NextResponse.json(data)
  } 
  catch (error) 
  {
    console.error('Failed to retrieve voice data:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}