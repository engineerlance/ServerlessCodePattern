import { APIGatewayProxyEvent } from "aws-lambda"
import { InvalidPayload } from "src/Error/ErrorClasses"
import { paramsValidator } from "src/Lib/utils"
import { createMov, readMov, removeMov } from "./MovService"
import { movieSchema, TMovie } from "./MovValidator"

export const router = async (route: APIGatewayProxyEvent["resource"], payload: APIGatewayProxyEvent) => {
    switch (route) {
        case "/mov":
            if (!payload.body) throw new InvalidPayload()
            const body: TMovie = JSON.parse(payload.body)
            await paramsValidator(body, movieSchema)
            return await createMov(body)

        case "/mov/{MovTitle}": {
            if (payload.httpMethod === "GET" && payload.pathParameters?.MovTitle) {
                return await readMov(payload.pathParameters.MovTitle!)
            }
            if (payload.httpMethod === "DELETE" && payload.pathParameters?.MovTitle) {
                return await removeMov(payload.pathParameters.MovTitle!)
            }
        }

        default:
            throw new Error("Invalid URL")
    }
}
