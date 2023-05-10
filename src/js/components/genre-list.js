import { genres } from './genres';

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
