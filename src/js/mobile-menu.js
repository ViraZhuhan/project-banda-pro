import getRefs from './components/get-refs';

const refs = getRefs();

export default (() => {
    const toggleMenu = () => {
    const isMenuOpen =
      refs.headerContainer.getAttribute('aria-expanded') === 'true' || false;
    refs.headerContainer.setAttribute('aria-expanded', !isMenuOpen);
    refs.mobileMenu.setAttribute('aria-hidden', isMenuOpen);
    refs.headerContainer.classList.toggle('opened');
    refs.mobileMenu.classList.toggle('is-hidden');
    refs.body.classList.toggle('scroll-block');
};

  const hideOnClickOutside = e => e.target === e.currentTarget && toggleMenu();

  refs.openMenuBtn.addEventListener('click', toggleMenu);
  /* closeMenuBtn.addEventListener('click', toggleMenu); */
  refs.linkButton.forEach(button =>
    button.addEventListener('click', toggleMenu)
  );
  refs.mobileMenu.addEventListener('click', hideOnClickOutside);

  // Close the mobile menu on wider screens if the device orientation changes
  window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
    if (!e.matches) return;
    refs.mobileMenu.classList.add('is-hidden');
    refs.headerContainer.setAttribute('aria-expanded', false);
    refs.headerContainer.classList.remove('opened');
    refs.body.classList.remove('scroll-block');
  
  });
})();
