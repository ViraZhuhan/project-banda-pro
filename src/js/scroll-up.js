import getRefs from './components/get-refs';

const refs = getRefs();

// Add a scroll event listener to the window object
window.addEventListener('scroll', function () {
  // If the user has scrolled down more than 20 pixels, show the button
  if (window.scrollY > 20) {
    refs.scrollUpBtn.style.display = 'block';
  } else {
    // Otherwise, hide the button
    refs.scrollUpBtn.style.display = 'none';
  }
});
// Add a click event listener to the button
refs.scrollUpBtn.addEventListener('click', function () {
  // Scroll the page to the top with smooth animation
  const galleryElement = document.querySelector('.gallery-catalog').firstElementChild;
  if (galleryElement) {
     window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
  }
 
});
