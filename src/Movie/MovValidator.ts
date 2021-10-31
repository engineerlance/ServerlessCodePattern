import ISO6391 from "iso-639-1";
import Ajv from "ajv";
const ajv = new Ajv();
import { iInput, iMovie } from "../Data/Mov.Interfaces";

const inputSchema: iInput = {
  type: "object",
  properties: {
    MovTitle: { type: "string" },
    MovYear: { type: "integer", minimum: 1900, maximum: 2027 },
    MovLang: { type: "string", enum: ISO6391.getAllCodes() },
    MovCountry: { type: "string" },
    MovGenre: { type: "array", uniqueItems: true, items: { type: "string" } },
    MovDirector: { type: "string" },
    MovProdCompanies: {
      type: "array",
      uniqueItems: true,
      items: {
        type: "object",
        properties: {
          country: { type: "string" },
          name: { type: "string" },
        },
      },
    },
  },
  required: ["MovTitle", "MovYear"],
  additionalProperties: false,
};

export const paramsValidator = (payload: iMovie): boolean => {
  return ajv.validate(inputSchema, payload);
};
