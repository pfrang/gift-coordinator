// @ts-check

import { AccountEndpoint } from "./config";

//  <ImportConfiguration>
const CosmosClient = require("@azure/cosmos").CosmosClient;
const config = require("./config");
const dbContext = require("./data/databaseContext");
//  </ImportConfiguration>

//  <DefineNewItem>
const newItem = {
  id: "3",
  category: "fun",
  name: "Cosmos DB",
  description: "Complete Cosmos DB Node.js Quickstart ⚡",
  isComplete: false
};
//  </DefineNewItem>

class mongoDB {
  client: any
  container: any
  database: any
  constructor() {
    const { endpoint, key, databaseId, containerId, AccountEndpoint } = config;

    this.client = new CosmosClient(process.env.NEXT_PUBLIC_ACCOUNTENDPOINT);

    this.database = this.client.database(databaseId);
    this.container = this.database.container(containerId);

  }

  // <CreateClientObjectDatabaseContainer>

  read = async (query) => {
    const response = await this.container.items.query(query).fetchAll()
    return response
  }

  createLobby = async (query) => {
    const response = await this.container.items.create(query)
    return response
  }

  update = async (query) => {
    const { id } = query
    const response = await this.container.item(id).replace(query);
    return response
  }

  updateItems = async () => {
    // const { id, name } = query
    const { id } = { id: 34323 }
    let add = "add" as const;
    const operations =
      [{
        op: add, path: "/hello", value: "turid"
      }];
    const item = await this.container.item("34323").read();
    return item

  }
}

export default mongoDB;
