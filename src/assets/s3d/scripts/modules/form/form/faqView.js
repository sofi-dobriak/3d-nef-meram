import get from 'lodash';
import s3d2_Accordion from '../../templates/flatPage/villa/faq/s3d2_villaFaq';
import s3d2_renderFaqCard from '../../templates/flatPage/villa/faq/s3d2_villaFaqCard';

export default class FaqView {
  constructor(props) {
    this._id = `faq-popup-${(Math.random() * 1000).toFixed(0)}`;
    this.modalManager = props.modalManager;
    this.inited = false;
    this.config = props.config;
    this.i18n = props.i18n;
    this.faqs = props.faqs || [];
    this.init();
  }

  init() {
    if (!this.inited) {
      document.body.insertAdjacentHTML('beforeend', this.getTemplate());

      this.initAccordion();

      window.addEventListener('click', evt => {
        if (evt.target.closest('[data-open-faq]')) this.open();
        if (
          evt.target.closest('[data-form-layout-close]') ||
          evt.target.classList.contains('form-layout')
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

  initAccordion() {
    const containerSelector = `#${this._id} .s3d2-villa__faq-list`;

    // Даємо 100мс на рендер, перш ніж вішати івенти акордеона
    setTimeout(() => {
      const el = document.querySelector(containerSelector);
      if (el) {
        new s3d2_Accordion(containerSelector, { singleOpen: true });
        console.log('Accordion initialized on:', containerSelector);
      } else {
        console.error('Accordion container not found!');
      }
    }, 100);
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
    const faqs = this.config?.flat?.faq_questions || [];
    const lang = this.i18n.language || 'en';

    const faqListHtml =
      faqs.length > 0
        ? `<div class="s3d2-villa__faq-list">
          ${faqs
            .map(el => {
              const questionText = el.question[lang] || el.question['en'] || '';
              const answerText = el.answer[lang] || el.answer['en'] || '';

              return s3d2_renderFaqCard(questionText, answerText);
            })
            .join('')}
        </div>`
        : `<p>No questions found</p>`;

    return `
      <div class="form-layout faq-popup-layout" id="${this._id}">
        <div class="form form--popup faq-container">
          <svg width="24" class="form-layout-close" data-form-layout-close height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.00008 7.29297L8.35363 7.64652L12.5001 11.793L16.6465 7.64652L17.0001 7.29297L17.7072 8.00008L17.3536 8.35363L13.2072 12.5001L17.3536 16.6465L17.7072 17.0001L17.0001 17.7072L16.6465 17.3536L12.5001 13.2072L8.35363 17.3536L8.00008 17.7072L7.29297 17.0001L7.64652 16.6465L11.793 12.5001L7.64652 8.35363L7.29297 8.00008L8.00008 7.29297Z" fill="#1A1E21"></path>
          </svg>

          <div class="s3d2-villa__floor">
            <div class="s3d2-villa__floor__title-wrap">
                <div class="s3d2-villa__floor__title-wrap__line"></div>
                <h2 class="s3d2-villa__floor__title">${this.i18n.t('Flat.brands_list_title')}</h2>
                <div class="s3d2-villa__floor__title-wrap__line"></div>
            </div>
            <div class="faq-content-scroll">
                ${faqListHtml}
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
