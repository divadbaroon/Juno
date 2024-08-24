import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Retrieve Google Cloud API key from .env
    const googleSpeechAPI = process.env.GOOGLE_SPEECH_API
    const googleSpeechEndPoint = process.env.GOOGLE_SPEECH_ENDPOINT
    const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

    // Check if the key exists
    if (!googleSpeechAPI) {
      console.error('GOOGLE_SPEECH_API key not found in environment variables')
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
    }

    const keys = {
      GoogleSpeechAPI: googleSpeechAPI,
      GoogleSpeechEndpoint: googleSpeechEndPoint,
      ClerkPublishableKey: clerkPublishableKey
    }

    return NextResponse.json(keys)
  } catch (error) {
    console.error('Failed to retrieve API keys:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}