import { createDbClient } from "../DB/DynamoClient";
import { DynamoDB } from "aws-sdk";
import { Movie } from "../../Entities/Movie";
import { baseMovieRepo } from "./baseMovieRepo";

export class deleteMovieRepo extends baseMovieRepo {
  toItem(movie: Movie): Record<string, unknown> {
    return {
      ...this.keys(movie),
      MovTitle: movie.MovTitle,
    };
  }

  public async deleteMovie(
    MovTitle: string
  ): Promise<DynamoDB.DocumentClient.DeleteItemOutput> {
    const client = createDbClient();
    const movObj = new Movie({ MovTitle: MovTitle });
    const res = await client
      .delete({
        TableName: process.env.TABLE_NAME as string,
        Key: this.keys(movObj),
      })
      .promise();
    return res;
  }
}
