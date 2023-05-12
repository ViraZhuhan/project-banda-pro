import Api from './api';

const api = new Api();

const refs = {
  backdrop: document.querySelector('.backdrop'),
  modal: document.querySelector('.modal'),
  gallery: document.querySelector('.gallery'),
};
const toggleModal = () => {
  refs.backdrop.classList.toggle('hidden');
};
// ========================CLICK ESP=====================

window.addEventListener('keydown', event => {
  if (event.key === 'Escape') refs.backdrop.classList.add('hidden');
});
// ========================CLICK backdrop================

refs.backdrop.addEventListener('click', event => {
  if (event.target.className === 'backdrop') {
    toggleModal();
  }
});

// ========================CLICK Open=====================

refs.gallery.addEventListener('click', event => {
  if (event.target.closest('.gallery__item ') === null) {
    return;
  }
  toggleModal();
  let idOfCard = event.target.closest('.gallery__item ').id;
  modalMovie(idOfCard);
});

// ========================================================

export async function modalMovie(id) {
  try {
    const data = await api.getDetailsById(id);
    const idGenres = data.genres;
    const newGenreMovie = [];
    idGenres.map(elem => {
      newGenreMovie.push(elem.name);
    });

    const voteAverage = data.vote_average.toFixed(2);
    const popularity = data.popularity.toFixed(1);
    const imageUrl = data.poster_path
      ? `https://image.tmdb.org/t/p/w500/${data.poster_path}`
      : 'https://via.placeholder.com/395x574?text=No+Image';

    const backdropPath = data.backdrop_path
      ? `https://image.tmdb.org/t/p/w1280/${data.backdrop_path}`
      : 'https://via.placeholder.com/395x574?text=No+Image';
    refs.backdrop.style.backgroundImage = `url("${backdropPath}")`;
    refs.backdrop.style.backgroundSize = 'cover';
    refs.backdrop.style.backgroundRepeat = 'no-repeat';

    refs.modal.innerHTML = `
    <img class="modal__img" src=${imageUrl} alt=${
      data.original_name
    } loading="lazy">
    <div class="modal__items">
      <h1 class="modal__title">${data.title}</h1>
      <p class="modal__rating">Vote / Votes
        <span class="modal__rating_span">
          <span class="rating-vote">${voteAverage}</span> /
          <span class="rating-vote">${data.vote_count}</span>
        </span>
      </p>
      <p class="modal__popularity">Popularity <span>${popularity}</span> </p>
      <p class="modal__genre">Genre <span>${newGenreMovie.join(' ')}</span></p>
      <p class="modal__about">ABOUT</p>
      <p class="modal__description">${data.overview}</p>
      <button class="button-add" type="button">
        <span class="button-add__tex">Add to my library</span>
      </button>
      <button class="button-remove hidden" type="button"><span class="button-add__tex">Remove from my library</span> </button>
    </div>`;

    const buttonAdd = document.querySelector('.button-add');
    const buttonRemove = document.querySelector('.button-remove');
    const closeModalBtn = document.querySelector('.button__close');

    closeModalBtn.addEventListener('click', toggleModal);
    buttonAdd.addEventListener('click', addLS);
    buttonRemove.addEventListener('click', removeLS);

    const ID_GENRE = idGenres.map(({ id }) => id);
    const KEY = 'LibraryMovie';
    const movieItem = {
      release_date: data.release_date,
      id,
      title: data.title,
      popularity,
      vote_average: voteAverage,
      poster_path: imageUrl,
      vote_count: data.vote_count,
      genre_ids: ID_GENRE,
      overview: data.overview,
    };
    function addLS() {
      try {
        let objects = null
          ? undefined
          : JSON.parse(localStorage.getItem(KEY)) || [];
        objects.push(movieItem);
        localStorage.setItem(KEY, JSON.stringify(objects));
        buttonAdd.classList.add('hidden');
        buttonRemove.classList.remove('hidden');
      } catch (error) {
        console.error(error);
      }
    }

    function removeLS() {
      try {
        let objects = null ? undefined : JSON.parse(localStorage.getItem(KEY));
        const indexMovie = objects.findIndex(obj => obj.id === id);
        objects.splice(indexMovie, 1);
        localStorage.setItem(KEY, JSON.stringify(objects));
        location.reload()
        buttonAdd.classList.remove('hidden');
        buttonRemove.classList.add('hidden');
      } catch (error) {
        console.error(error);
      }
    }
    function ls() {
      try {
        const itemLs = localStorage.getItem(KEY);
        const parceLS = null ? undefined : JSON.parse(itemLs);
        if (parceLS === null) {
          return;
        }
        parceLS.map(elm => {
          if (elm.id === id) {
            buttonAdd.classList.add('hidden');
            buttonRemove.classList.remove('hidden');
          }
        });
      } catch (error) {
        console.error(error);
      }
    }
    ls();
  } catch (error) {
    console.error(error);
  }
}
