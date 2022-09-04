import MongoDB from "../../../../sql-nodejs/cosmosdb/app";
import { removeDuplicateObjectsInArray } from "../../../../utils/remove-duplicate-object-in-array";
import { NextApiClient } from "../../next-api.client";

export interface UserLobbyData {
  userResponse: string[];
  userStartedToMakeAList: string[];
  userLobbiesInvitedTo: string[];
}

export abstract class MongoDBApiClient extends NextApiClient {
  static db = new MongoDB();

  constructor() {
    super();
  }

  static async getLobbyData(lobby) {
    const query = `SELECT * from c where c.id = '${lobby}'`;
    const response = await this.db
      .read(query)
      .then((data) => data.resources[0]);
    return response;
  }

  static async getUserData(user): Promise<UserLobbyData> {
    const userQuery = `SELECT * from c where c.creator = '${user.user.email}'`;
    const userResponse = this.db.read(userQuery).then((data) => data.resources);
    const userStartedMakingAListQuery = `SELECT c.id, c.description FROM c JOIN t in c.users WHERE t.email = '${user.user.email}'`;
    const userStartedMakingAListResponse = this.db
      .read(userStartedMakingAListQuery)
      .then((data) => removeDuplicateObjectsInArray(data.resources));
    const lobbiesInvitedToQuery = `SELECT c.id, c.description FROM c JOIN t in c.invited_users WHERE t.to = '${user.user.email}'`;
    const lobbiesInvitedToResponse = this.db
      .read(lobbiesInvitedToQuery)
      .then((data) => removeDuplicateObjectsInArray(data.resources));
    const response = await Promise.all([
      userResponse,
      userStartedMakingAListResponse,
      lobbiesInvitedToResponse,
    ]);
    return {
      userResponse: response[0],
      userStartedToMakeAList: response[1],
      userLobbiesInvitedTo: response[2],
    };
  }
}
