import get from 'lodash/get';
import s3d2_Accordion from './villa/faq/s3d2_villaFaq';
import s3d2_renderFaqCard from './villa/faq/s3d2_villaFaqCard';

export default function $s3d2_brandsList({ i18n, flat, brands = [], faqs = [] }) {
  if (brands.length === 0 && faqs.length === 0) return '';

  const lang = i18n.language || 'en';

  const brandsMarkup =
    brands.length > 0
      ? `
      <div class="subtitle-brands-container">
        <h3 class="s3d2-villa__floor__subtitle">BRANDS INCLUDED IN YOUR HOME</h3>
        <div class="s3d2-brands-grid" id="brands-grid">
          ${brands.map(item => cardTemplate(item)).join('')}
        </div>
      </div>`
      : '';

  const processedFaqs = faqs.reduce((acc, el) => {
    const ignoreList = get(el, 'ignore', {});

    if (typeof isNeedToRenderFaq === 'function' && !isNeedToRenderFaq(ignoreList, flat)) {
      return acc;
    }

    let question = get(el, `question.${lang}`, get(el, 'question.en', ''));
    let answer = get(el, `answer.${lang}`, get(el, 'answer.en', ''));

    question = replacePlaceholders(question, flat, i18n);
    answer = replacePlaceholders(answer, flat, i18n);

    acc.push(s3d2_renderFaqCard(question, answer));
    return acc;
  }, []);

  const faqMarkup =
    processedFaqs.length > 0
      ? `
        <div class="s3d2-villa__faq-list">
          ${processedFaqs.join('')}
        </div>`
      : '';

  setTimeout(() => {
    const el = document.querySelector('.s3d2-villa__faq-list');

    if (el && !window.s3d2FlatAccordeon) {
      new s3d2_Accordion('.s3d2-villa__faq-list', { singleOpen: true });
      window.s3d2FlatAccordeon = true;
    }
  }, 0);

  return `
        <div class="s3d2-villa__floor" aria-labelledby="brands-title">
            <div class="s3d2-villa__floor__title-wrap">
                <div class="s3d2-villa__floor__title-wrap__line"></div>
                <h2 class="s3d2-villa__floor__title"> ${i18n.t('Flat.brands_list_title')}</h2>
                <p class="s3d2-villa__floor__description"> ${i18n.t(
                  'Flat.brands_list_description',
                )}</p>
                <div class="s3d2-villa__floor__title-wrap__line"></div>
            </div>


            ${brandsMarkup}
            ${faqMarkup}
        </div>
    `;
}

const cardTemplate = item => {
  const brandName = escapeHtml(get(item, 'brand', ''));
  const category = escapeHtml(get(item, 'category', get(item, ['category'], '')));
  const description = escapeHtml(get(item, 'description', get(item, ['description'], '')));
  const logoUrl = get(item, ['logoUrl'], '');

  return `
    <article class="s3d2-brand-card">
        <div class="s3d2-brand-top">
        ${
          logoUrl
            ? `<img class="s3d2-brand-logo" src="${escapeHtml(logoUrl)}" alt="${brandName}">`
            : `<span class="fonts-3d-body" aria-hidden="true">${brandName}</span>`
        }
        <h3 class="fonts-3d-body">${category}</h3>
        </div>
        <p class="s3d2-brand-desc">${description}</p>
    </article>
  `;
};

const escapeHtml = str =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

function replacePlaceholders(str, flat, i18n) {
  return str
    .replace(/\{\{(.*?)\}\}/g, (_, key) => i18n.t(key.trim()))
    .replace(/\[\[(.*?)\]\]/g, (_, key) => flat[key.trim()] || '');
}

function isNeedToRenderFaq(ignore = {}, flat) {
  let isNeedToRender = true;

  Object.entries(ignore).forEach(([key, value]) => {
    value.forEach(valueToIgnore => {
      if (flat[key] == valueToIgnore) {
        isNeedToRender = false;
      }
    });
  });

  return isNeedToRender;
}
