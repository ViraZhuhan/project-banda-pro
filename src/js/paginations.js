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

function noSearchResults() {
  gallery.innerHTML =
    `<p class="no-results">
  OOPS...<br />
  We are very sorry!<br />
  We don’t have any results due to your search.
  </p>`

}
async function onSearch(event) {
  event.preventDefault();
  const query = event.currentTarget.elements.searchQuery.value.trim();
  const results = await api.searchMovieByQuery(query);
  const films = results.results.slice(0, 10);
  if (query === ''){
    return message.failure(
      'Sorry, there are no images matching your search query. Please try again.',
      {
        timeout: 2000,
      }
    );} else if(films.length === 0)
    {    
      return noSearchResults()
    }
    
  api.reset();
  api.nextPage();
  resetGallery();
  markup(films);

  window.addEventListener(
    'scroll',
    throttle(event => {
      checkPosition(event);
    }, 4000)
  );
}

function checkPosition(event) {
  const query = input.value.trim();
  const height = document.body.offsetHeight;
  const screenHeight = window.innerHeight;
  const scrolled = window.scrollY;
  const threshold = height - screenHeight / 2;
  const position = scrolled + screenHeight;

  if (position >= threshold) {
    api
    .searchMovieByQuery(query)
    .then(res => {
      const data = res.results.slice(0, 10)
      markup(data);
      api.nextPage();
    });
  }
}

const markup = e => {
  gallery.insertAdjacentHTML('beforeend', createGallery(e));
};

const resetGallery = () => (gallery.innerHTML = '');
