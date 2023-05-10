import { genres } from './genres';
import Api from '../api';

const api = new Api();

export const genresList = array => {
  if (!Array.isArray(array)) {
    return 'Unknown genre';
  }
  const genreResult = genres
    .filter(({ id }) => array.includes(id))
    .map(({ name }) => name);

  if (!genreResult.length) {
    return 'Unknown genre';
  } else if (genreResult.length > 2) {
    return `${genreResult.slice(0, 2).join(', ')}`;
  } else {
    return genreResult.join(', ');
  }
};

async function getGenre(movieId) {
  try {
    const response = api.fetchGenres(movieId);
    const genres = response.data.genres
      .slice(0, 2)
      .map(genre => genre.name)
      .join(', ');
    return genres;
  } catch (error) {
    console.log(error);
  }
}
