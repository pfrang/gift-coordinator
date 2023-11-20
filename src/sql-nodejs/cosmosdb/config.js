// @ts-check

const config = {
  endpoint: process.env.NEXT_PUBLIC_ENDPOINT,
  key: process.env.NEXT_PUBLIC_KEY,
  databaseId: process.env.NEXT_PUBLIC_DATABASEID,
  AccountEndpoint: process.env.NEXT_PUBLIC_ACCOUNTENDPOINT,
  containerId: "Lobbies",
  partitionKey: { kind: "Hash", paths: ["/category"] },
};

module.exports = config;
