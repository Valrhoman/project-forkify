import View from './View';
import icons from 'url:../../img/icons.svg'; // Parcel 2 for any statuc assets that are not programming files

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }
  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButton('next');
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButton('prev');
    }

    // Other page
    if (curPage < numPages) {
      return `${
        this._generateMarkupButton('prev') + this._generateMarkupButton('next')
      }`;
    }

    // Page 1, and there are NO other pages
    return '';
  }

  _generateMarkupButton(type) {
    const curPage = this._data.page;
    const goTo = type === 'next' ? curPage + 1 : curPage - 1;
    return `
      <button data-goTo="${goTo}" class="btn--inline pagination__btn--${type}">
          ${
            type === 'next'
              ? `
            <span>Page ${goTo}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
            `
              : `
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${goTo}</span>
              `
          }
      </button>
      `;
  }
}

export default new PaginationView();
