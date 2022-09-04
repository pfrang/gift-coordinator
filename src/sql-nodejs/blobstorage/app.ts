/* eslint-disable no-console */
import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";

const blobAccountConnectionString =
  process.env.NEXT_PUBLIC_BLOB_STORAGE_ENDPOINT;
const blobAccountContainerName = process.env.NEXT_PUBLIC_BLOB_STORAGE_NAME;

class BlobStorage {
  blobServiceClient: BlobServiceClient;
  containerClient: ContainerClient;

  constructor() {
    this.blobServiceClient = new BlobServiceClient(
      "https://giftcoordblob.blob.core.windows.net/?sv=2021-06-08&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2022-08-10T17:10:55Z&st=2022-08-10T09:10:55Z&spr=https&sig=UKJdrgpMJQqPUtg9A0vC8324KnkAmW8Ut0lfK8X7IUg%3D"
    );
    this.containerClient = this.blobServiceClient.getContainerClient(
      blobAccountContainerName
    );
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
    const blobName = "quickstart.txt";
    // const uploadResponse = await this.containerClient.uploadBlockBlob(blobName, )
  };
}

export default BlobStorage;
