import mongoDB from "../../../../sql-nodejs/cosmosdb/app";
import { NextApiClient } from "../../next-api.client";



export class MongoDBApiClient extends NextApiClient {
  constructor() {
    super()

    const db = new mongoDB
    this.db = db
  }

  getData() {
    this.db
  }


}
