const CosmosClient = require("@azure/cosmos").CosmosClient;
const config = require("../config");




const newItem = {
  id: "3",
  category: "fun",
  name: "Cosmos DB",
  description: "Complete Cosmos DB Node.js Quickstart ⚡",
  isComplete: false
};


const read = async () => {
  const { endpoint, key, databaseId, containerId } = config;

  const client = new CosmosClient({ endpoint, key });

  const database = client.database(databaseId)

  const container = database.container(containerId)

  const query = {
    query: "SELECT * from c"
  }

  // CRUD

  // Read
  // const response = await container.items.query(query).fetchAll()

  // Create
  try {
    const insert = await container.items.create(newItem);
    console.log(insert)
  } catch (err) {
    console.error(err)
  }
}

const insert = async () => {

}

read()
