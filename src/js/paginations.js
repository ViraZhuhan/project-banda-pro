import Api from './api';
import throttle from 'lodash.throttle';
import { createGallery } from './render-card';
import Notiflix from 'notiflix';

const api = new Api();
const message = Notiflix.Notify;
const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const gallery = document.querySelector('.gallery');
form.addEventListener('submit', onSearch);
window.addEventListener(
  'scroll',
  throttle(e => {
    checkPosition();
  }, 3000)
);

async function onSearch(event) {
  event.preventDefault();
  const query = event.currentTarget.elements.searchQuery.value.trim();
  const results = await api.searchMovieByQuery(query);
  if (query === '')
    return message.failure(
      'Sorry, there are no images matching your search query. Please try again.',
      {
        timeout: 1000,
      }
    );
  message.info(`Hooray! We found ${results.total_results} images.`, {
    timeout: 1000,
  });
  api.reset();
  api.nextPage();
  resetGallery();
  markup(results.results);
}

function checkPosition() {
  const query = input.value.trim();
  const height = document.body.offsetHeight;
  const screenHeight = window.innerHeight;
  const scrolled = window.scrollY;
  const threshold = height - screenHeight / 4;
  const position = scrolled + screenHeight;

  if (position >= threshold) {
    api.searchMovieByQuery(query).then(res => {
      markup(res.results);
      api.nextPage();
    });
  }
}

const markup = e => {
  gallery.insertAdjacentHTML('beforeend', createGallery(e));
};

const resetGallery = () => (gallery.innerHTML = '');
