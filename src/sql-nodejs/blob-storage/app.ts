/* eslint-disable no-console */
import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";

const connectionString = process.env.NEXT_PUBLIC_BLOB_STORAGE_ENDPOINT;
const containerName = process.env.NEXT_PUBLIC_BLOB_STORAGE_NAME;
const sasToken = process.env.NEXT_PUBLIC_BLOB_STORAGE_SAS_TOKEN;
class BlobStorage {
  blobServiceClient: BlobServiceClient;
  containerClient: ContainerClient;

  constructor() {
    this.blobServiceClient = new BlobServiceClient(connectionString + sasToken);
    this.containerClient =
      this.blobServiceClient.getContainerClient(containerName);
  }

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

  uploadBlob = async () => {
    const blobName = "newblob" + new Date().getTime();
    const content = "Hello world!";
    const blockBlobClient = await this.containerClient.getBlockBlobClient(
      blobName
    );
    const uploadBlobResponse = await blockBlobClient.upload(
      content,
      content.length
    );
    console.log(
      `Upload block blob ${blobName} successfully`,
      uploadBlobResponse.requestId
    );
  };
}

export default BlobStorage;
