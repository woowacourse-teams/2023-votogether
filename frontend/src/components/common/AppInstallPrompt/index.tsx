import { Fragment, useEffect, useState } from 'react';

import { getCookieToken, setCookie } from '@utils/cookie';

import { BeforeInstallPromptEvent } from '../../../../window';

import IosInstallPrompt from './IosInstallPrompt';
import MobileInstallPrompt from './MobileInstallPrompt';

const isIOSPromptActive = () => {
  const isActive = JSON.parse(getCookieToken().isAppInstallVisible || 'true');

  if (isActive) {
    return true;
  }

  return null;
};

export default function AppInstallPrompt() {
  const isDeviceIOS = /iPad|iPhone|iPod/.test(window.navigator.userAgent);
  const [iosPrompt, setIosPrompt] = useState<boolean | null>(
    isDeviceIOS ? isIOSPromptActive() : null
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
    setIosPrompt(null);
    setDeferredPrompt(null);
  };

  const handleBeforeInstallPrompt = (event: BeforeInstallPromptEvent) => {
    event.preventDefault();
    const isVisible = JSON.parse(getCookieToken().isAppInstallVisible || 'true');

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
        <MobileInstallPrompt
          handleInstallClick={handleInstallClick}
          handleCancelClick={handleCancelClick}
        />
      )}
      {iosPrompt && <IosInstallPrompt handleCancelClick={handleCancelClick} />}
    </Fragment>
  );
}
