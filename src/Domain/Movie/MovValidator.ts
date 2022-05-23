import { z, ZodSchema } from "zod"

export const movieSchema = z
    .object({
        MovTitle: z.string().min(1),
        MovYear: z.number().lte(2050).gte(1900),
        MovLang: z.string().optional(),
        MovCountry: z.string().optional(),
        MovGenre: z.array(z.string()).optional(),
        MovDirector: z.string().optional(),
        MovProdCompanies: z
            .array(
                z.object({
                    country: z.string().optional(),
                    name: z.string().optional()
                })
            )
            .optional()
    })
    .strict()

export type TMovie = z.infer<typeof movieSchema>

export const paramsValidator = async (input: Record<string, unknown>, schema: ZodSchema) => schema.parseAsync(input)
