import get from 'lodash/get';
import ButtonWithoutIcon from '../../../../../../../s3d2/scripts/templates/common/ButtonWithoutIcon';
import ButtonIconLeft from '../../../../../../../s3d2/scripts/templates/common/ButtonIconLeft';
import { $highlightSvgElements } from '../../../controller/$highlightSvgElements';
import { numberWithCommas } from '../../../../../../../s3d2/scripts/helpers/helpers_s3d2';
export default function s3d2ApartmentPlanings(i18n, flat) {
  const firstLevelPhoto = flat.flat_levels_photo[1].without;

  const $floorButtons = () => {
    //прибрати flat.level = 2
    if (flat.level < 2) {
      return '';
    }
    const $buttons = [];
    for (let i = 1; i <= +flat.level; i++) {
      const buttonClass = i === 1 ? 'active' : '';
      if (!get(flat, `flat_levels_photo.${i}`)) {
        $buttons.push(' ');
        continue;
      }
      $buttons.push(
        ButtonWithoutIcon(
          `${buttonClass}`,
          `data-flat-explication-button="floor" data-value="${i}"`,
          i18n.t(`Flat.explication_data.floor_${i}`),
        ),
      );
    }
    const $buttonsFinal = $buttons.filter(el => el && el.length > 2);
    return $buttons.filter(el => el && el.length > 2).length > 1 ? $buttonsFinal.join('') : '';
  };
  const hasFlat2dAnd3dPlansOnLevel =
    flat.level !== 1 && Object.keys(get(flat, 'flat_levels_photo.1', {})).length > 1;
  return `
      <div class="s3d2-apartment__flat-explication-screen-wrap">
        <div class="s3d2-apartment__flat-explication-screen">
            <div class="s3d2-apartment__flat-explication-screen-slider swiper-container">
                <div class="s3d2-apartment__flat-explication-screen-buttons--floor-wrap">
                  ${
                    flat.level > 1
                      ? `<div class="s3d2-apartment__flat-explication-screen-buttons--floor">${$floorButtons()}</div>`
                      : ''
                  }

                  ${
                    flat.level > 1 && hasFlat2dAnd3dPlansOnLevel
                      ? `<div class="s3d2-apartment__flat-explication-screen-buttons--divider">/</div>`
                      : ''
                  }


                    ${
                      hasFlat2dAnd3dPlansOnLevel
                        ? `
                      <div class="s3d2-apartment__flat-explication-screen-buttons--slider">
                        <div class="s3d2-apartment__flat-explication-screen-buttons--planning3d">
                          ${
                            hasFlat2dAnd3dPlansOnLevel
                              ? ButtonWithoutIcon(
                                  '',
                                  'data-flat-explication-button="type"  data-value="2d"',
                                  i18n.t(`Flat.buttons.planning3d`),
                                )
                              : ''
                          }
                          ${
                            hasFlat2dAnd3dPlansOnLevel
                              ? ButtonWithoutIcon(
                                  'active',
                                  'data-flat-explication-button="type" data-value="3d"',
                                  i18n.t(`Flat.buttons.planning2d`),
                                )
                              : ''
                          }
                        </div>
                      </div>
                      `
                        : ''
                    }


                      <!-- <div class="s3d2-apartment__flat-explication-screen-buttons--furnished">

                        ${$highlightSvgElements(
                          i18n,
                          `data-flat-explication-furnished`,
                          'flat-explication-furnished',
                          i18n.t(`Flat.buttons.furnished`),
                        )}
                      </div> -->


                </div>


                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <div class="s3d2-apartment__flat-explication-screen-slide">
                            <img src="${firstLevelPhoto}" data-flat-explication-image />
                        </div>
                    </div>
                </div>

            </div>

            <div class="s3d2-apartment__flat-explication-screen-table">
              <!--<span class="s3d2-apartment__flat-explication-screen-title">Layout</span>-->
              <div class="s3d2-apartment__flat-explication-screen-table-inner">
                <div class="s3d2-apartment__flat-explication-screen-table-content">
                  <!--<div class="s3d2-apartment__flat-explication-screen-table__title" data-flat-explication-title> Floor </div>-->
                  <div class="s3d2-apartment__flat-explication-screen-info ">
                      <div class="s3d2-apartment__flat-explication-screen-info-row  ">
                          <div class="s3d2-apartment__flat-explication-screen-info-row-title">
                              ${i18n.t('Flat.information.allArea')}:
                          </div>
                          <div class="s3d2-apartment__flat-explication-screen-info-row-blank">
                          </div>

                          <div class="s3d2-apartment__flat-explication-screen-info-row-value">
                              ${numberWithCommas(flat.area)} ${i18n.t('area_unit')}
                          </div>
                      </div>
                      ${
                        flat.life_room
                          ? ` <div class="s3d2-apartment__flat-explication-screen-info-row  ">
                          <div class="s3d2-apartment__flat-explication-screen-info-row-title">
                              ${i18n.t('Flat.information.life_area')}:
                          </div>
                          <div class="s3d2-apartment__flat-explication-screen-info-row-blank">
                          </div>
                          <div class="s3d2-apartment__flat-explication-screen-info-row-value">
                              ${numberWithCommas(flat.life_room)} ${i18n.t('area_unit')}
                          </div>
                      </div>`
                          : ``
                      }
                      ${
                        flat.exterior_area
                          ? `    <div class="s3d2-apartment__flat-explication-screen-info-row  ">
                          <div class="s3d2-apartment__flat-explication-screen-info-row-title">
                              ${i18n.t('Flat.information.exterior_area')}:
                          </div>
                          <div class="s3d2-apartment__flat-explication-screen-info-row-blank">
                          </div>
                          <div class="s3d2-apartment__flat-explication-screen-info-row-value">
                              ${numberWithCommas(flat.exterior_area)} ${i18n.t('area_unit')}
                          </div>
                      </div>`
                          : ``
                      }
                  </div>
                  <div class="s3d2-apartment__flat-explication-screen-info" data-villa-explication-floor-properties-container>
                    <div class="s3d2-apartment__flat-explication-screen-info-row">
                        <div class="s3d2-apartment__flat-explication-screen-info-row-title">Living area:</div>
                        <div class="s3d2-apartment__flat-explication-screen-info-row-blank">
                        </div>
                        <div class="s3d2-apartment__flat-explication-screen-info-row-value">
                            ${flat.life_room} ${i18n.t('area_unit')}
                        </div>
                    </div>
                  </div>
                </div>



              </div>
              <button class="s3d2-ButtonIconLeft active s3d2-ButtonIconLeft--secondary text-uppercase-important s3d2-apartment__flat-explication-screen-open text-uppercase-important js-s3d__create-pdf" data-flat-explication-button>
                <span>${i18n.t('Flat.explication_data.open_full_plan')}</span>
              </button>
              <div class="s3d2-apartment__flat-explication-screen-socials-wrap">
                <button data-s3d-share class="s3d2-apartment__flat-explication-screen-socials-share">
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M11.293 1L8.5 1L8.5 -3.71547e-07L13 -5.68248e-07L13 4.5L12 4.5L12 1.70703L5.52051 8.18652L4.81348 7.47949L11.293 1ZM-4.00701e-07 3.83301C8.58134e-05 3.3469 0.193369 2.88085 0.537109 2.53711C0.880849 2.19337 1.34689 2.00009 1.83301 2L5.83301 2L5.83301 3L1.83301 3C1.61211 3.00009 1.40034 3.08794 1.24414 3.24414C1.08794 3.40034 1.00009 3.61211 1 3.83301L1 11.167C1.00009 11.3879 1.08794 11.5997 1.24414 11.7559C1.40034 11.9121 1.61211 11.9999 1.83301 12L9.16699 12C9.38789 11.9999 9.59966 11.9121 9.75586 11.7559C9.91206 11.5997 9.99991 11.3879 10 11.167L10 7.16699L11 7.16699L11 11.167C10.9999 11.6531 10.8066 12.1192 10.4629 12.4629C10.1192 12.8066 9.65311 12.9999 9.16699 13L1.83301 13C1.34689 12.9999 0.880849 12.8066 0.537109 12.4629C0.193369 12.1192 8.60293e-05 11.6531 -8.01233e-08 11.167L-4.00701e-07 3.83301Z" fill="none"/>
                  </svg>
                  <span>${i18n.t('Flat.share')}</span>
                </button>
                <div class="s3d2-apartment__flat-explication-screen-socials">
                  <a class="s3d2-apartment__flat-explication-screen-socials-item" href="https://www.facebook.com/Nefstyle/" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M10.1143 12.9492L10.1143 21L13.3193 21L13.3193 12.9502L15.8281 12.9502L16.2266 9.75098L13.3184 9.75098L13.3184 7.54688C13.3191 6.62223 13.5684 5.98843 14.8564 5.98828L16.5 5.98828L16.5 3.12695C16.2165 3.08796 15.2417 3.00001 14.1064 3C11.7374 3 10.1143 4.49049 10.1143 7.22949L10.1143 9.75L7.5 9.75L7.5 12.9492L10.1143 12.9492Z" fill="none"/>
                    </svg>
                  </a>
                  <a class="s3d2-apartment__flat-explication-screen-socials-item" href="https://x.com/Nef_Style" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M16.9718 4L19.5995 4L13.83 10.3653L20.5706 19L15.2809 19L11.1394 13.7528L6.39817 19L3.77048 19L9.88273 12.1919L3.42773 4L8.84878 4L12.5904 8.79336L16.9718 4ZM16.0521 17.5055L17.5088 17.5055L8.08333 5.43912L6.51813 5.43912L16.0521 17.5055Z" fill="none"/>
                    </svg>
                  </a>
                  <a class="s3d2-apartment__flat-explication-screen-socials-item" href="https://www.instagram.com/nef_style/" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M4 12.002C4 14.0861 4.00867 14.3526 4.04492 15.1777C4.08225 16.0242 4.22094 16.6205 4.42383 17.1426C4.63503 17.7006 4.96293 18.1998 5.38379 18.6152L5.61816 18.3857L5.38672 18.6191C5.80269 19.0406 6.30579 19.369 6.8584 19.5771C7.3829 19.7797 7.97613 19.9177 8.82324 19.9551C9.64849 19.9914 9.91519 20 12 20C14.0848 20 14.3515 19.9914 15.1768 19.9551C16.0237 19.9177 16.6203 19.7792 17.1426 19.5762C18.26 19.1441 19.144 18.2607 19.5762 17.1436C19.7789 16.6189 19.9177 16.0254 19.9551 15.1777C19.9913 14.3526 20 14.0861 20 12.002C20 9.91944 19.9972 9.65141 19.9609 8.8252C19.9236 7.97877 19.7859 7.3825 19.583 6.86035C19.3983 6.37217 19.1259 5.92773 18.7754 5.54492L18.6221 5.38672L18.3877 5.61719L18.6182 5.38281C18.2024 4.96184 17.6996 4.6338 17.1475 4.42578C16.6232 4.22328 16.0303 4.0862 15.1836 4.04883C14.3548 4.00949 14.0875 4 12.0029 4C9.91804 4 9.65152 4.00867 8.82617 4.04492C7.97954 4.08224 7.3834 4.2211 6.86133 4.42383C6.30414 4.63456 5.80327 4.95789 5.38672 5.38281L5.61816 5.61719L5.38281 5.3877L5.23145 5.5459C4.88307 5.92862 4.60917 6.37466 4.42676 6.8584C4.22425 7.38264 4.08622 7.97486 4.04883 8.82129C4.00948 9.64997 4 9.91776 4 12.002ZM14.9473 7.36816C14.9474 6.43799 15.7019 5.68457 16.6318 5.68457C17.5619 5.6846 18.3163 6.43797 18.3164 7.36816C18.3164 8.29829 17.562 9.05271 16.6318 9.05273C15.7018 9.05273 14.9473 8.29826 14.9473 7.36816ZM8.20996 12C8.20996 9.90782 9.90793 8.21094 12 8.21094C14.092 8.21114 15.7891 9.90794 15.7891 12C15.7891 14.0921 14.092 15.7889 12 15.7891C9.90793 15.7891 8.20996 14.0922 8.20996 12Z" fill="#1A1E21"/>
                    </svg>
                  </a>
                  <a class="s3d2-apartment__flat-explication-screen-socials-item" href="https://www.linkedin.com/company/nef-real-estate" target="_blank" rel="noopener noreferrer">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="4.5" cy="4" r="2.2" fill="#1A1E21"/>
                        <rect x="2.3" y="8.5" width="4.4" height="12" rx="0.5" fill="#1A1E21"/>
                        <path d="M10.5 8.5V20.5H15V14.5C15 13.5 15.5 12.5 17 12.5C18.5 12.5 19 13.5 19 15V20.5H23.5V13.5C23.5 10 21.5 8.5 18.5 8.5C16.5 8.5 15.5 9.5 15 10.5V8.5H10.5Z" fill="#1A1E21"/>
                      </svg>
                  </a>
                  <a class="s3d2-apartment__flat-explication-screen-socials-item" href="mailto:infosales@nef.email" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M4 16.5C4 17.3249 4.71979 17.9998 5.59961 18L18.4004 18C19.2802 17.9998 20 17.3249 20 16.5L20 7.5C20 7.38762 19.9853 7.27834 19.96 7.17285L12.4941 13.707C12.2115 13.9544 11.7896 13.9542 11.5068 13.707L4.03906 7.17285C4.01379 7.27827 4 7.38769 4 7.5L4 16.5ZM12 12.1455L18.9258 6.08496C18.7609 6.03073 18.5843 6.00004 18.4004 6L5.59961 6C5.41533 6.00004 5.23834 6.03054 5.07324 6.08496L12 12.1455Z" fill="none"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
        </div>
      </div>
    `;
}
