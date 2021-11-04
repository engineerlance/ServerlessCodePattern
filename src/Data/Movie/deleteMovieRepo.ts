import { createDbClient } from "../DB/DynamoClient";
import { DynamoDB } from "aws-sdk";
import { Movie } from "../../Entities/Movie";

export class deleteMovieRepo {
  toItem(movie: Movie) {
    return {
      PK: `Movie#${movie.MovTitle}`,
      SK: `Movie#${movie.MovTitle}`,
      MovTitle: movie.MovTitle,
    };
  }

  public async deleteMovie(
    MovTitle: string
  ): Promise<DynamoDB.DocumentClient.DeleteItemOutput> {
    const client = createDbClient();
    const movObj = new Movie({ MovTitle: MovTitle });
    const movItem = this.toItem(movObj);
    const res = await client
      .delete({
        TableName: process.env.TABLE_NAME as string,
        Key: { PK: movItem.PK, SK: movItem.SK },
      })
      .promise();
    return res;
  }
}
