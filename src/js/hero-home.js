import Api from './api';

import getRefs from './components/get-refs';
import { genresList } from './components/genre-list';
import initRating from './init-rating';

const refs = getRefs();


const root = document.documentElement;

import SubstructBlackDesk from '../images/hero-black-desk.png';
import SubstructBlackTab from '../images/hero-black-tab.png';
import SubstructWhiteDesk from '../images/hero-white-desk.png';
import SubstructWhiteTab from '../images/hero-white-tab.png';
import homePageBg from '../images/hero-home-desk.jpg';

const api = new Api();

getDayMovieTrend();


async function getDayMovieTrend() {
  try {
    const response = await api.dayTrends();

    if (response.results.length === 0) {
      return renderDefaultMarkup();}
    
      else {

        console.log(response.results[getRandomHNumber()])
        
        renderHeroPageMarkup(response.results[getRandomHNumber()]).join('');


      }

    // renderHeroPageMarkup(response.results[random]);
  } catch (err) {
    renderDefaultMarkup();
  }
}

function getRandomHNumber() {
  return Math.floor(Math.random() * 10);
}


function renderHeroPageMarkup({
    id,
    poster_path,
    original_title,
    overview,
    vote_average,
  }) {
    
    const imageUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500/${poster_path}`
    : 'https://via.placeholder.com/395x574?text=No+Image';

  
    refs.heroWrapperRef.innerHTML = `
      <h1 class="hero__title">${original_title}</h1>
      <div class="rating hero__vote">
        <div class="rating__body">
          <div class="rating__active" style="width: ${vote_average * 10}%;"></div>
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
      <p class="hero__text hero__movie-descripton" movie-id="${id}>${overview}</p>
      <button class="hero__btn">Watch trailer</button>
     `;
  }



  function renderDefaultMarkup() {
  return `
    <h1 class="hero__title">Let’s Make Your Own Cinema</h1>
  <p class="hero__text">Is a guide to creating a personalized movie theater experience.
   You'll need a projector, screen, and speakers.<span class="paragraph__hidden">Decorate your space,
   choose your films, and stock up on snacks for the full experience.</span></p>
   <a href="/src/catalog.html" class="hero__btn">Get Started</a>
   `;
  
}




// async function getDayMovieTrend() {
//   try {
//     const response = await pageHeroApi.dayTrends();
//     const random = Math.floor(Math.random() * response.results.length);

//     renderHeroPageMarkup(response.results[random]);
//   } catch (err) {
//     renderDefaultMarkup();
//   }
// }

// export { getDayMovieTrend, renderHeroPageMarkup };

// function renderDefaultMarkup() {
//   refs.heroWrapperRef.innerHTML = `
//     <h1 class="hero__title">Let’s Make Your Own Cinema</h1>
//   <p class="hero__text">Is a guide to creating a personalized movie theater experience.
//    You'll need a projector, screen, and speakers.<span class="paragraph__hidden">Decorate your space,
//    choose your films, and stock up on snacks for the full experience.</span></p>
//    <a href="/src/catalog.html" class="hero__btn">Get Started</a>
//    `;

//   changeHeroBackground(homePageBg);
// }

// function renderHeroPageMarkup({
//   id,
//   backdrop_path,
//   original_title,
//   overview,
//   vote_average,
// }) {
//   const url = `https://image.tmdb.org/t/p/w1280${backdrop_path}`;

//   refs.heroWrapperRef.innerHTML = `
//     <h1 class="hero__title">${original_title}</h1>
//     <div class="rating hero__vote">
//       <div class="rating__body">
//         <div class="rating__active" style="width: ${vote_average * 10}%;"></div>
//         <div class="rating__items hero__vote">
//           <input type="radio" class="rating__item" value="1" name="rating" />
//           <input type="radio" class="rating__item" value="2" name="rating" />
//           <input type="radio" class="rating__item" value="3" name="rating" />
//           <input type="radio" class="rating__item" value="4" name="rating" />
//           <input type="radio" class="rating__item" value="5" name="rating" />
//         </div>
//       </div>
//       <div class="rating__value">${vote_average}</div>
//     </div>
//     <p class="hero__text hero__movie-descripton" movie-id="${id}>${overview}</p>
//     <button class="hero__btn">Watch trailer</button>
//    `;

//   changeHeroBackground(url);

//   const watchMovieTrailerBtn = document.querySelector('.hero__btn');
//   watchMovieTrailerBtn.addEventListener('click', onOpenHeroModal);
// }

// function changeHeroBackground(bgImg) {
//   if (window.matchMedia('(min-width: 1280px)').matches) {
//     const bgDecorator = root.classList.contains('light')
//       ? SubstructWhiteDesk
//       : SubstructBlackDesk;
//     refs.heroRef.style.backgroundImage = `url('${bgDecorator}'), url('${bgImg}')`;
//   } else if (window.matchMedia('(min-width: 768px)').matches) {
//     const bgDecorator = root.classList.contains('light')
//       ? SubstructWhiteTab
//       : SubstructBlackTab;
//     refs.heroRef.style.backgroundImage = `url('${bgDecorator}'), url('${bgImg}')`;
//   } else {
//     refs.heroRef.style.backgroundImage = `linear-gradient(
//       87.8deg,
//       #0e0e0e 15.61%,
//       rgba(14, 14, 14, 0) 60.39%
//     ), url('${bgImg}')`;
//   }

//   window.addEventListener('resize', onPageChangeSize);

//   function onPageChangeSize(e) {
//     const currentPageWidth = e.currentTarget.innerWidth;
//     if (currentPageWidth >= 1280) {
//       const bgDecorator = root.classList.contains('light')
//         ? SubstructWhiteDesk
//         : SubstructBlackDesk;
//       refs.heroRef.style.backgroundImage = `url('${bgDecorator}'), url('${bgImg}')`;
//     } else if (currentPageWidth >= 768) {
//       const bgDecorator = root.classList.contains('light')
//         ? SubstructWhiteTab
//         : SubstructBlackTab;
//       refs.heroRef.style.backgroundImage = `url('${bgDecorator}'), url('${bgImg}')`;
//     } else if (currentPageWidth < 768) {
//       refs.heroRef.style.backgroundImage = `linear-gradient(
//       87.8deg,
//       #0e0e0e 15.61%,
//       rgba(14, 14, 14, 0) 60.39%
//     ), url('${bgImg}')`;
//     }
//   }
// }
