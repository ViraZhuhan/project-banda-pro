import getRefs from './components/get-refs';

const refs = getRefs();

const modal = document.querySelector('.modal-empty__backdrop');
const close = document.querySelector('.modal-empty__close');
modal.addEventListener('click', onModalEmpty1);
close.addEventListener('click', onCloseModalEmpty);

export function onOpenModalEmpty() {
  console.log('bu');
  toggleModalEmpty1();
  window.document.addEventListener('keydown', onTapEsc);
}

function onModalEmpty1(e) {
  if (e.target === e.currentTarget) {
    toggleModalEmpty1();
    window.document.removeEventListener('keydown', onTapEsc);
  }
}

function onCloseModalEmpty() {
  toggleModalEmpty1();
  window.document.removeEventListener('keydown', onTapEsc);
}

function onTapEsc(e) {
  if (e.key === 'Escape') {
    toggleModalEmpty1();
  }
}

function toggleModalEmpty1() {
  if (modal.classList.contains('modal-empty__backdrop--close')) {
    modal.classList.remove('modal-empty__backdrop--close');
  } else {
    modal.classList.add('modal-empty__backdrop--close');
  }
}
