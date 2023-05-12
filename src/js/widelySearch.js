import {
  genresStore,
  searchData,
  Api_widely,
  languagesStore,
  countriesStore,
} from './widelySearch_slave';
import { startSpinner, stopSpinner } from './loader';

const form = document.querySelector('.filmFormWide');
// export const Api_widely_form = new Api_widely();

window.addEventListener('click', hideDropdownMenu);
form.addEventListener('submit', onSubmit);
form.addEventListener('click', selectDropdownVariant);

form.query.addEventListener('change', e => {
  console.log('Film input: ', e.target.value);
});

form.year.addEventListener('input', e => {
  const nowYear = new Date().getFullYear();
  const years = Array(100)
    .fill(nowYear)
    .map((item, index) => Number(item) - index);

  showDropdownMenu(e.target);
  fillDropdownMenu(
    e.target,
    years
      .map(item => String(item))
      .filter(item => item.includes(e.target.value))
  );
});

form.genre.addEventListener('input', e => {
  const tmp = findGenreId(e.target.value);
  if (tmp) {
    console.log('genre |', tmp);
  }

  showDropdownMenu(e.target);
  fillDropdownMenu(
    e.target,
    searchGenreVariants(e.target.value).map(i => i.name)
  );
});

form.country.addEventListener('input', async e => {
  if (e.target.value) {
    try {
      const res = await getAssistentCountries(e.target.value);
      if (res.status) {
        throw new Error(`Error! status: ${res.status}`);
      }
      const country = res.map(item => item.name.common);
      // console.log('Country | ', country);
      showDropdownMenu(e.target);
      fillDropdownMenu(e.target, country);
    } catch (err) {
      console.error(err.message);
    }
  }
});

// SUBMIT
async function onSubmit(e) {
  e.preventDefault();
  const { query, year, genre, country } = e.currentTarget.elements;
  const { code, CODE } = await getCodeLang_CodeCountry(country.value);

  toWideForm();
  Api_widely_form.genreId = findGenreId(genre.value);

  Api_widely_form.requestString = null;
  Api_widely_form.response = null;

  startSpinner();
  Api_widely_form.response = searchData.response = await getDataFromDB(
    query.value,
    year.value,
    code,
    CODE,
    1
  );
  stopSpinner();

  console.log(Api_widely_form.response);
  console.log(Api_widely_form.requestString);
}

export function toWideForm() {
  form.classList.remove('before-submit');
  form
    .querySelectorAll('.after-submit')
    .forEach(item => item.classList.remove('before-submit'));
  form
    .querySelectorAll('.visual-on')
    .forEach(item => item.classList.remove('visual-off'));
}

export function toSlimForm() {
  form.classList.add('before-submit');
  form
    .querySelectorAll('.after-submit')
    .forEach(item => item.classList.add('before-submit'));
  form
    .querySelectorAll('.visual-on')
    .forEach(item => item.classList.add('visual-off'));
}

const formFilmStorage = {};
function getAllGenres() {
  const a = new Api();
  a.getGenres()
    .then(res => {
      formFilmStorage.genres = res.genres;
      // console.log(formFilmStorage.genres);
    })
    .finally(() => {});
}
function getAllCountries() {
  const a = new Api();
  a.getCountries()
    .then(res => {
      formFilmStorage.countries = res;
      console.log(formFilmStorage.countries);
    })
    .finally(() => {});
}

function findCountryCode(country) {
  const codes = Object.keys(countriesStore);
  for (const code of codes) {
    if (countriesStore[code] === country) return code;
  }
}

function findObjFirstValue(obj) {
  const keys = Object.keys(obj);
  return obj[keys[0]];
}

function findLanguageCode(language) {
  return languagesStore.find(
    item => item.english_name.toLowerCase() === language.toLowerCase()
  ).iso_639_1;
}

