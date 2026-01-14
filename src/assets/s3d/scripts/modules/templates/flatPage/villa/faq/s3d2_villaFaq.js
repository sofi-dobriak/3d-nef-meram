export default class s3d2_Accordion {
  constructor(selector, options = {}) {
    this.container = document.querySelector(selector);
    if (!this.container) throw new Error('Accordion container not found');
    this.singleOpen = options.singleOpen || false;
    this.init();
  }

  init() {
    this.container.addEventListener('click', this.toggleAccordion.bind(this));
  }

  toggleAccordion(event) {
    const faqCard = event.target.closest('.s3d2-villa__faq-card');
    if (!faqCard) return;

    if (event.target.closest('.s3d2-villa__faq-card__answer')) return;

    const isOpen = faqCard.hasAttribute('data-open');

    if (!isOpen && this.singleOpen) {
      this.closeAllExcept(faqCard);
    }

    isOpen ? this.closeCard(faqCard) : this.openCard(faqCard);
  }

  openCard(card) {
    card.setAttribute('data-open', 'true');
    const answer = card.querySelector('.s3d2-villa__faq-card__answer');
    if (answer) {
      answer.style.maxHeight = `${answer.scrollHeight}px`;
    }
  }

  closeCard(card) {
    card.removeAttribute('data-open');
    const answer = card.querySelector('.s3d2-villa__faq-card__answer');
    if (answer) {
      answer.style.maxHeight = null;
    }
  }

  closeAllExcept(exceptionCard) {
    const openCards = this.container.querySelectorAll('[data-faq-card][data-open]');
    openCards.forEach(card => {
      if (card !== exceptionCard) {
        this.closeCard(card);
      }
    });
  }
}
