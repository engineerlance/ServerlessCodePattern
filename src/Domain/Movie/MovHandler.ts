import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda"
import { router } from "./MovRouter"
import { BaseError } from "../../Error/ErrorClasses"
import { ZodError } from "zod"

export const main: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    try {
        const result = await router(event.resource, event)
        return {
            statusCode: 200,
            body: JSON.stringify(result)
        }
    } catch (error) {
        if (error instanceof BaseError) {
            return {
                statusCode: error.statusCode,
                body: JSON.stringify(error.serializeErrors())
            }
        }
        if (error instanceof ZodError)
            return {
                statusCode: 400,
                body: JSON.stringify({
                    error_code: "Invalid_Payload",
                    error_message: error.format()
                })
            }
        console.error(error)
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Unknown_Error" })
        }
    }
}
