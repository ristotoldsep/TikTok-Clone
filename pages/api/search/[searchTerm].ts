import type { NextApiRequest, NextApiResponse } from 'next';

import { searchPostsQuery } from '../../../utils/queries';

import { client } from '../../../utils/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {

    const { searchTerm } = req.query; // We get this from URL

    // Queries
    const videosQuery = searchPostsQuery(searchTerm);
    
    // Actual API calls
    const videos = await client.fetch(videosQuery);

    res.status(200).json(videos);
  }
}