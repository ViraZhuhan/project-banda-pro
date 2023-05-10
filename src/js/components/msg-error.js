import Notiflix from 'notiflix';

export { noFilmError, onFetchError, noGenresError};

function noFilmError() {
  Notiflix.Notify.warning(
    `Sorry, there are no films. Please try again late`
  );
}

function onFetchError() {
  Notiflix.Notify.failure(`Please write something and try again`);
}

function noGenresError() {
    Notiflix.Notify.warning(
      `Sorry, there are no genres. Please try again late`
    );
  }


