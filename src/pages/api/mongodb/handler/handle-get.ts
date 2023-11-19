import { NextApiRequest, NextApiResponse } from "next";

import { MongoDBApiClient } from "../mongo-db-sl-api-client/mongo-db-api-client";
import { UserZustand } from "../../../../context/context";

export const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const { lobby, user } = req.query;

  let response;

  if (lobby) {
    response = await MongoDBApiClient.getLobbyData(lobby);
  } else if (user) {
    response = await MongoDBApiClient.getUserData(JSON.parse(user as string));
  }

  return res.status(200).json({
    response: response,
  });
};

export default handleGet;
