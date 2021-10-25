import { Movie } from "./MovDAO";
import fetch from "node-fetch";
import { MovieSchema } from "./Mov.Interfaces";

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

export const createMovie = async (params: MovieSchema): Promise<Movie> => {
  const movieToAdd = new Movie(
    params.MovTitle.trim(),
    params.MovYear,
    params.MovLang,
    params.MovCountry,
    params.MovGenre,
    params.MovDirector,
    params.MovProdCompanies
  );
  if (await validateRights(movieToAdd.MovTitle, movieToAdd.MovYear)) {
    await Movie.insertMovie(movieToAdd);
    return movieToAdd;
  } else {
    throw new Error("Movie_exists_public");
  }
};

export const getMovie = async (movName: string): Promise<Object> => {
  return await Movie.readMovie(movName);
};

export const removeMovie = async (pk: string, sk: string): Promise<Object> => {
  return await Movie.deleteMovie(pk, sk);
};
