import { APIGatewayProxyEvent } from "aws-lambda";
import { createMovie, getMovie, removeMovie } from "./MovService";
import { paramsValidator } from "./MovValidator";

export const router = async (
  route: APIGatewayProxyEvent["resource"],
  payload: APIGatewayProxyEvent
) => {
  switch (route) {
    case "/mov/create":
      if (paramsValidator(JSON.parse(payload.body!))) {
        try {
          return await createMovie(JSON.parse(payload.body!));
        } catch (e) {
          throw new Error(e);
        }
      } else {
        throw new Error("Invalid payload");
      }
    case "/mov/get/{MovTitle}":
      try {
        return await getMovie(payload.pathParameters!.MovTitle!);
      } catch (e) {
        throw new Error(e);
      }
    case "/mov/delete":
      const deletePayload = JSON.parse(payload.body!);
      try {
        return await removeMovie(deletePayload.PK, deletePayload.SK);
      } catch (e) {
        throw new Error(e);
      }
    default:
      throw new Error("Invalid URL");
  }
};
