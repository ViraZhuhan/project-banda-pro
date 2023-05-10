export function initRatings() {
    if (refs.rating.length > 0) {
      for (let index = 0; index < refs.rating.length; index++) {
        const ratingElement = refs.rating[index];
        initRating(ratingElement);
      }
    }
  }
  
  function initRating(rating) {
    const ratingActive = rating.querySelector('.rating__active');
    const ratingValue = rating.querySelector('.rating__value');
    const ratingItems = rating.querySelectorAll('.rating__item');
  
    ratingItems.forEach(item => {
      item.addEventListener('click', () => {
        ratingValue.innerHTML = item.value;
        setRatingActiveWidth(ratingActive, ratingValue);
      });
    });
    setRatingActiveWidth(ratingActive, ratingValue);
  }
  
  function setRatingActiveWidth(ratingActive, ratingValue) {
    const ratingActiveWidth = ratingValue.innerHTML / 0.025;
    ratingActive.style.width = `${ratingActiveWidth}%`;
  }