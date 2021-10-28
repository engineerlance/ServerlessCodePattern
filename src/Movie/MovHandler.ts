import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda";
import { router } from "./MovRouter";

export const main: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
) => {
  const result = await router(event.resource, event);
  const response = {
    statusCode: 200,
    body: JSON.stringify(result),
  };
  return response;
};
