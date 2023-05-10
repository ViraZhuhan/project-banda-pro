import getRefs from './components/get-refs';

const refs = getRefs();

refs.modalEmptyEl.addEventListener('click', onModalEmpty);
refs.closeModalEmptyEl.addEventListener('click', onCloseModalEmpty);

export function onOpenModalEmpty() {
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

function toggleModalEmpty() {
  if (refs.modalEmptyEl.classList.contains('modal-empty__backdrop--close')) {
    refs.modalEmptyEl.classList.remove('modal-empty__backdrop--close');
  } else {
    refs.modalEmptyEl.classList.add('modal-empty__backdrop--close');
  }
}
