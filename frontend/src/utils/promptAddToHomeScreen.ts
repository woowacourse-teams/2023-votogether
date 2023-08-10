export const promptAddToHomeScreen = () => {
  const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  const isAlreadyAddedToHomeScreen = window.matchMedia('(display-mode: standalone)').matches;

  if (isMobileDevice || isAlreadyAddedToHomeScreen) return;

  const addToHomeScreen = window.confirm(
    'VoTogether를 홈화면에 추가하시겠습니까? 추가하시면 어플처럼 사용하실 수 있습니다.'
  );

  if (addToHomeScreen) {
    const manifestURL = 'icons/manifest.json';

    const manifestLink = document.createElement('link');
    manifestLink.rel = 'manifest';
    manifestLink.href = manifestURL;
    document.head.appendChild(manifestLink);
  }
};
