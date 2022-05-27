import { ZodSchema } from "zod"

export const paramsValidator = async (input: Record<string, unknown>, schema: ZodSchema) => schema.parseAsync(input)
