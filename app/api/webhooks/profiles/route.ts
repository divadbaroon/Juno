import { getAllProfiles } from '../../../../lib/actions/fetchProfileData.action'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const profiles = await getAllProfiles()
    return NextResponse.json(profiles)
  } catch (error) {
    console.error('Failed to retrieve Profile documents:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}