// set color theme before page load to prevent flickering
const html = document.documentElement;
const savedTheme = localStorage.getItem('color-theme');
if (savedTheme) html.className = savedTheme;
