import { APIGatewayProxyEvent } from "aws-lambda";
import { createMov, readMov, removeMov } from "./MovService";
import { paramsValidator } from "./MovValidator";

export const router = async (
  route: APIGatewayProxyEvent["resource"],
  payload: APIGatewayProxyEvent
) => {
  switch (route) {
    case "/mov/create":
      if (paramsValidator(JSON.parse(payload.body!))) {
        try {
          return await createMov(JSON.parse(payload.body!));
        } catch (e) {
          throw new Error(e);
        }
      } else {
        throw new Error("Invalid payload");
      }
    case "/mov/get/{MovTitle}":
      try {
        return await readMov(payload.pathParameters!.MovTitle!);
      } catch (e) {
        throw new Error(e);
      }
    case "/mov/{MovTitle}":
      try {
        return await removeMov(payload.pathParameters!.MovTitle!);
      } catch (e) {
        throw new Error(e);
      }
    default:
      throw new Error("Invalid URL");
  }
};
