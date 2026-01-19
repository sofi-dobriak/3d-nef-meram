export function VillaExplicationPropertyRow(order, title, value, i18n) {
  const formattedOrder = String(order).padStart(2, '0');

  return `
      <div class="s3d-villa__floor-explication-screen-info-row"  style="order: ${order}">
        <div class="s3d-villa__floor-explication-screen-info-row-title">${formattedOrder} ${title}</div>
        <div class="s3d-villa__floor-explication-screen-info-row-blank"></div>
        <div class="s3d-villa__floor-explication-screen-info-row-value">
          ${value} ${i18n.t('area_unit')}
        </div>
      </div>
    `;
}
