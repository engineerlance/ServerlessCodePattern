import { createDbClient } from "../DB/DynamoClient";
import { DynamoDB } from "aws-sdk";
import { Movie } from "../../Entities/Movie/Movie";
import { baseMovieRepo } from "./baseMovieRepo";

export class getMovieRepo extends baseMovieRepo {
  toItem(movie: Movie) {
    return {
      ...this.keys(movie),
      MovTitle: movie.MovTitle,
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

  public async get(MovTitle: string): Promise<Movie> {
    const client = createDbClient();
    const movObj = new Movie({ MovTitle: MovTitle });
    const res = await client
      .get({
        TableName: process.env.TABLE_NAME as string,
        Key: this.keys(movObj),
      })
      .promise();
    if (res.Item) {
      return getMovieRepo.fromItem(res.Item);
    } else {
      throw new Error("no item");
    }
  }
}
