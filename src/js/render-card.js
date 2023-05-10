import Api from './api';
import { Loading } from 'notiflix';
import {initRatings} from './init-rating'
import cardsTpl from '../templates/cards.hbs';
import { noFilmError, onFetchError} from './msg-error';
import getRefs from './get-refs';
import genres from './genres';

const weeklyTrendsApi = new Api();
const refs = getRefs();


const seachApi = new Api();


function markup(data) {
    return data.map(
      ({ poster_path, title, vote_average, release_date, genre_ids  }) =>
        `<li class="gallery__item">
        <article>
        <img class="article__img" src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${title}" width="395" >
          <div class="details">
            <p class="title__txt">${title}</p>
            <div class="wraper__details">
            <p class="movieGenres">${genre_ids} | ${release_date}</p>
             <div class="rating">
              <div class="rating__body">
              <div class="rating__active" style="width: ${
                vote_average * 10
              }%;"></div>>
               </div>
              <div class="rating__value">${vote_average}</div>
            </div>
            </div>
          </div>
        </article>
        </li>`
    )
  }


async function createWeekTrends() {
  try {
    const response = await seachApi.weekTrends();
    createGallery(response.results.slice(0, 10));
  } catch (error) {
    console.log(error)
  }
}

function createGallery(films) {
  clearGallery();
  refs.gallery.insertAdjacentHTML('beforeend', markup(films));

}

function clearGallery() {
    refs.gallery.innerHTML = '';
}


// function genresList(idGenres) {
//       let namesGenres = [];
//       for (let i; i < idGenres.length; i += 1) {
//         const item = genres.find(el => el.id === idGenres[i]);
//         namesGenres.push(item.name);
//       }
//       console.log(namesGenres);
//       return namesGenres;
//     }
    
//     genresList([12, 15]) 



createWeekTrends();

export {createWeekTrends};
