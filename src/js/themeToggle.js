import getRefs from './components/get-refs';
/* import SubstructBlackDesk from '../images/hero-black-desk.png';
import SubstructBlackTab from '../images/hero-black-tab.png';
import SubstructWhiteDesk from '../images/hero-white-desk.png';
import SubstructWhiteTab from '../images/hero-white-tab.png'; */

const refs = getRefs();
/* const hero = document.querySelector('.hero');
const root = document.documentElement; */

// Switch theme by changing root element class based on checkbox input state
export default (() => {
  if (refs.savedTheme === 'light') refs.switcher.checked = true;
  refs.switcher.addEventListener('input', () => {
    const theme = refs.html.className;
    refs.html.className = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('color-theme', refs.html.className);
    /* changeHeroBackground(); */
  });
})();

/* function changeStyles(bgStyles, newBg) {
  const styles = [...bgStyles];
  styles[0] = `url(${newBg})`;
  styles[1] &&= styles[1].replaceAll('"', '');
  return styles.join(',');
}

function changeHeroBackground() {
  if (!root || !hero) return;
  const bgStyle = hero.style.backgroundImage;
  const stylesArr = bgStyle.split(',');
  if (window.matchMedia('(min-width: 1280px)').matches) {
    const bgDecorator = root.classList.contains('light') ? SubstructWhiteDesk : SubstructBlackDesk;
    hero.style.backgroundImage = changeStyles(stylesArr, bgDecorator);
  } else if (window.matchMedia('(min-width: 768px)').matches) {
    const bgDecorator = root.classList.contains('light') ? SubstructWhiteTab : SubstructBlackTab;
    hero.style.backgroundImage = changeStyles(stylesArr, bgDecorator);
  }
} */