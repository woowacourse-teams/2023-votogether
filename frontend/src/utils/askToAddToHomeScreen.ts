export const askToAddToHomeScreen = () => {
  if (
    !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    window.matchMedia('(display-mode: standalone)').matches
  )
    return;

  const addToHomeScreen = window.confirm(
    'VoTogether를 홈화면에 추가하시겠습니까? 추가하시면 어플처럼 사용하실 수 있습니다.'
  );

  if (addToHomeScreen) {
    const manifestURL = 'icons/manifest.json';

    const link = document.createElement('link');
    link.rel = 'manifest';
    link.href = manifestURL;
    document.head.appendChild(link);
  }
};
