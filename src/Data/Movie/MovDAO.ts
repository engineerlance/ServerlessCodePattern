// import { MovieSchema } from "./MovSchema";
import { createDbClient } from "../DB/DynamoClient";
import { DynamoDB } from "aws-sdk";
import { iMovie } from "./Mov.Interfaces";
import { BaseEntity } from "../DB/BaseEntity";

export class Movie extends BaseEntity {
  readonly MovTitle: string;
  readonly MovYear?: number;
  readonly MovLang?: string;
  readonly MovCountry?: string;
  readonly MovGenre?: Array<string>;
  readonly MovDirector?: string | "";
  readonly MovProdCompanies?: Array<Object>;

  constructor(props: iMovie) {
    super(props.AuditData ? props.AuditData : {});
    this.MovTitle = props.MovTitle;
    this.MovYear = props.MovYear;
    this.MovLang = props.MovLang;
    this.MovCountry = props.MovCountry;
    this.MovGenre = props.MovGenre;
    this.MovDirector = props.MovDirector;
    this.MovProdCompanies = props.MovProdCompanies;
  }

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
      ...this.auditObj(),
    };
  }

  static fromItem(item: DynamoDB.DocumentClient.GetItemOutput["Item"]) {
    return new Movie({
      MovTitle: item!.MovTitle,
      MovYear: item?.MovYear,
      MovLang: item?.MovLang,
      MovCountry: item?.MovCountry,
      MovGenre: item?.MovGenre,
      MovProdCompanies: item?.MovProdCompanies,
      MovDirector: item?.MovDirector,
    });
  }

  async save(): Promise<this> {
    const client = createDbClient();
    await client
      .put({
        TableName: process.env.TABLE_NAME as string,
        Item: this.toItem(),
        ConditionExpression: "attribute_not_exists(PK)",
      })
      .promise();
    return this;
  }
}

export const getMovie = async (MovTitle: string): Promise<Movie> => {
  const client = createDbClient();
  const movObj = new Movie({ MovTitle: MovTitle });
  const res = await client
    .get({
      TableName: process.env.TABLE_NAME as string,
      Key: { PK: movObj.PK, SK: movObj.SK },
    })
    .promise();
  if (res.Item) {
    return Movie.fromItem(res.Item);
  } else {
    throw new Error("no item");
  }
};

export const deleteMovie = async (
  MovTitle: string
): Promise<DynamoDB.DocumentClient.DeleteItemOutput> => {
  const client = createDbClient();
  const movObj = new Movie({ MovTitle: MovTitle });
  const res = await client
    .delete({
      TableName: process.env.TABLE_NAME as string,
      Key: { PK: movObj.PK, SK: movObj.SK },
      ConditionExpression: "attribute_exists(PK)",
    })
    .promise();
  return res;
};
