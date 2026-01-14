import get from 'lodash/get';
import FormViewPage from '../../../../../../../s3d/scripts/modules/form/form/formViewApartmentPage';
import { socialMediaIcons } from '../../../../../../../s3d2/scripts/templates/common/icons/social-media-icons';

const renders = {
  v1: s3d2_renderVillaContact_v1,
  v2: s3d2_renderVillaContact_v2,
  v3: s3d2_renderVillaContact_v3,
};

export default function s32d_renderVillaContact(version = 'v1', options = {}) {
  const render = renders[version];
  if (render) return render(options);
}

export function s3d2_initializeVillaContact(containerId, i18n) {
  const container = document.getElementById(containerId);

  if (container) {
    new FormViewPage({ target: container, i18n: i18n });
  } else {
    console.error('Contact form container not found:', containerId);
  }
}

function s3d2_renderVillaContact_v1({ i18n, managerInfo = {} }) {
  const containerId = `villa-contact-form-${Math.random()
    .toFixed(5)
    .slice(2)}`;

  const lang = i18n.language;

  const $managerName = get(managerInfo, ['name', lang], '')
    ? `<div class="s3d2__contact--v1__manager__name">
        ${get(managerInfo, ['name', lang], '')}
      </div>`
    : '';

  const $managerPosition = get(managerInfo, ['position', lang], '')
    ? `<div class="s3d2__contact--v1__manager__title">
        ${get(managerInfo, ['position', lang], '')}
      </div>`
    : '';

  const $managerPhone = get(managerInfo, ['tel'], '')
    ? `<a href="tel:${get(managerInfo, ['tel'], '')}" class="s3d2__contact--v1__manager__phone">
        ${get(managerInfo, ['tel'], '')}
      </a>`
    : '';

  const $managerEmail = get(managerInfo, ['email'], '')
    ? `<a href="mailto:${get(
        managerInfo,
        ['email'],
        '',
      )}" class="s3d2__contact--v1__manager__email">
        ${get(managerInfo, ['email'], '')}
      </a>`
    : '';

  const $managerImage = get(managerInfo, ['img'])
    ? `<div class="s3d2__contact--v1__manager__image-block">
        <img class="s3d2__contact--v1__manager__image" src="${get(managerInfo, [
          'img',
        ])}" alt="Manager's portrait">
      </div>`
    : '';

  return `
    <div class="s3d2__contact--v1">
      <div class="s3d2__contact--v1__content">
        <div class="s3d2__contact--v1__content__column">
          <div class="s3d2__contact--v1__manager">
            ${$managerName}
            ${$managerPosition}
            ${$managerPhone}
            ${$managerEmail}

            <button class="s3d2__contact--v1__manager__booking-button" data-open-form="">
              <span>${i18n.t('Flat.contactUs.bookButton')}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M8.38867 4C8.11263 4.00012 7.88867 4.22393 7.88867 4.5V5.59961H6.05566C4.90723 5.59961 4 6.55377 4 7.7002V18.9004C4.00021 20.0466 4.90736 21 6.05566 21H16.9443C18.0926 21 18.9998 20.0466 19 18.9004V7.7002C19 6.55377 18.0928 5.59961 16.9443 5.59961H15.1113V4.5C15.1113 4.22393 14.8874 4.00012 14.6113 4C14.3352 4 14.1113 4.22386 14.1113 4.5V5.59961H8.88867V4.5C8.88867 4.22386 8.66481 4 8.38867 4ZM18 11.4004V18.9004C17.9998 19.5211 17.514 20 16.9443 20H6.05566C5.486 20 5.0002 19.5211 5 18.9004V11.4004H18ZM16.9443 6.59961C17.5141 6.59961 18 7.07931 18 7.7002V10.4004H5V7.7002C5 7.07931 5.48588 6.59961 6.05566 6.59961H7.88867V7.7002C7.88878 7.97618 8.11269 8.20008 8.38867 8.2002C8.66475 8.2002 8.88857 7.97625 8.88867 7.7002V6.59961H14.1113V7.7002C14.1114 7.97625 14.3353 8.2002 14.6113 8.2002C14.8873 8.20008 15.1112 7.97618 15.1113 7.7002V6.59961H16.9443Z" fill="#1A1E21"/>
              </svg>
            </button>
          </div>

          ${$managerImage}
        </div>

        <div class="s3d2__contact__content__column">
          <div class="s3d2__contact__form-container">
            <div>
              <h2 class="s3d2__contact__form-container__title">${i18n.t(
                'Flat.contactUs.form_title',
              )}</h2>
              <p class="s3d2__contact__form-container__description">${i18n.t(
                'Flat.contactUs.form_description',
              )}</p>
            </div>
            <div class="s3d2__contact__form" id="${containerId}"></div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function s3d2_renderVillaContact_v2({
  i18n,
  socialMediaLinks = {},
  contacts = {},
  project_google_map_location = '',
}) {
  const containerId = `villa-contact-form-${Math.random()
    .toFixed(5)
    .slice(2)}`;

  const lang = i18n.language;

  const $project_google_map_location = project_google_map_location
    ? `
      <iframe src="${project_google_map_location}" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> `
    : '';

  const $globalPhoneNumber = get(contacts, 'global_number')
    ? `<a href="tel:${get(
        contacts,
        'global_number',
      )}" class="s3d2__contact--v2__content__global-number__link">${get(
        contacts,
        'global_number',
      )}</a>`
    : '';

  const $email = get(contacts, 'email')
    ? `
      <div class="s3d2__contact--v2__content__email">
        <h3 class="s3d2__contact--v2__content__email__title">${i18n.t('Flat.contactUs.email')}</h3>
        <a href="mailto:${get(
          contacts,
          'email',
        )}" class="s3d2__contact--v2__content__email__link">${get(contacts, 'email')}</a>
      </div>`
    : ``;

  const $socialMediaList = Object.entries(socialMediaLinks)
    .map(([name, url]) => {
      if (!url) return '';
      return `
      <a href="${url}" class="s3d2__contact--v2__content__social-list__link" target="_blank">
          ${socialMediaIcons[name]}
      </a>
    `;
    })
    .join('');

  const $salesDepartment = get(contacts, ['sales_department', 'text', lang])
    ? `
      <div class="s3d2__contact--v2__content__sales-department">
        <h3 class="s3d2__contact--v2__content__sales-department__title">${i18n.t(
          'Flat.contactUs.departmentTitle.1',
        )}</h3>
        <a href="${get(
          contacts,
          'sales_department.google_maps_link',
        )}" target='_blank' class="s3d2__contact--v2__content__sales-department__link">
          <span>
            ${get(contacts, ['sales_department', 'text', lang], contacts.sales_department.text.en)}
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.14637 4.14637C6.34159 3.95117 6.65814 3.95125 6.85341 4.14637L9.78309 7.07605C10.0169 7.31026 10.0169 7.6895 9.78309 7.92371L6.85341 10.8534C6.65814 11.0487 6.34164 11.0487 6.14637 10.8534C5.95126 10.6581 5.95116 10.3416 6.14637 10.1464L8.79286 7.49988L6.14637 4.8534C5.95126 4.65812 5.95116 4.34158 6.14637 4.14637Z" fill="#1A1E21"/>
          </svg>
        </a>
    </div>
   `
    : '';

  const $constructionDepartment = get(contacts, ['construction_department', 'text', lang])
    ? `
      <div class="s3d2__contact--v2__content__construction-department">
          <h3 class="s3d2__contact--v2__content__construction-department__title">${i18n.t(
            'Flat.contactUs.departmentTitle.2',
          )}</h3>
          <a href="${get(
            contacts,
            'construction_department.google_maps_link',
          )}" target='_blank' class="s3d2__contact--v2__content__construction-department__link">
            <span>
              ${get(
                contacts,
                ['construction_department', 'text', lang],
                contacts.construction_department.text.en,
              )}
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M6.14637 4.14637C6.34159 3.95117 6.65814 3.95125 6.85341 4.14637L9.78309 7.07605C10.0169 7.31026 10.0169 7.6895 9.78309 7.92371L6.85341 10.8534C6.65814 11.0487 6.34164 11.0487 6.14637 10.8534C5.95126 10.6581 5.95116 10.3416 6.14637 10.1464L8.79286 7.49988L6.14637 4.8534C5.95126 4.65812 5.95116 4.34158 6.14637 4.14637Z" fill="#1A1E21"/>
            </svg>
          </a>
      </div>

    `
    : '';

  const $weekdays = get(contacts, ['working_hours', 'weekdays', lang], '');
  const $weekends = get(contacts, ['working_hours', 'weekends', lang], '');
  const $shouldDisplay = $weekdays || $weekends;

  const $workingHours = $shouldDisplay
    ? `<div class="s3d2__contact--v2__content__working-hours">
        <h3 class="s3d2__contact--v2__content__working-hours__title">${i18n.t(
          'Flat.contactUs.working_hours.title',
        )}</h3>
        <p class="s3d2__contact--v2__content__working-hours__text">${get(
          contacts,
          ['working_hours', 'weekdays', lang],
          contacts.working_hours.weekdays.en,
        )}</p>
        <p class="s3d2__contact--v2__content__working-hours__text">${get(
          contacts,
          ['working_hours', 'weekends', lang],
          contacts.working_hours.weekends.en,
        )}</p>
      </div>`
    : '';

  return `
    <div class="s3d2__contact--v2">
      <div class="s3d2__contact--v2__content">
        <div class="s3d2__contact--v2__content__column">
         <div class="s3d2__contact__iframe">
            ${$project_google_map_location}
         </div>
        </div>

        <div class="s3d2__contact--v2__content__column-container">
          <div class="s3d2__contact--v2__content__column s3d2__contact--v2__content__column--with-border">
              <div>
                <h2 class="s3d2__contact--v2__content__title">${i18n.t(
                  'Flat.contactUs.contacts_title',
                )}</h2>
                <p class="s3d2__contact--v2__content__description">${i18n.t(
                  'Flat.contactUs.contacts_description',
                )}</p>
              </div>

              <div class="s3d2__contact--v2__content__global-number">
                ${$globalPhoneNumber}
              </div>

              <div  class="s3d2__contact--v2__content__social-list">
              ${
                $socialMediaList.length > 0
                  ? `<h3 class="s3d2__contact--v2__content__social-list__title">${i18n.t(
                      'Flat.contactUs.social',
                    )}</h3>
                      <div class="s3d2__contact--v2__content__social-list__list">
                        ${$socialMediaList}
                      </div>`
                  : ``
              }
              </div>

              ${$email}
              ${$salesDepartment}
              ${$workingHours}
              ${$constructionDepartment}
          </div>

          <div class="s3d2__contact__content__column">
            <div class="s3d2__contact__form-container">
              <div>
                <h2 class="s3d2__contact__form-container__title">${i18n.t(
                  'Flat.contactUs.form_title',
                )}</h2>
                <p class="s3d2__contact__form-container__description">${i18n.t(
                  'Flat.contactUs.form_description',
                )}</p>
              </div>
              <div class="s3d2__contact__form" id="${containerId}"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function s3d2_renderVillaContact_v3({ i18n, managerInfo = {}, project_google_map_location = '' }) {
  const containerId = `villa-contact-form-${Math.random()
    .toFixed(5)
    .slice(2)}`;

  const lang = i18n.language;

  const $project_google_map_location = project_google_map_location
    ? `
      <iframe src="${project_google_map_location}" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> `
    : '';

  const $managerName = get(managerInfo, ['name', lang], '')
    ? `<div class="s3d2__contact--v3__manager__name">
        ${get(managerInfo, ['name', lang], '')}
      </div>`
    : '';

  const $managerPosition = get(managerInfo, ['position', lang], '')
    ? `<div class="s3d2__contact--v3__manager__title">
        ${get(managerInfo, ['position', lang], '')}
      </div>`
    : '';

  const $managerImage = get(managerInfo, ['img_2'])
    ? `<img class="s3d2__contact--v3__manager__image" src="${get(managerInfo, [
        'img_2',
      ])}" alt="Manager's portrait">`
    : '';

  const $managerPhone = get(managerInfo, ['tel'], '')
    ? `<a href="tel:${get(managerInfo, ['tel'], '')}" class="s3d2__contact--v3__manager__phone">
        ${get(managerInfo, ['tel'], '')}
      </a>`
    : '';

  const $managerEmail = get(managerInfo, ['email'], '')
    ? `<div class="s3d2__contact--v3__manager__email-block">
        <h3 class="s3d2__contact--v3__manager__email-block__title">${i18n.t(
          'Flat.contactUs.contactManagerEmailTitle',
        )}</h3>
        <a href="mailto:${get(
          managerInfo,
          ['email'],
          '',
        )}" class="s3d2__contact--v3__manager__email">${get(managerInfo, ['email'], '')}</a>
      </div>`
    : '';

  return `
    <div class="s3d2__contact--v3">
      <div class="s3d2__contact--v3__content">
        <div class="s3d2__contact--v3__content__column">
          <div class="s3d2__contact__iframe">
              ${$project_google_map_location}
          </div>
        </div>

        <div class="s3d2__contact--v3__content__column-container">
           <div class="s3d2__contact--v3__content__column">
             <div class="s3d2__contact--v3__manager">
                ${$managerName}
                ${$managerPosition}
                ${$managerImage}
                ${$managerPhone}
                ${$managerEmail}

                <button class="s3d2__contact--v3__manager__booking-button" data-open-form="">
                  <span>${i18n.t('Flat.contactUs.bookButton')}</span>
                </button>
              </div>
           </div>

          <div class="s3d2__contact__content__column">
            <div class="s3d2__contact__form-container">
              <div>
                <h2 class="s3d2__contact__form-container__title">${i18n.t(
                  'Flat.contactUs.form_title',
                )}</h2>
                <p class="s3d2__contact__form-container__description">${i18n.t(
                  'Flat.contactUs.form_description',
                )}</p>
              </div>
              <div class="s3d2__contact__form" id="${containerId}"></div>
            </div>
        </div>
        </div>
      </div>
    </div>
  `;
}
