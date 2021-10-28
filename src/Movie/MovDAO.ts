// import { MovieSchema } from "./MovSchema";
import { createDbClient } from "../helpers/DynamoClient";
import { DynamoDB } from "aws-sdk";

export class Movie {
  constructor(
    public readonly MovTitle: string,
    public readonly MovYear: number,
    public readonly MovLang?: string,
    public readonly MovCountry?: string,
    public readonly MovGenre?: Array<string>,
    public readonly MovDirector?: string | "",
    public readonly MovProdCompanies?: Array<Object>
  ) {}
  get PK(): string {
    return `Movie#${this.MovTitle}`;
  }

  get SK(): string {
    return `Movie#${this.MovTitle}`;
  }

  toItem() {
    return {
      PK: this.PK,
      SK: this.SK,
      MovYear: this.MovYear,
      MovLang: this.MovLang,
      MovCountry: this.MovCountry,
      MovGenre: this.MovGenre,
      MovProdCompanies: this.MovProdCompanies,
      MovDirector: this.MovDirector,
    };
  }

  async save(): Promise<this> {
    const client = createDbClient();
    await client
      .put({
        TableName: process.env.TABLE_NAME!,
        Item: this.toItem(),
        ConditionExpression: "attribute_not_exists(PK)",
      })
      .promise();
    return this;
  }

  static readMovie = async (
    movName: string
  ): Promise<DynamoDB.DocumentClient.QueryOutput> => {
    const client = createDbClient();
    const res = await client
      .query({
        TableName: process.env.TABLE_NAME!,
        KeyConditionExpression: "PK = :PK",
        ExpressionAttributeValues: {
          ":PK": `Movie#${movName}`,
        },
      })
      .promise();
    return res;
  };
  static deleteMovie = async (
    paramPK: string,
    paramSK: string
  ): Promise<DynamoDB.DocumentClient.QueryOutput> => {
    const client = createDbClient();
    const res = await client
      .delete({
        TableName: process.env.TABLE_NAME!,
        Key: {
          PK: paramPK,
          SK: paramSK,
        },
        ConditionExpression: "attribute_exists(PK)",
      })
      .promise();
    return res;
  };
}
