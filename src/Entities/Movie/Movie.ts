import { iMovie } from "./MovInterface"
import { BaseEntity } from "./BaseEntity"
import ISO6391 from "iso-639-1"

function validateLang(lang: string) {
    const langList = ISO6391.getAllCodes()
    return langList.includes(lang)
}

export class Movie extends BaseEntity {
    props: iMovie

    constructor(props: iMovie) {
        super(props.AuditData ? props.AuditData : {})
        this.props = props
    }

    static create(props: iMovie) {
        //Runtime validation goes here
        if (props.MovLang) {
            if (!validateLang(props.MovLang)) {
                throw new Error("invalid language format")
            }
        }

        return new Movie(props)
    }
}
