import { Fragment, useEffect, useState } from 'react';

import { getCookie, setCookie } from '@utils/cookie';

import { BeforeInstallPromptEvent } from '../../../../window';

import BookMarkPrompt from './BookMarkPrompt';
import InstallPrompt from './InstallPrompt';

const isBookMarkPromptActive = () => {
  const isActive = JSON.parse(
    getCookie<{ isAppInstallVisible: boolean }>().isAppInstallVisible || 'true'
  );

  if (isActive) {
    return true;
  }

  return null;
};

export default function AppInstallPrompt() {
  const isDeviceIOS = /iPad|iPhone|iPod/.test(window.navigator.userAgent);
  const [bookMarkPrompt, setBookMarkPrompt] = useState<boolean | null>(
    isDeviceIOS ? isBookMarkPromptActive() : null
  );
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();

      deferredPrompt.userChoice.then(() => {
        setDeferredPrompt(null);
      });
    }
  };

  const handleCancelClick = () => {
    setCookie({ key: 'isAppInstallVisible', value: 'false', maxAge: 7 * 24 * 60 * 60 });
    setBookMarkPrompt(null);
    setDeferredPrompt(null);
  };

  const handleBeforeInstallPrompt = (event: BeforeInstallPromptEvent) => {
    event.preventDefault();
    const isVisible = JSON.parse(getCookie<{}>().isAppInstallVisible || 'true');

    if (!isVisible) return;

    setDeferredPrompt(event);
  };

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  return (
    <Fragment>
      {deferredPrompt && (
        <InstallPrompt
          handleInstallClick={handleInstallClick}
          handleCancelClick={handleCancelClick}
        />
      )}
      {bookMarkPrompt && <BookMarkPrompt handleCancelClick={handleCancelClick} />}
    </Fragment>
  );
}
