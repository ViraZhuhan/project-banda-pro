import Api from './api';
import { createGallery } from './render-card';
// import { pagination } from './pagination';

const api = new Api();

//============================
import Pagination from 'tui-pagination';

const container = document.getElementById('tui-pagination-container');
const options = {
  totalItems: 15,
  itemsPerPage: 7,
  visiblePages: 5,
  page: 1,
  centerAlign: false,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}"></span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}"></span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">...</a>',
  },
};
export const pagination = new Pagination(container, options);
//============================

// Установка обработчика события при смене страницы трендовых фильмов
pagination.on('beforeMove', async function (eventData) {
  const currentPage = eventData.page;
  try {
    api.setPage(currentPage);
    const response = await api.weekTrends({ itemsPerPage: 10 });
    console.log(response); // пагинация срабатывает
    const films = response.results.slice(0, 10);
    createGallery(films);
  } catch (error) {
    console.error('Error fetching movie data:', error);
  }
});

// Обновление галереи при поиске фильмов
async function updateGalleryBySearch(query) {
  try {
    api.setSearchQuery(query);
    api.resetSearchPage();
    const response = await api.searchMovieByQuery(query, { itemsPerPage: 10 });
    const films = response.results.slice(0, 10);
    createGallery(films);
    pagination.reset(response.total_results);
  } catch (error) {
    console.error('Error updating gallery with search results:', error);
  }
}

// Инициализация пагинации при загрузке страницы
async function initializePagination(initializationType, query = null) {
  try {
    let response;
    let totalItems;

    if (initializationType === 'trends') {
      response = await api.weekTrends({ itemsPerPage: 10 });
      totalItems = response.total_results;
    } else if (initializationType === 'search') {
      response = await api.searchMovieByQuery(query, { itemsPerPage: 10 });
      totalItems = response.total_results;
      const films = response.results.slice(0, 10);
      createGallery(films);
    }

    pagination.reset(totalItems);
  } catch (error) {
    console.error('Error initializing pagination:', error);
  }
}

async function searchMovies(query) {
  try {
    const response = await api.searchMovieByQuery(query);
    console.log(response); // выводит результат поиска сколько нашел
    if (response.results === null || response.results.length === 0) {
      noSearchResults();
      clearGallery();
    } else if (response.results) {
      createGallery(response.results.slice(0, 10));
      initializePagination('search', query); // Передаем тип и поисковой запрос в функцию инициализации пагинации
    }
  } catch (error) {
    noFilmError();
  }
}

// Инициализация пагинации при загрузке страницы
initializePagination('trends');

export { updateGalleryBySearch };

//============================

const pagination_6 = new Pagination(container, options);

myList = document.querySelectorAll('.pagi');
// число новых

pagination_6.on('beforeMove', async function (eventData) {
  alert(eventData.page);
  pagination_6.reset(myList);
});
