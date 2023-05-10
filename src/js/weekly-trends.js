// import Api from './api';
// import getRefs from './get-refs';

// const weeklyTrendsApi = new Api();
// const refs = getRefs();

// // ======================================================
// function initRatings() {
//   if (refs.rating.length > 0) {
//     for (let index = 0; index < refs.rating.length; index++) {
//       const ratingElement = refs.rating[index];
//       initRating(ratingElement);
//     }
//   }
// }

// function initRating(rating) {
//   const ratingActive = rating.querySelector('.rating__active');
//   const ratingValue = rating.querySelector('.rating__value');
//   const ratingItems = rating.querySelectorAll('.rating__item');

//   ratingItems.forEach(item => {
//     item.addEventListener('click', () => {
//       ratingValue.innerHTML = item.value;
//       setRatingActiveWidth(ratingActive, ratingValue);
//     });
//   });
//   setRatingActiveWidth(ratingActive, ratingValue);
// }

// function setRatingActiveWidth(ratingActive, ratingValue) {
//   const ratingActiveWidth = ratingValue.innerHTML / 0.025;
//   ratingActive.style.width = `${ratingActiveWidth}%`;
// }
// // ===================================================
// async function renderWeeklyTrends() {
//   try {
//     const data = await weeklyTrendsApi.weekTrends();
//     const movies = data.results.slice(0, 3);
//     console.log(data);
//     const genres = await weeklyTrendsApi.fetchGenres();

//     const moviesElements = movies.map(movie => {
//       const { poster_path, title, vote_average, release_date, genre_ids, id } =
//         movie;

//       const voteAverage = vote_average;

//       const release = new Date(release_date).getFullYear();

//       const movieGenres = genres
//         .filter(genre => genre_ids.includes(genre.id))
//         .map(genre => genre.name);

//       const imageUrl = poster_path
//         ? `https://image.tmdb.org/t/p/w500/${poster_path}`
//         : 'https://via.placeholder.com/395x574?text=No+Image';

//       return `
//         <li id='${id}' class="article__item">
//         <article>
//         <img class="article__img" src="${imageUrl}" alt="${title}" width="395" >
//           <div class="details">
//             <p class="title__txt">${title}</p>
//             <div class="wraper__details">
//             <p class="movieGenres">${movieGenres
//               .slice(0, 2)
//               .join(', ')} | ${release}</p>
            
//             <div class="rating">
//               <div class="rating__body">
//               <div class="rating__active" style="width: ${
//                 voteAverage * 10
//               }%;"></div>>
//                 <div class="rating__items">
//                   <input type="radio" class="rating__item" value="1" name="rating" />
//                   <input type="radio" class="rating__item" value="2" name="rating" />
//                   <input type="radio" class="rating__item" value="3" name="rating" />
//                   <input type="radio" class="rating__item" value="4" name="rating" />
//                   <input type="radio" class="rating__item" value="5" name="rating" />
//                 </div>
//               </div>
//               <div class="rating__value">${voteAverage}</div>
//             </div>
//             </div>
//           </div>
//         </article>
          
//         </li>
//       `;
//     });

//     refs.wrapper.innerHTML = moviesElements.join('');
//     initRatings();
//   } catch (error) {
//     console.error(error);
//   }
// }

// renderWeeklyTrends();
