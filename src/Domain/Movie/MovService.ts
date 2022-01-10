import fetch from "node-fetch"
import { addMovieRepo } from "../../Data/Movie/saveMovieRepo"
import { deleteMovieRepo } from "../../Data/Movie/deleteMovieRepo"
import { getMovieRepo } from "../../Data/Movie/getMovieRepo"
import { Movie } from "../../Entities/Movie/Movie"

const validateRights = async (movName: string, movYear: number): Promise<boolean> => {
    const checkPublic = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_key}&query=${movName}&year=${movYear}`
    )
    const existingMov = await checkPublic.json()
    return !!existingMov
}

export const createMov = async (params): Promise<Movie> => {
    const movieobj = new Movie({
        MovTitle: params.MovTitle,
        MovYear: params?.MovYear,
        MovLang: params?.MovLang,
        MovCountry: params?.MovCountry,
        MovGenre: params?.MovGenre,
        MovProdCompanies: params?.MovProdCompanies,
        MovDirector: params?.MovDirector,
        AuditData: {
            createdAt: new Date()
        }
    })

    if (await validateRights(movieobj.MovTitle, movieobj.MovYear as number)) {
        const addMovie = new addMovieRepo()
        await addMovie.save(movieobj)
        return movieobj
    } else {
        throw new Error("Movie_exists_public")
    }
}

export const readMov = async (MovTitle: string): Promise<Movie> => {
    const getMovie = new getMovieRepo()
    return await getMovie.get(MovTitle)
}

export const removeMov = async (MovTitle: string) => {
    const removeMovie = new deleteMovieRepo()
    return await removeMovie.deleteMovie(MovTitle)
}
