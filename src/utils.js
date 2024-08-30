export const showLoading = (elements) => {
  elements.forEach((element) => {
    element.style.display = 'flex';
  });
};

export const hideLoading = (elements) => {
  elements.forEach((element) => {
    element.style.display = 'none';
  });
};
