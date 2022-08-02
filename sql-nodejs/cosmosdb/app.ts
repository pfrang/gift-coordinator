// @ts-check

//  <ImportConfiguration>
import { CosmosClient, PatchOperation } from "@azure/cosmos";
const config = require("./config");
//  </ImportConfiguration>

interface CreateQuery {
  id: string;
  description: string;
  creator: string;
}

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

  read = async (query) => {
    const response = await this.container.items.query(query).fetchAll()
    return response
  }

  createLobby = async ({id, description, creator}: CreateQuery) => {
    const query = {
      id: id,
      description: description,
      creator: creator,
      users: [],
      invited_users: []
    }
    const response = await this.container.items.create(query)
    return response
  }

  updateLobbyDescription = async (query) => {
    const { id, description } = query;
    const set = "set" as const;
    const operations =
      [{
        op: set, path: `/description`, value: description
      }];

    const response = await this.container.item(id, id).patch(operations);
    return response
  }

  updateEmail = async (query) => {
    const { email } = query
    const add = "add" as const
  }

  addNewUser = async (query) => {
    const { lobbyId, name, email } = query

    const add = "add" as const
    const operations =
      [{
        op: add, path: `/users/0`, value: {name: name, email:email, items: [] }
      }];

    const response = await this.container.item(lobbyId,lobbyId).patch(operations);
    return response
  }

  // inviteUser = async (query) => {
  //   const query = {

  //   }
  //   const add = "add" as const
  //   const operations =
  //   [{
  //     op: add, path: 'invited_users/-', value: { by: user, to: userInvited}
  //   }]
  // }

  updateItems = async (info) => {
    const { lobbyId, userIndex, item, itemIndex, reserved, reservedBy } = info
    const add = "add" as const
    const operations =
      [{
        op: add, path: `/users/${userIndex}/items/-`, value: {description: item, id: itemIndex, reserved: reserved, reserved_by: reservedBy }
      }];

    const response = await this.container.item(lobbyId,lobbyId).patch(operations);
    return response
  }

  deleteItem = async (info) => {
    const { id, userIndex,itemIndex } = info
    const remove = "remove" as const
    const operations =
      [{
        op: remove, path: `/users/${userIndex}/items/${itemIndex}`
      }];
    const response = await this.container.item(id, id).patch(operations);
    console.log(response)
    return response

  }


  reserveItem = async (info) => {
    const { id, userIndex, itemIndex, reservedBy } = info
    const set = "set" as const
    const operations =
      [{
        op: set, path: `/users/${userIndex}/items/${itemIndex}/reserved`, value: true,
      },
    {
      op: set, path: `/users/${userIndex}/items/${itemIndex}/reserved_by`, value: reservedBy,
    }];
    const response = await this.container.item(id, id).patch(operations);
    console.log(response)
    return response
  }

  removeReservationItem = async (info) => {
    const { id, userIndex, itemIndex } = info
    const set = "set" as const
    const operations =
      [{
        op: set, path: `/users/${userIndex}/items/${itemIndex}/reserved`, value: false,
      },
      {
        op: set, path: `/users/${userIndex}/items/${itemIndex}/reserved_by`, value: "",
      }];
    const response = await this.container.item(id, id).patch(operations);
    console.log(response)
    return response

  }

}

export default mongoDB;
