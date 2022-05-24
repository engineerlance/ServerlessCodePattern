import { AuditData } from "./BaseEntity"

export interface iMovie {
    MovTitle: string
    MovYear: number
    MovLang?: string
    MovCountry?: string
    MovGenre?: Genre
    MovDirector?: string
    MovProdCompanies?: MovProdCompanies[]
    AuditData?: AuditData
}

export const genreTuple = [
    "Thriller",
    "Action",
    "Comedy",
    "Drama",
    "Horror",
    "Sci-Fi",
    "Animation",
    "Adventure",
    "Family"
] as const

export type Genre = typeof genreTuple

export interface MovProdCompanies {
    country: string
    name: string
}
