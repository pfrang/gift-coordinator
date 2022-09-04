import { NextApiRequest, NextApiResponse } from "next"
import handleGet from "./handler/handle-get";




export const handler  = async (req: NextApiRequest, res: NextApiResponse)  => {
  switch(req.method) {
    case "GET":
      return await handleGet(req, res);
    default:
      res.status(405).json({ status: 'Method not allowed' })

  }

}

export default handler;
