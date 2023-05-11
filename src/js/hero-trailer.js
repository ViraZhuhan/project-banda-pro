import Api from './api';
import oopsImg from '../images/modal-empty-des_x1.png';

const refs = {
  heroModal: document.querySelector('.hero__modal'),
  modalWrapperRef: document.querySelector('.hero__modal-wrapper'),
  overlay: document.querySelector('.hero__overlay'),
  heroBtnCloseRef: document.querySelector('.hero__close-btn'),
};

refs.heroBtnCloseRef.addEventListener('click', onCloseHeroModal);
refs.overlay.addEventListener('click', onClickOverlay);

const api = new Api();

let currentId;

export { onOpenHeroModal, getMovieOfDayTrendId };

function onOpenHeroModal() {
  if (refs.modalWrapperRef.innerHTML === '') {
    getCurrentMovieTrailer(currentId);
  }
  window.addEventListener('keydown', onEscKeyPress);
  refs.heroModal.classList.add('active');
  refs.overlay.classList.add('active');
}
function onCloseHeroModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  refs.heroModal.classList.remove('active');
  refs.overlay.classList.remove('active');
  refs.modalWrapperRef.innerHTML = '';
}

function onClickOverlay(event) {
  if (event.target === event.currentTarget) {
    onCloseHeroModal();
  }
}

function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    onCloseHeroModal();
  }
}

function getMovieOfDayTrendId(id) {
  currentId = id;
  getCurrentMovieTrailer(id);
}

async function getCurrentMovieTrailer(id) {
  try {
    const response = await api.getDetailsById(id);
    findMovieTrailer(response.results);
  } catch (err) {
    addBasicHeroModalMarkup();
  }
}

function findMovieTrailer(videos) {
  const OfficialTrailer = videos.find(video => video.type === 'Trailer');

  if (OfficialTrailer) {
    addTrailerOnModal(OfficialTrailer);
  } else {
    addBasicHeroModalMarkup();
  }
}

function addBasicHeroModalMarkup() {
  const modalMarkup = `<div class="hero__box-trailer">
      <p class="hero__text-trailer">OOPS...</p>
      <p class="hero__text-trailer">We are very sorry!</p>
      <p class="hero__text-trailer">But we couldn’t find the trailer.</p>
    </div>
    <img class="hero__img-trailer" src="${oopsImg}" alt="Cinema" />
  </div>`;

  refs.modalWrapperRef.innerHTML = modalMarkup;
}

function addTrailerOnModal({ key }) {
  const modalMarkup = `<iframe class='player'
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/${key}"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>`;

  refs.modalWrapperRef.innerHTML = modalMarkup;
}
