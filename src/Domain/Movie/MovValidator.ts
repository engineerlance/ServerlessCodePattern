import { z } from "zod"
import { GenreUnion } from "../../Entities/Movie/MovInterface"

const GenreValues: Readonly<Record<string, GenreUnion>> = {
    Thriller: "Thriller",
    Action: "Action",
    Comedy: "Comedy",
    Drama: "Drama",
    Horror: "Horror",
    "Sci-Fi": "Sci-Fi",
    Animation: "Animation",
    Adventure: "Adventure",
    Family: "Family",
    Romance: "Romance",
    Mystery: "Mystery",
    Crime: "Crime",
    War: "War",
    Biography: "Biography",
    History: "History",
    Music: "Music",
    Musical: "Musical",
    Western: "Western"
} as const

export const movieSchema = z
    .object({
        MovTitle: z.string().min(5).max(100),
        MovYear: z.number().lte(2050).gte(1900).optional(),
        MovLang: z.string().optional(),
        MovCountry: z.string().optional(),
        MovGenre: z
            .union([
                z.tuple([z.nativeEnum(GenreValues), z.nativeEnum(GenreValues), z.nativeEnum(GenreValues)]),
                z.tuple([z.nativeEnum(GenreValues), z.nativeEnum(GenreValues)]),
                z.tuple([z.nativeEnum(GenreValues)])
            ])
            .optional(),
        MovDirector: z.string().optional(),
        MovProdCompanies: z
            .array(
                z.object({
                    country: z.string(),
                    name: z.string()
                })
            )
            .optional()
    })
    .strict()

export type TMovie = z.infer<typeof movieSchema>
