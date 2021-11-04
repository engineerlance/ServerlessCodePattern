import { iMovie } from "./Mov.Interfaces";
import { BaseEntity } from "./BaseEntity";

export class Movie extends BaseEntity {
  readonly MovTitle: string;
  readonly MovYear?: number;
  readonly MovLang?: string;
  readonly MovCountry?: string;
  readonly MovGenre?: Array<string>;
  readonly MovDirector?: string | "";
  readonly MovProdCompanies?: Array<Object>;

  constructor(props: iMovie) {
    super(props.AuditData ? props.AuditData : {});
    this.MovTitle = props.MovTitle;
    this.MovYear = props.MovYear;
    this.MovLang = props.MovLang;
    this.MovCountry = props.MovCountry;
    this.MovGenre = props.MovGenre;
    this.MovDirector = props.MovDirector;
    this.MovProdCompanies = props.MovProdCompanies;
  }

  static create(props: iMovie): Movie {
    //Runtime validation goes here
    return new Movie(props);
  }
}
