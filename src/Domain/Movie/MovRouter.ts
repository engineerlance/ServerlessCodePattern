import { APIGatewayProxyEvent } from "aws-lambda";
import { createMov, readMov, removeMov } from "./MovService";
import { paramsValidator } from "./MovValidator";
import { InvalidPayload } from "../../Error/ErrorClasses";

export const router = async (
  route: APIGatewayProxyEvent["resource"],
  payload: APIGatewayProxyEvent
) => {
  switch (route) {
    case "/mov":
      if (paramsValidator(JSON.parse(payload.body!))) {
        return await createMov(JSON.parse(payload.body!));
      } else {
        throw new InvalidPayload(
          "Invalid_Payload",
          "The JSON body provided is incorrect"
        );
      }
    case "/mov/{MovTitle}":
      try {
        if (payload.httpMethod === "GET") {
          return await readMov(payload.pathParameters?.MovTitle!);
        } else {
          return await removeMov(payload.pathParameters?.MovTitle!);
        }
      } catch (e) {
        throw new Error(e);
      }

    default:
      throw new Error("Invalid URL");
  }
};
