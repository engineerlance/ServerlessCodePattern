import { BaseEntity } from "../Utils/BaseEntity";
export interface iMovie extends BaseEntity {
  MovTitle: string;
  MovYear?: number;
  MovLang?: string;
  MovCountry?: string;
  MovGenre?: Array<string>;
  MovDirector?: string;
  MovProdCompanies?: Array<Object>;
}

export interface iInput {
  type: string;
  properties: Record<keyof Omit<iMovie, "PK" | "SK">, object>;
  required: Array<string>;
  additionalProperties: boolean;
}

export interface iError {
  error: string;
}
