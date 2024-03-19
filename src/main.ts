export const $ = (selector: string) => {
  if (!selector) throw "Invalid Selector";
  let elements = document.querySelectorAll(selector);
  return elements.length === 1 ? elements[0] : elements;
};
