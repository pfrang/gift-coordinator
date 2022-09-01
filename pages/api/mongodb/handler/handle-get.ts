import { NextApiRequest, NextApiResponse } from "next"

export const handleGet = (req: NextApiRequest, res: NextApiResponse ) => {
  return res.status(200).json({
    fhewi: 'suck it'
  })
}

export default handleGet;
