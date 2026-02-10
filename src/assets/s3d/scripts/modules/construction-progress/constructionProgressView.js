import Swiper from 'swiper';

export default class constructionProgressView {
  constructor(props) {
    this._id = `progress-popup-${(Math.random() * 1000).toFixed(0)}`;
    this.modalManager = props.modalManager;
    this.inited = false;
    this.config = props.config;
    this.i18n = props.i18n;
    this.init();
  }

  init() {
    console.log('progress this.config: ', this.config);
    if (!this.inited) {
      document.body.insertAdjacentHTML('beforeend', this.getTemplate());

      this.initSwiper();

      window.addEventListener('click', evt => {
        if (evt.target.closest('[data-open-progress]')) this.open();
        if (
          evt.target.closest('[data-progress-layout-close]') ||
          evt.target.classList.contains('progress-layout')
        ) {
          this.close();
        }
      });

      if (this.modalManager.push) {
        this.modalManager.push({ id: this._id, close: () => this.close() });
      }
      this.inited = true;
    }
  }

  initSwiper() {
    const swiperEl = document.querySelector(`#${this._id} .swiper`);
    if (swiperEl) {
      this.swiper = new Swiper(swiperEl, {
        slidesPerView: 1,
        spaceBetween: 20,
      });
    }
  }

  close() {
    const el = document.querySelector(`#${this._id}`);
    if (el) {
      el.style.visibility = '';
      el.style.opacity = '';
    }
  }

  open() {
    const el = document.querySelector(`#${this._id}`);
    if (el) {
      el.style.visibility = 'visible';
      el.style.opacity = '1';
      if (this.modalManager.open) this.modalManager.open(this._id);
    }
  }

  getTemplate() {
    const progress = this.config?.flat?.progress_photos || [];
    const lang = this.i18n.language || 'en';

    const progressHTML =
      progress.length > 0
        ? `<div class="swiper">
          <div class="swiper-wrapper">
            ${progress
              .map(el => {
                const image = el.img || '';
                const link = el.link || '';

                return `
                <div class="swiper-slide">
                  <div class="progress-popup-slide">
                    <a href="${link}" target="_blank" class="progress-popup-link" aria-label="Construction progress">
                      ${
                        image
                          ? `<img src="${image}" alt="Construction progress" class="progress-popup-image"/>`
                          : 'Link'
                      }
                    </a>
                  </div>
                </div>`;
              })
              .join('')}
          </div>
        </div>`
        : ``;

    return `
      <div class="progress-layout progress-popup-layout" id="${this._id}">
        <div class="progress progress--popup progress-container">
          <svg width="24" class="progress-layout-close" data-progress-layout-close height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.00008 7.29297L8.35363 7.64652L12.5001 11.793L16.6465 7.64652L17.0001 7.29297L17.7072 8.00008L17.3536 8.35363L13.2072 12.5001L17.3536 16.6465L17.7072 17.0001L17.0001 17.7072L16.6465 17.3536L12.5001 13.2072L8.35363 17.3536L8.00008 17.7072L7.29297 17.0001L7.64652 16.6465L11.793 12.5001L7.64652 8.35363L7.29297 8.00008L8.00008 7.29297Z" fill="#1A1E21"></path>
          </svg>

          <div class="s3d2-villa__floor">
            <div class="s3d2-villa__floor__title-wrap">
                <div class="s3d2-villa__floor__title-wrap__line"></div>
                <h2 class="s3d2-villa__floor__title">${this.i18n.t('Flat.construction_title')}</h2>
                <div class="s3d2-villa__floor__title-wrap__line"></div>
            </div>
            <div class="progress-content">
                ${progressHTML}
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
