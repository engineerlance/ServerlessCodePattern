import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda";
import { createMovie, getMovie, removeMovie } from "./MovService";
import { paramsValidator } from "./MovValidator";

export const main: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
) => {
  let movie = {};
  switch (event.resource) {
    case "/mov/create":
      const createPayload = JSON.parse(event.body!);
      if (paramsValidator(createPayload)) {
        try {
          movie = await createMovie(createPayload);
        } catch (e) {
          throw new Error(e);
        }
      } else {
        throw new Error("Invalid payload");
      }
      break;
    case "/mov/get/{MovTitle}":
      try {
        movie = await getMovie(event.pathParameters!.MovTitle!);
      } catch (e) {
        throw new Error(e);
      }
      break;
    case "/mov/delete":
      const deletePayload = JSON.parse(event.body!);
      try {
        movie = await removeMovie(deletePayload.PK, deletePayload.SK);
      } catch (e) {
        throw new Error(e);
      }
      break;
    default:
      throw new Error("Invalid URL");
  }
  const response = {
    statusCode: 200,
    body: JSON.stringify(movie),
  };
  return response;
};
