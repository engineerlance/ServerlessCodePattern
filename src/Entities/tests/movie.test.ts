import { Movie } from "../Movie"
import { propsMocker } from "./mock"

describe("Movie", () => {
    const defaultProps = propsMocker()
    it("must have a language that is in ISO Format", () => {
        const InvalidLangProps = propsMocker({ MovLang: "English" })
        expect(() => Movie.create(InvalidLangProps)).toThrow("invalid language format")
    })
})
