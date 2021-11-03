import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda";
import { router } from "./MovRouter";
import { BaseError } from "../../Error/ErrorClasses";

export const main: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
) => {
  try {
    const result = await router(event.resource, event);
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    if (error instanceof BaseError) {
      return {
        statusCode: error.statusCode,
        body: JSON.stringify(error.serializeErrors()),
      };
    }
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Unknown_Error" }),
    };
  }
};
