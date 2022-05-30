import { Movie } from "../../Entities/Movie/Movie"
import { DynamoDB } from "aws-sdk"

export abstract class baseMovieRepo {
    public keys(movie: Movie): DynamoDB.DocumentClient.Key {
        return {
            PK: `Movie#${movie.props.MovTitle}`,
            SK: `Movie#${movie.props.MovTitle}`
        }
    }

    abstract toItem(movie: Movie): Record<string, unknown>
}
