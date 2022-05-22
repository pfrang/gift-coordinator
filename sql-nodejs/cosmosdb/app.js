// @ts-check

import { AccountEndpoint, partitionKey } from "./config";

//  <ImportConfiguration>
import { CosmosClient, PatchOperation } from "@azure/cosmos";
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
  // client: any
  // container: any
  // database: any
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
    // let add = "add" as const;
    const operations =
      [{
        op: "add", path: "/people/0/items/-", value: {description: "test2", price: "100"}
      }];

    const query = {
      id: "23221",
      people: [{name: "Espen", items: {}}]
    }
    const item = await this.container.item("23221","23221").patch(operations);
    return item
  }
}

export default mongoDB;
