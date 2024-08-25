import { NextRequest, NextResponse } from 'next/server'
import { getExtensionsById } from '@/lib/actions/fetchExtensionById.action';

export async function GET(request: NextRequest) {
  try {
    const extensionId = request.nextUrl.searchParams.get('extensionId');

    if (!extensionId) {
        return NextResponse.json({ error: 'extension ID is required' }, { status: 400 });
      }

    const data = await getExtensionsById(extensionId);

    return NextResponse.json(data)
  } 
  catch (error) 
  {
    console.error('Failed to retrieve extension data:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