function findGenreId(genre) {
  const result = genresStore.find(
    item => item.name.toLowerCase() === genre.toLowerCase()
  );
  if (result) return result.id;
}

async function getCodeLang_CodeCountry(country) {
  if (country) {
    const str = `https://restcountries.com/v3.1/name/${country}?fields=name,languages`;
    const res = await fetch(str);
    const obj = await res.json();

    if (obj[0]) {
      return {
        code: findLanguageCode(findObjFirstValue(obj[0].languages)),
        CODE: findCountryCode(obj[0].name.common),
      };
    } else {
      return {
        code: null,
        CODE: null,
      };
    }
  } else
    return {
      code: null,
      CODE: null,
    };
}

async function getAssistentCountries(tryWriteCountry) {
  const str = `https://restcountries.com/v3.1/name/${tryWriteCountry}?fields=name`;
  const res = await fetch(str);
  return res.json();
}

function filterByGenre(array, genreId) {
  if (array.length !== 0) {
    return array.filter(item => item.genre_ids.includes(genreId));
  }
}

async function getDataFromDB(query, year, code, CODE, page) {
  try {
    const response = await Api_widely_form.searhByNameYearCountry({
      query: query || null,
      year: year || null,
      language: code && CODE && `${code}-${CODE}`,
      page: page,
    });
    if (response.status) {
      throw new Error(`Error! status: ${response.status}`);
    }
    return await response;
  } catch (err) {
    console.log(err.message);
  }
}

async function createFirstGalleryPart(res, genreId) {
  const { query, year, genre, code, CODE } = searchData;
  const { page, results, total_pages, total_results } = res;
  let currentPage = page;

  const firstGalleryPart = [];
  firstGalleryPart.push(...filterByGenre(results, genreId));

  do {
    if (firstGalleryPart.length < 10) {
      currentPage++;
      const additionResponse = await getDataFromDB(
        query,
        year,
        code,
        CODE,
        currentPage
      );

      const hasValidGenre = filterByGenre(additionResponse.results, genreId);
      console.log('hasValidGenre', hasValidGenre.length);
      // await new Promise(r => setTimeout(r, 1000));
      // firstGalleryPart.push(...hasValidGenre);
    }
  } while (currentPage !== total_pages);

  console.log(firstGalleryPart);
}

function searchGenreVariants(inputValue) {
  return genresStore.filter(item =>
    item.name.toLowerCase().includes(inputValue.toLowerCase())
  );
}

// dropdown menu

function hideDropdownMenu() {
  const dropdownMenu = document.querySelector('.isVisible');
  if (dropdownMenu && dropdownMenu.classList.contains('isVisible')) {
    setTimeout(() => {
      dropdownMenu.classList.remove('isVisible');
    }, 0);
  }
}

function showDropdownMenu(menuRef_input) {
  const menuRef_div = menuRef_input.parentNode;
  menuRef_div.querySelector('ul').classList.add('isVisible');
}

function fillDropdownMenu(menuRef_input, arrayForLi) {
  const menuRef_div = menuRef_input.parentNode;
  const dropdownMenuCeils = menuRef_div.querySelectorAll('li');

  // наполнение текстом разметки
  for (let i = 0; i < arrayForLi.length; i++) {
    if (dropdownMenuCeils.length > i) {
      dropdownMenuCeils[i].textContent = arrayForLi[i];
      dropdownMenuCeils[i].style.display = 'flex';
    }
  }
  // скрытие пустых ячеек
  if (dropdownMenuCeils.length > arrayForLi.length) {
    for (let i = 0; i < dropdownMenuCeils.length; i++) {
      if (i + 1 > arrayForLi.length) {
        dropdownMenuCeils[i].style.display = 'none';
      }
    }
  }
}

function selectDropdownVariant(e) {
  if (e.target.tagName === 'LI') {
    const div = e.target.parentNode.parentNode;
    div.querySelector('input').value = e.target.textContent;
  }
}
