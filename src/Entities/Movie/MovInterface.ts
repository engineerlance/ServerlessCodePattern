import { AuditData } from "./BaseEntity"

export interface MovProdCompanies {
    country: string
    name: string
}

export interface iMovie {
    MovTitle: string
    MovYear?: number
    MovLang?: string
    MovCountry?: string
    MovGenre?: Genre
    MovDirector?: string
    MovProdCompanies?: MovProdCompanies[]
    AuditData?: AuditData
}

export type GenreUnion =
    | "Thriller"
    | "Action"
    | "Comedy"
    | "Drama"
    | "Horror"
    | "Sci-Fi"
    | "Animation"
    | "Adventure"
    | "Family"
    | "Romance"
    | "Mystery"
    | "Crime"
    | "War"
    | "Biography"
    | "History"
    | "Music"
    | "Musical"
    | "Western"

export type Genre = [GenreUnion, GenreUnion, GenreUnion] | [GenreUnion, GenreUnion] | [GenreUnion]
