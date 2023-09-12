export const smoothScrollToTop = () => {
  window.scroll({ top: 0, behavior: 'smooth' });
};

export const defaultScrollToTop = () => {
  window.scrollTo(0, 0);
};
