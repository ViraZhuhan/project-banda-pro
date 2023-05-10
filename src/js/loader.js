const body = document.querySelector('body');
const loader = document.createElement('div');
const spinner = document.createElement('div');
loader.classList.add('isHidden');
spinner.classList.add('spinner');
loader.appendChild(spinner);
body.appendChild(loader);

export function startSpinner() {
  loader.className = 'loader';
}
export function stopSpinner() {
  loader.className = 'isHidden';
}
