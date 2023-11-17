// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getUser } from './auth/[...thirdweb]'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user =await getUser(req)



  


  res.status(200).json({ name:user })
}
