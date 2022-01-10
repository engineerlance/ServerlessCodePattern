import { createDbClient } from "../DB/DynamoClient"
import { DynamoDB } from "aws-sdk"
import { Movie } from "../../Entities/Movie/Movie"
import { baseMovieRepo } from "./baseMovieRepo"
import { dynamicUpdateExpression } from "../DB/utils"

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
            ...movie.auditObj()
        }
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
            AuditData: {
                createdAt: new Date(item?.createdAt),
                lastModifiedAt: new Date(item?.lastModifiedAt)
            }
        })
    }

    public async save(movie: Movie): Promise<void> {
        const client = createDbClient()
        const movItem = this.toItem(movie)
        await client
            .put({
                TableName: process.env.TABLE_NAME as string,
                Item: movItem,
                ConditionExpression: "attribute_not_exists(PK)"
            })
            .promise()
    }

    public async update(movie: Movie) {
        const client = createDbClient()
        const movItem = this.toItem(movie)
        const updateOperation = dynamicUpdateExpression(movItem)
        const res = await client
            .update({
                TableName: process.env.TABLE_NAME as string,
                Key: this.keys(movie),
                ConditionExpression: "attribute_exists(PK)",
                UpdateExpression: updateOperation.updateExpression,
                ExpressionAttributeNames: updateOperation.ExpressionAttributeNames,
                ExpressionAttributeValues: updateOperation.ExpressionAttributeValues,
                ReturnValues: "ALL_NEW"
            })
            .promise()
        return addMovieRepo.fromItem(res.Attributes)
    }
}
