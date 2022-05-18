// @ts-check

const config = {
  endpoint: "https://gift-coord.documents.azure.com:443/",
  key: "44DHXfBq9gvvSHDwvFFc6fjIPmfGGaEDlKIGmYY0blXAdD9yosc6Cjp05QmZNVQ0l2nG2mVi6NUC61ysOyMwVQ==",
  databaseId: "GiftCordDB",
  AccountEndpoint: "AccountEndpoint=https://gift-coord.documents.azure.com:443/;AccountKey=44DHXfBq9gvvSHDwvFFc6fjIPmfGGaEDlKIGmYY0blXAdD9yosc6Cjp05QmZNVQ0l2nG2mVi6NUC61ysOyMwVQ==;",
  containerId: "Lobbies",
  partitionKey: { kind: "Hash", paths: ["/category"] }
};

module.exports = config;
