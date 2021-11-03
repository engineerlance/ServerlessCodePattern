import { Movie, getMovie, deleteMovie } from "../../Data/Movie/MovDAO";
import fetch from "node-fetch";
import { iMovie } from "../../Data/Movie/Mov.Interfaces";

const validateRights = async (
  movName: string,
  movYear: number
): Promise<boolean> => {
  const checkPublic = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_key}&query=${movName}&year=${movYear}`
  );
  const existingMov = await checkPublic.json();
  return existingMov.results.length === 0;
};

export const createMov = async (params: iMovie): Promise<Movie> => {
  const movieobj = new Movie({
    MovTitle: params!.MovTitle,
    MovYear: params?.MovYear,
    MovLang: params?.MovLang,
    MovCountry: params?.MovCountry,
    MovGenre: params?.MovGenre,
    MovProdCompanies: params?.MovProdCompanies,
    MovDirector: params?.MovDirector,
  });

  if (await validateRights(movieobj.MovTitle, movieobj.MovYear as number)) {
    await movieobj.save();
    return movieobj;
  } else {
    throw new Error("Movie_exists_public");
  }
};

export const readMov = async (MovTitle: string): Promise<Movie> => {
  const movieobj = new Movie({ MovTitle: MovTitle });
  return await getMovie(movieobj);
};

export const removeMov = async (MovTitle: string): Promise<Object> => {
  const movieobj = new Movie({ MovTitle: MovTitle });
  return await deleteMovie(movieobj);
};
