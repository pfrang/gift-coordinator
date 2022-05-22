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

  updateItems = async ( query) => {
    // const { id, name } = query
    const { resource: updatedItem } = await this.container.item("34323", name).replace(query);
    return updatedItem

  }
}

export default mongoDB;
