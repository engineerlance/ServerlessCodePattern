import { AuditData } from "../../Entities/Movie/BaseEntity";

export interface iMovie {
  MovTitle: string;
  MovYear?: number;
  MovLang?: string;
  MovCountry?: string;
  MovGenre?: Array<string>;
  MovDirector?: string;
  MovProdCompanies?: Array<Object>;
  AuditData?: AuditData;
}
