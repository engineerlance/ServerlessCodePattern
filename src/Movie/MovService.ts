import { Movie, getMovie, deleteMovie } from "../Data/MovDAO";
import fetch from "node-fetch";
import { iMovie } from "../Data/Mov.Interfaces";

const validateRights = async (
  movName: string,
  movYear: number
): Promise<boolean> => {
  try {
    const checkPublic = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_key}&query=${movName}&year=${movYear}`
    );
    const existingMov = await checkPublic.json();
    return existingMov.results.length === 0;
  } catch {
    throw new Error("Error_Public_API");
  }
};

export const createMov = async (params: iMovie): Promise<Movie> => {
  const movieobj = new Movie(
    params.MovTitle.trim(),
    params.MovYear,
    params.MovLang,
    params.MovCountry,
    params.MovGenre,
    params.MovDirector,
    params.MovProdCompanies
  );
  if (await validateRights(movieobj.MovTitle, movieobj.MovYear as number)) {
    await movieobj.save();
    return movieobj;
  } else {
    throw new Error("Movie_exists_public");
  }
};

export const readMov = async (MovTitle: string): Promise<Movie> => {
  const movieobj = new Movie(MovTitle);
  console.log(movieobj);
  console.log(MovTitle);
  return await getMovie(movieobj);
};

export const removeMov = async (MovTitle: string): Promise<Object> => {
  const movieobj = new Movie(MovTitle);
  return await deleteMovie(movieobj);
};
