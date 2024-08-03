import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllProfiles } from '../../../../lib/actions/fetchProfileData.action'
import { IProfile } from '../../../../lib/database/models/profile.model' 

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IProfile[] | { error: string }>
) {
  if (req.method === 'GET') {
    try {
      const profiles = await getAllProfiles()
      res.status(200).json(profiles)
    } catch (error) {
      console.error('Failed to retrieve Profile documents:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}