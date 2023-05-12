import Api from './api';
// import { createWeekTrends } from './createTrends.js';
import { createGallery } from './render-card';
import { pagination } from './pagination';

const api = new Api();

// Установка обработчика события при смене страницы
pagination.on('beforeMove', async function (eventData) {
  const currentPage = eventData.page;
  try {
    api.setPage(currentPage);
    const response = await api.weekTrends({ itemsPerPage: 10 });
    const films = response.results.slice(0, 10);
    createGallery(films);
  } catch (error) {
    console.error('Error fetching movie data:', error);
  }
});

// Установка обработчика события при смене страницы поиска
pagination.on('beforeSearchMove', async function (eventData) {
  const currentSearchPage = eventData.page;
  try {
    api.setSearchPage(currentSearchPage);
    const response = await api.searchMovieByQuery(api.getSearchQuery(), {
      itemsPerPage: 10,
    });
    const films = response.results.slice(0, 10);
    createGallery(films);
  } catch (error) {
    console.error('Error fetching search results:', error);
  }
});

// Инициализация пагинации при загрузке страницы
async function initializePagination() {
  try {
    const response = await api.weekTrends({ itemsPerPage: 10 });
    const totalItems = response.total_results;
    pagination.reset(totalItems);
  } catch (error) {
    console.error('Error initializing pagination:', error);
  }
}

initializePagination();

// Обновление галереи при поиске фильмов
async function updateGalleryBySearch(query) {
  try {
    api.setSearchQuery(query);
    api.resetSearchPage();
    const response = await api.searchMovieByQuery(query, { itemsPerPage: 10 });
    const films = response.results.slice(0, 10);
    createGallery(films);
    pagination.resetSearch(response.total_results);
  } catch (error) {
    console.error('Error updating gallery by search:', error);
  }
}

export { updateGalleryBySearch };
