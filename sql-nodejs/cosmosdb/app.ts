// @ts-check

//  <ImportConfiguration>
import { CosmosClient, PatchOperation } from "@azure/cosmos";
const config = require("./config");
const dbContext = require("./data/databaseContext");
//  </ImportConfiguration>

class mongoDB {
  container: any;
  client: any;
  database: any;
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

  updateLobbyDescription = async (query) => {
    const { id, name } = query;
    const set = "set" as const;
    const operations =
      [{
        op: set, path: `/description`, value: name
      }];

    const response = await this.container.item(id, id).patch(operations);
    return response
  }

  updateNewName = async (query) => {
    const { id, name } = query
    const add = "add" as const
    const operations =
      [{
        op: add, path: `/people/0`, value: {name: name, items: [] }
      }];

    const response = await this.container.item(id,id).patch(operations);
    return response
  }

  updateItems = async (info) => {
    const { id, index, item } = info
    const add = "add" as const
    const operations =
      [{
        op: add, path: `/people/${index}/items/-`, value: {description: item }
      }];

    const response = await this.container.item(id,id).patch(operations);
    return response
  }
}

export default mongoDB;
