import { IMAGE_URL } from '../config.js';

class TopRatedView {
  constructor() {
    this.parentElement = document.querySelector('.top-rated-movies__list');
    this.sliderNav = document.querySelector('.slider-nav');
    this.sliderNext = document.querySelector('.top-rated-nav.next');
    this.sliderPrevious = document.querySelector('.top-rated-nav.prev');
    this.parentElementMovie = document.querySelector('.details-box');
    this.parentElementBookmarks = document.querySelector('.bookmarks__list');
  }

  listsRender(handler) {
    window.addEventListener('load', handler);
  }
  renderSpinner() {
    const markup = `
       <div class="spinner">
         <i class="fas fa-spinner fa-spin"></i>
        </div> 
  `;
    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  render(dataIn, slideIndex, slidesPerPage) {
    this.clear();
    if (!dataIn || (Array.isArray(dataIn) && dataIn.length === 0))
      return this.renderError();
    let resultArr = [];
    let inc = slideIndex - 1;
    for (let i = inc; i < slidesPerPage + inc && i < dataIn.length; i++) {
      let markup = this.generateMarkup(dataIn[i]);
      resultArr.push(markup);
    }

    const markup = resultArr.join('');

    this.parentElement.insertAdjacentHTML('beforeend', markup);
  }
  clear() {
    this.parentElement.innerHTML = '';
  }

  addHandlerSlider(handler) {
    let n = 1;
    let m = -1;
    this.sliderNext.addEventListener('click', function (e) {
      const btn = e.target.closest('.fa-arrow-circle-right');
      if (!btn) return;
      handler(n);
    });
    this.sliderPrevious.addEventListener('click', function (e) {
      const btn = e.target.closest('.fa-arrow-circle-left');
      if (!btn) return;
      handler(m);
    });
  }
  addHandlerSingleMovie(handler) {
    this.parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn');
      if (!btn) return;
      const id = btn.dataset.movieId;
      handler(id);
    });
  }

  generateMarkup(result) {
    return `<li class="single-movie slider-list">
          <div class="image-container"><img src="${
            IMAGE_URL + result.posterPath
          }" alt="${result.title}" >
          </div>
          <div class="movie-details">
            <div class="title-container">
              <h2>Title: ${result.title}</h2>
            </div>
            <div class="release-date">
              <p>Vote average: ${result.voteAverage}</p>
            </div>            
            <div class="btn-container"><a href="#${
              result.id
            }" class="btn details"  data-movie-id="${
      result.id
    }">More details</a></div>
          </div>
        </li> `;
  }

  renderError() {
    const markup = `
      <div class="error">
        <div>
          <i class="fas fa-exclamation-triangle"></i>
        </div>
        <p>There is some error. please try again</p>
      </div>`;
    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}

export default new TopRatedView();
