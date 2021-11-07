import { createDbClient } from "../DB/DynamoClient";
import { DynamoDB } from "aws-sdk";
import { Movie } from "../../Entities/Movie";
import { baseMovieRepo } from "./baseMovieRepo";

export class addMovieRepo extends baseMovieRepo {
  toItem(movie: Movie) {
    return {
      ...this.keys(movie),
      MovTitle: movie.MovTitle,
      MovYear: movie.MovYear,
      MovLang: movie.MovLang,
      MovCountry: movie.MovCountry,
      MovGenre: movie.MovGenre,
      MovProdCompanies: movie.MovProdCompanies,
      MovDirector: movie.MovDirector,
      ...movie.auditObj(),
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

  public async save(movie: Movie): Promise<void> {
    const client = createDbClient();
    const movItem = this.toItem(movie);
    await client
      .put({
        TableName: process.env.TABLE_NAME as string,
        Item: movItem,
        ConditionExpression: "attribute_not_exists(PK)",
      })
      .promise();
  }
}
