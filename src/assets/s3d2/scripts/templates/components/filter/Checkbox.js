export default function Checkbox({ name, value, title, wide, checked }) {
  const roomsValue = name === 'rooms' ? `${title}+1` : ` ${title}`;

  return `
    <div class="Checkbox">
      <input ${
        checked ? 'checked' : ''
      } class="Checkbox__input" type="checkbox" data-type="${name}" data-${name}="${value}" id="${name}-${value}">
      <label class="Checkbox__label" for="${name}-${value}">${roomsValue}</label>
    </div>
  `;
}
