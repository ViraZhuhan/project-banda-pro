import getRefs from './components/get-refs';
import { genresList } from './components/genre-list';
import initRating from './init-rating';

const refs = getRefs();

function markup(data) {
  return data.map(
    ({ poster_path, title, vote_average, release_date, genre_ids, id }) => {
      const genres = genresList(genre_ids);
      const release = new Date(release_date).getFullYear();

      const imageUrl = poster_path
        ? `https://image.tmdb.org/t/p/w500/${poster_path}`
        : 'https://via.placeholder.com/395x574?text=No+Image';

      // initRatings();

      return `<li class="gallery__item" id='${id}'>
        <article>
        <img class="gallery__img" src="${imageUrl}" alt="${title}" loading="lazy" width="395" >
          <div class="gallery__details">
            <p class="details__title">${title}</p>
            <div class="wraper__details">
            <p class="movieGenres">${genres} | ${release}</p>
              <div class="rating">
              <div class="rating__body">
              <div class="rating__active" style="width: ${
                vote_average * 10
              }%;"></div>>
                <div class="rating__items">
                  <input type="radio" class="rating__item" value="1" name="rating" />
                  <input type="radio" class="rating__item" value="2" name="rating" />
                  <input type="radio" class="rating__item" value="3" name="rating" />
                  <input type="radio" class="rating__item" value="4" name="rating" />
                  <input type="radio" class="rating__item" value="5" name="rating" />
                </div>
              </div>
              <div class="rating__value">${vote_average}</div>
            </div>
            </div>
          </div>
        </article>
        </li>`;
    }
  );
}

function createGallery(films) {
  clearGallery();
  refs.gallery.innerHTML = markup(films).join('');
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

export { createGallery, clearGallery };
