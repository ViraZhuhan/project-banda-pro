var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},t={},n=e.parcelRequirec0f3;null==n&&((n=function(e){if(e in r)return r[e].exports;if(e in t){var n=t[e];delete t[e];var o={id:e,exports:{}};return r[e]=o,n.call(o.exports,o,o.exports),o.exports}var l=new Error("Cannot find module '"+e+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(e,r){t[e]=r},e.parcelRequirec0f3=n),n("bUb57"),n("8FnLx"),n("2ukBh");const o=document.querySelector(".library-cards__list"),l=document.querySelector(".alert__message");o.addEventListener("click",(function(e){let r=e.target.closest(".gallery__item ").id;modalMovie(r)})),window.addEventListener("load",(function(){const e=JSON.parse(localStorage.getItem("LibraryMovie"));null===e||0===e.length?l.classList.remove("hidden"):e&&createGallery(e)}));
//# sourceMappingURL=library.6c1eb93c.js.map
