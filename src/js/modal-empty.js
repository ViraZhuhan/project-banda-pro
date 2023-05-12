import getRefs from './components/get-refs';

const refs = getRefs();

const modal = document.querySelector('.modal-empty__backdrop');
const close = document.querySelector('.modal-empty__close');
modal.addEventListener('click', onModalEmpty);
close.addEventListener('click', onCloseModalEmpty);

setTimeout(async () => {
  await new Promise(r => setTimeout(r, 1000));
  const btn = window.document.querySelector('#trailer');
  btn.addEventListener('click', onOpenModalEmpty);
  console.log(), 200;
});

export default function onOpenModalEmpty() {
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
  if (modal.classList.contains('modal-empty__backdrop--close')) {
    modal.classList.remove('modal-empty__backdrop--close');
  } else {
    modal.classList.add('modal-empty__backdrop--close');
  }
}
