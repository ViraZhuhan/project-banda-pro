import Api from './api';

import getRefs from './components/get-refs';
import { genresList } from './components/genre-list';
import initRating from './init-rating';
// import { onOpenHeroModal, getMovieOfDayTrendId } from './hero-trailer';

const refs = getRefs();

const hero_poster = document.querySelector('.hero__movie-poster');

// const root = document.documentElement;

// import SubstructBlackDesk from '../images/hero-black-desk.png';
// import SubstructBlackTab from '../images/hero-black-tab.png';
// import SubstructWhiteDesk from '../images/hero-white-desk.png';
// import SubstructWhiteTab from '../images/hero-white-tab.png';
// import homePageBg from '../images/hero-home-desk.jpg';

const api = new Api();

getDayMovieTrend();

let idMovies = 0;
// let divEl = '';
let btn;

async function getDayMovieTrend() {
  try {
    const response = await api.dayTrends();
    const randomValue = getRandomHNumber();
    console.log(randomValue);
    refs.heroWrapperRef.insertAdjacentHTML(
      'beforeend',
      renderHeroPageMarkup(response.results[randomValue])
    );

    await new Promise(r => setTimeout(r, 500));
    btn = window.document.querySelector('#trailer');
    btn.addEventListener('click', onOpenModalEmpty2);
  } catch (err) {
    refs.heroWrapperRef.insertAdjacentHTML('beforeend', renderDefaultMarkup());
  }
}

function getRandomHNumber() {
  return Math.floor(Math.random() * 10);
}

function renderHeroPageMarkup({
  id,
  poster_path,
  title,
  overview,
  vote_average,
}) {
  idMovies = id;

  const imageUrl = poster_path
    ? `https://image.tmdb.org/t/p/w1280/${poster_path}`
    : 'https://via.placeholder.com/395x574?text=No+Image';

  hero_poster.style.backgroundImage = `url("${imageUrl}")`;

  return `
        <div class="hero__info">
        <h1 class="hero__title">${title}</h1>
        <div class="rating hero__vote">
          <div class="rating__body">
            <div class="rating__active" style="width: ${
              vote_average * 10
            }%;"></div>
            <div class="rating__items hero__vote">
              <input type="radio" class="rating__item" value="1" name="rating" />
              <input type="radio" class="rating__item" value="2" name="rating" />
              <input type="radio" class="rating__item" value="3" name="rating" />
              <input type="radio" class="rating__item" value="4" name="rating" />
              <input type="radio" class="rating__item" value="5" name="rating" />
            </div>
          </div>
          <div class="rating__value">${vote_average}</div>
        </div>
        <p class = "hero__text">${overview.slice(0, 150) + '...'}</p>
        <button type="button" class="hero__button" id="trailer" >Watch trailer</button>
        <div>
       `;
}

function renderDefaultMarkup() {
  return `
    <div class="hero__info">
      <h1 class="hero__title">Let’s Make Your Own Cinema</h1>
      <p class="hero__text">Is a guide to creating a personalized movie theater experience.
      You'll need a projector, screen, and speakers.<span class="paragraph__hidden">Decorate your space,
      choose your films, and stock up on snacks for the full experience.</span></p>
      <a href="/src/catalog.html" class="hero__btn">Get Started</a>
    </div>`;
}

async function getCurrentMovieTrailer() {
  try {
    const response = await api.getDetailsById(idMovies);

    findMovieTrailer(response.results);
  } catch (err) {
    addBasicHeroModalMarkup();
  }
}

//===========
const modal = document.querySelector('.modal-empty__backdrop');
const close = document.querySelector('.modal-empty__close');
modal.addEventListener('click', onModalEmpty);
close.addEventListener('click', onCloseModalEmpty);

//*
function onOpenModalEmpty2() {
  console.log('hi');
  toggleModalEmpty();
  window.document.addEventListener('keydown', onTapEsc);
}

function onModalEmpty(e) {
  if (e.target === e.currentTarget) {
    toggleModalEmpty();
    window.document.removeEventListener('keydown', onTapEsc);
  }
}

function onCloseModalEmpty() {
  toggleModalEmpty();
  window.document.removeEventListener('keydown', onTapEsc);
}

function onTapEsc(e) {
  if (e.key === 'Escape') {
    toggleModalEmpty();
  }
}

//*
function toggleModalEmpty() {
  if (modal.classList.contains('modal-empty__backdrop--close')) {
    modal.classList.remove('modal-empty__backdrop--close');
  } else {
    modal.classList.add('modal-empty__backdrop--close');
  }
}
