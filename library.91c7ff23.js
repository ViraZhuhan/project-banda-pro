!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},t={},l=e.parcelRequirec0f3;null==l&&((l=function(e){if(e in r)return r[e].exports;if(e in t){var l=t[e];delete t[e];var o={id:e,exports:{}};return r[e]=o,l.call(o.exports,o,o.exports),o.exports}var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(e,r){t[e]=r},e.parcelRequirec0f3=l),l("i8Q71"),l("cs7FV"),l("7jbwn"),l("f6Iod");var o=l("f6Iod"),n=l("cwHAv"),i=(o=l("f6Iod"),document.querySelector(".library-cards__list")),a=document.querySelector(".alert__message"),d=document.querySelector(".library-cards");i.addEventListener("click",(function(e){if(null===e.target.closest(".gallery__item "))return;var r=e.target.closest(".gallery__item ").id;(0,o.modalMovie)(r)})),window.addEventListener("load",(function(){var e=JSON.parse(localStorage.getItem("LibraryMovie"));null===e||0===e.length?(a.classList.remove("hidden"),d.classList.toggle("hidden")):e&&(0,n.createGallery)(e)})),l("aZhHc")}();
//# sourceMappingURL=library.91c7ff23.js.map
