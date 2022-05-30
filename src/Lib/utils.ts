import { ZodSchema } from "zod"

export const paramsValidator = async (input: Record<string, unknown>, schema: ZodSchema): Promise<void> =>
    schema.parseAsync(input)
