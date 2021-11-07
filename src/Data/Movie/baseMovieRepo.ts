import { Movie } from "../../Entities/Movie";
import { DynamoDB } from "aws-sdk";

export abstract class baseMovieRepo {
  public keys(movie: Movie): DynamoDB.DocumentClient.Key {
    return {
      PK: `Movie#${movie.MovTitle}`,
      SK: `Movie#${movie.MovTitle}`,
    };
  }

  abstract toItem(movie: Movie): Record<string, unknown>;
}
