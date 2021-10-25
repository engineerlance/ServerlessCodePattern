import { BaseEntity } from "../helpers/BaseEntity";
export interface MovieSchema extends BaseEntity {
  MovTitle: string;
  MovYear: number;
  MovLang: string;
  MovCountry?: string;
  MovGenre: Array<string>;
  MovDirector?: string;
  MovProdCompanies: Array<Object>;
}

export interface iInput {
  type: string;
  properties: Record<keyof Omit<MovieSchema, "pk" | "sk">, object>;
  required: Array<string>;
  additionalProperties: boolean;
}
