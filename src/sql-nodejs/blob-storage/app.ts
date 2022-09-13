/* eslint-disable no-console */
import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";

const connectionString = process.env.NEXT_PUBLIC_BLOB_STORAGE_ENDPOINT;
const sasToken = process.env.NEXT_PUBLIC_BLOB_STORAGE_SAS_TOKEN;
class BlobStorage {
  blobServiceClient: BlobServiceClient;
  containerClient: ContainerClient;

  constructor() {
    this.blobServiceClient = new BlobServiceClient(connectionString + sasToken);
  }

  createContainerClient = async (lobby) => {
    const containerClient: ContainerClient =
      this.blobServiceClient.getContainerClient(lobby);
    try {
      await containerClient.createIfNotExists();
    } catch (e) {
      console.error(e);
    }
    return containerClient;
  };

  readContainers = async () => {
    let i = 1;
    let containers = this.blobServiceClient.listContainers();
    for await (const container of containers) {
      console.log(`Container ${i++}: ${container.name}`);
    }
  };

  readBlobs = async () => {
    let i = 1;
    let blobs = this.containerClient.listBlobsFlat();
    for await (const blob of blobs) {
      console.log(`Blob ${i++}: ${blob.name}`);
    }
  };

  uploadBlob = async (file, lobbyId) => {
    const containerClient = await this.createContainerClient(lobbyId);
    const blockBlobClient = containerClient.getBlockBlobClient(file.name);
    const options = { blobHTTPHeaders: { blobContentType: file.type } };
    const uploadBlobResponse = await blockBlobClient.uploadData(file, options);

    // console.log(
    //   `Upload block blob ${file.name} successfully`,
    //   uploadBlobResponse.requestId
    // );
  };
}

export default BlobStorage;
