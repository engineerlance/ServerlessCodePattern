import { APIGatewayProxyEvent } from "aws-lambda"
import { createMov, readMov, removeMov } from "./MovService"
import { movieSchema, paramsValidator, TMovie } from "./MovValidator"

export const router = async (route: APIGatewayProxyEvent["resource"], payload: APIGatewayProxyEvent) => {
    const body: TMovie = JSON.parse(payload.body!)
    await paramsValidator(body, movieSchema)
    switch (route) {
        case "/mov":
            return await createMov(body)

        case "/mov/{MovTitle}": {
            if (payload.httpMethod === "GET") {
                return await readMov(payload.pathParameters?.MovTitle!)
            } else {
                return await removeMov(payload.pathParameters?.MovTitle!)
            }
        }

        default:
            throw new Error("Invalid URL")
    }
}
