import { modalMovie } from './modal_movie';
import { createGallery } from './render-card';

import { refs } from './modal_movie';

const movieClicked = document.querySelector('.library-cards__list');
const noFilmsMessage = document.querySelector('.alert__message');
const libraryCards = document.querySelector('.library-cards');

movieClicked.addEventListener('click', onMovieClicked);
window.addEventListener('load', onLoadPage);

function onLoadPage() {
  const KEY_MOVIE_LS = 'LibraryMovie';
  // const data = null
  //   ? undefined
  //   : JSON.parse(localStorage.getItem(KEY_MOVIE_LS));
  const data = JSON.parse(localStorage.getItem(KEY_MOVIE_LS));

  if (data === null || data.length === 0) {
    noFilmsMessage.classList.remove('hidden');
    libraryCards.classList.toggle('hidden');
  } else if (data) {
    createGallery(data);
  }
}

function onMovieClicked(event) {
  if (event.target.closest('.gallery__item ') === null) {
    return;
  }
  let idOfCard = event.target.closest('.gallery__item ').id;
  modalMovie(idOfCard);
}
