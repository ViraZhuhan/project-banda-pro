import Pagination from 'tui-pagination';
import Api from './api';
import { Api_widely } from './widelySearch_slave';
import { createGallery } from './render-card';

const container = document.getElementById('tui-pagination-container');
const options = {
  totalItems: 40,
  itemsPerPage: 20,
  visiblePages: 10,
  page: 1,
  centerAlign: true,
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
    moreButton: `<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">...</a>`,
  },
};

const api = new Api();
const api_widely = new Api_widely();
const pagination = new Pagination(container, options);

// onLoadPage
async function pagiIni() {
  try {
    const response = await api.weekTrends();
    createGallery(response.results);
    pagination.reset(response.total_results);
  } catch (error) {
    console.error('Error initializing pagination:', error);
  }
}
pagiIni();
let isDefaultRender = true;

// onBefore-week
pagination.on('beforeMove', async function (eventData) {
  const currentPage = eventData.page;

  if (isDefaultRender) {
    try {
      api.setPage(currentPage);
      const response = await api.weekTrends();
      createGallery(response.results);
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  } else {
    try {
      const response = await api_widely.paginateByPage(currentPage);
      createGallery(response.results);
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  }
});

// onSubmit
// const submBtn = document.querySelector('.search-button');
// submBtn.addEventListener('click', pagiSubmit);
let queryStr;

export async function pagiSubmit(value) {
  queryStr = value;
  if (value !== '') {
    isDefaultRender = false;
    try {
      const response = await api_widely.searhByNameYearCountry({
        query: queryStr,
        page: 1,
      });
      createGallery(response.results);
      pagination.reset(response.total_results);
    } catch (error) {
      console.error('Error initializing pagination:', error);
    }
  }
}
