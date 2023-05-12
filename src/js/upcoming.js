import Api from './api';
const refs = {
  galleryOfNewMovies: document.querySelector('.upcoming__container'),
};
const newMovies = new Api();

fetchUpcomingMovie()
  .then(renderUpcomingMovieCard)
  .catch(er => console.log(er.message));
renderUpcomingMovieCard();
export function fetchUpcomingMovie() {
  return newMovies.upcoming();
}

export async function renderUpcomingMovieCard(res) {
    try {
      const genres = await newMovies.fetchGenres();

  const min = 0;
  const max = 19;
  const UpcomingMovieRandom = Math.floor(Math.random() * (max - min + 1)) + min;
      const resultsRandom = [res.results[UpcomingMovieRandom]];
      const data = res.results[UpcomingMovieRandom];
  
      const createUpcomingCard = resultsRandom.map(result => {
        const {
          backdrop_path,
          original_title,
          release_date,
          vote_average,
          vote_count,
          popularity,
          genre_ids,
          overview,
        } = result;
        function getFormatDate(join) {
          join = join || ' '; // разделитель по дефолту
  
          const release = new Date(release_date);
          return (
            release.getDate() +
            join +
            release.getMonth() +
            join +
            release.getFullYear()
          );
        }
  
        const idGenre = data.genre_ids;
  
        let nameGenres = [];
        for (let i = 0; i < idGenre.length; i += 1) {
          const item = genres.find(el => el.id === idGenre[i]);
          nameGenres.push(item.name);
        }
  
   const title = data.original_title;
   const imageUrl = data.backdrop_path
   ? `https://image.tmdb.org/t/p/w500/${data.backdrop_path}`
   : 'https://via.placeholder.com/395x574?text=No+Image'; 
   const formatDate = getFormatDate('.');
   const voteAverage = data.vote_average;
   const voteCount = data.vote_count;
   const movieId = JSON.stringify(data.id);
   const genreUp = nameGenres.slice(0, 2).join(', ');
  
  refs.galleryOfNewMovies.innerHTML = ` <h2 class="upcoming__title">Upcoming this month</h2>
  <div class="upcoming__info"> 
  <img src="https://image.tmdb.org/t/p/original/${imageUrl}" alt="${title}"  loading="lazy" class="upcoming__img" />
  <div class="upcoming__info-btn">
  <div class="upcoming__info-layout">
  <h3 class ="upcoming__movie-title"><span class="upcoming__item-font-title">${title}</span></h3>
  <div class="upcoming__list-tablet">
  <ul class="upcoming__list">
  <li class ="upcoming__item"><span class="upcoming__item-font-date">Release date</span><span class="upcoming__item-data">${formatDate}</span></li>
  <li class ="upcoming__item"><span class="upcoming__item-font-vote">Vote/Votes </span><span class="upcoming__item-vote">${voteAverage}</span>  /  <span class="upcoming__item-votes">${voteCount}</span></li>
  </ul>
  <ul class="upcoming__list">
  <li class ="upcoming__item"><span class="upcoming__item-font-popularity">Popularity </span><span class="upcoming__item-pop">${popularity}</span></li>
  <li class ="upcoming__item"><span class="upcoming__item-font-genre">Genre </span><span class="upcoming__item-genre">${genreUp}</span></li>
  </ul>
  </div>
  <p class ="upcoming__movie-about">About</p>
  <p class="upcoming__item-font-about">${overview}</p>
  </div>
  <button type="button" class="upcoming__button">Remind me</button>
  </div>
  </div>`;
  
  const remindBtn = document.querySelector('button.upcoming__button');
  const KEY = 'LibraryMovie';
  
   const movieItem = {
    release_date: formatDate,
    id: movieId,
    title: title,
    popularity,
    vote_average: voteAverage,
    poster_path: data.poster_path,
    vote_count:voteCount,
    genre_ids: idGenre,
    overview,
  };
  remindBtn.addEventListener('click', onClick);
  function onClick() {
      try {
        let objects = null
         ? undefined
         : JSON.parse(localStorage.getItem(KEY)) || [];
       objects.push(movieItem);
       localStorage.setItem(KEY, JSON.stringify(objects));
       
       return remindBtn.disabled = true;
      } catch (error) {
        console.error(error);
      }
    }
  
  function savedMovie() {
      try {
        const itemLs = localStorage.getItem(KEY);
        const parceLS = null ? undefined : JSON.parse(itemLs);
        if (parceLS === null) {
          return;
        }
        parceLS.map(elm => {
          if (elm.id === movieItem.id) {
            return remindBtn.disabled = true;
          }
        });
    
          } catch (error) {
            console.error(error);
          }
        }
         
        savedMovie();
      });
    } catch{error => (console.log(error.message))};
    };


 