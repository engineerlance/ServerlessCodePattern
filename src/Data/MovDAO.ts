// import { MovieSchema } from "./MovSchema";
import { createDbClient } from "../helpers/DynamoClient";
import { DynamoDB } from "aws-sdk";
import { iMovie } from "./Mov.Interfaces";

export class Movie implements iMovie {
  constructor(
    public readonly MovTitle: string,
    public readonly MovYear?: number,
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
      MovTitle: this.MovTitle,
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
}

export const getMovie = async (Mov: Movie): Promise<Movie> => {
  const client = createDbClient();
  const res = await client
    .get({
      TableName: process.env.TABLE_NAME!,
      Key: { PK: Mov.PK, SK: Mov.SK },
    })
    .promise();
  console.log(res);
  if (res.Item) {
    return fromItem(res.Item);
  } else {
    throw new Error("no item");
  }
};

export const deleteMovie = async (
  Mov: Movie
): Promise<DynamoDB.DocumentClient.DeleteItemOutput> => {
  const client = createDbClient();
  const res = await client
    .delete({
      TableName: process.env.TABLE_NAME!,
      Key: { PK: Mov.PK, SK: Mov.SK },
      ConditionExpression: "attribute_exists(PK)",
    })
    .promise();
  return res;
};

const fromItem = (item: DynamoDB.DocumentClient.GetItemOutput["Item"]) => {
  return new Movie(
    item!.MovTitle,
    item?.MovYear,
    item?.MovLang,
    item?.MovCountry,
    item?.MovGenre,
    item?.MovProdCompanies,
    item?.MovDirector
  );
};
