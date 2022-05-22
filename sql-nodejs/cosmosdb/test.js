const CosmosClient = require('@azure/cosmos').CosmosClient
const connString = "AccountEndpoint=https://gift-coord.documents.azure.com:443/;AccountKey=44DHXfBq9gvvSHDwvFFc6fjIPmfGGaEDlKIGmYY0blXAdD9yosc6Cjp05QmZNVQ0l2nG2mVi6NUC61ysOyMwVQ==;"
const client = new CosmosClient(connString)


export class mongoDB {
  constructor() {
    this.client = client
    this.database = client.database("GiftCordDB")
    this.container = this.database.container("Lobbies")
  }

  async read(query) {
    const response = this.container.items.query(query).fetchAll()
    return response
  }
  async insert(query) {
    const response = this.container.items.query(query).fetchAll()
    return response
  }
}
