import View from "./view";
import icons from 'url:../../img/icons.svg';


class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = Number(btn.dataset.goto);
      handler(goToPage);
    })
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
    let page;

    // Page 1, and there are some other pages
    if (curPage === 1 && numPages > 1) {
      page = curPage + 1;
      return this._generateMarkupButton(page, 'right');
    }
    // Last page
    if (numPages === curPage && numPages > 1) {
      page = curPage - 1
      return this._generateMarkupButton(page, 'left');
    }
    // Other page
    if (curPage < numPages) {
      return `
      ${this._generateMarkupButton((page = curPage + 1), 'right')}
      ${this._generateMarkupButton((page = curPage - 1), 'left')}
      `;
    }

    // Page 1, and there are NO other pages
    return ''
  }

  _generateMarkupButton(page, arrowDirection) {
    const direction = arrowDirection === 'right' ? 'next' : 'prev';
    return `
        <button data-goto="${page}" class="btn--inline pagination__btn--${direction}">
          <span>Page ${page}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-${arrowDirection}"></use>
          </svg>
        </button>
      `;
  }
}

export default new PaginationView();