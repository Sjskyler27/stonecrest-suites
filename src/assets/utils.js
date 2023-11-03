export function setHeight(element, isAdmin, adminSize) {
  if (element && !isAdmin) {
    const contentHeight = element.scrollHeight;
    const totalHeight = contentHeight;
    element.style.height = `${totalHeight}px`;
  } else if (element) {
    element.style.height = `${adminSize}px`;
  }
}
