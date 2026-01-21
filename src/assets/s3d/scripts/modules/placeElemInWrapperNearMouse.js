function placeElemInWrapperNearMouse(el, event, offset = 20) {
  const mouseX = event.clientX + offset;
  const mouseY = event.clientY + offset;

  const viewportW = window.innerWidth;
  const viewportH = window.innerHeight;

  const elW = el.offsetWidth;
  const elH = el.offsetHeight;

  let x = mouseX;
  let y = mouseY;

  if (x + elW > viewportW) x = viewportW - elW - 10;
  if (x < 0) x = 10;

  if (y + elH > viewportH) y = viewportH - elH - 10;
  if (y < 0) y = 10;

  return { x, y };
}

export default placeElemInWrapperNearMouse;
