import { DynamoDB } from "aws-sdk";

let client: any = null;

export const createDbClient = (): DynamoDB.DocumentClient => {
  if (!client) {
    client = new DynamoDB.DocumentClient({
      region: "eu-central-1",
      httpOptions: {
        connectTimeout: 1000,
        timeout: 1000,
      },
    });
  }
  return client;
};
