// import { MovieSchema } from "./MovSchema";
import { createDbClient } from "../helpers/DynamoClient";
import { DynamoDB } from "aws-sdk";

export class Movie {
  constructor(
    public MovTitle: string,
    public MovYear: number,
    public MovLang?: string,
    public MovCountry?: string,
    public MovGenre?: Array<string>,
    public MovDirector?: string | "",
    public MovProdCompanies?: Array<Object>
  ) {}
  get pk(): string {
    return `Movie#${this.MovTitle}`;
  }

  get sk(): string {
    return `Movie#${this.MovTitle}`;
  }

  static insertMovie = async (movie: Movie): Promise<Movie> => {
    const client = createDbClient();
    await client
      .put({
        TableName: process.env.TABLE_NAME!,
        Item: {
          PK: movie.pk,
          SK: movie.sk,
          Attributes: {
            MovYear: movie.MovYear,
            MovLang: movie.MovLang,
            MovCountry: movie.MovCountry,
            MovGenre: movie.MovGenre,
            MovProdCompanies: movie.MovProdCompanies,
            MovDirector: movie.MovLang,
          },
        },
        ConditionExpression: "attribute_not_exists(PK)",
      })
      .promise();
    return movie;
  };
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
