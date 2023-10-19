import { Fragment, useEffect, useState } from 'react';

import ChannelTalk from '@components/ChannelTalk';

import { APP_VISIBLE_MAX_AGE } from '@constants/cookie';

import { getCookie, setCookie } from '@utils/cookie';

import { BeforeInstallPromptEvent } from '../../../../window';

import BookMarkPrompt from './BookMarkPrompt';
import InstallPrompt from './InstallPrompt';

const isBookMarkPromptActive = () => {
  const isActive = JSON.parse(getCookie().isAppInstallVisible || 'true');

  if (isActive) {
    ChannelTalk.hideChannelButton();

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
    setCookie({ key: 'isAppInstallVisible', value: 'false', maxAge: APP_VISIBLE_MAX_AGE });
    setBookMarkPrompt(null);
    setDeferredPrompt(null);

    ChannelTalk.showChannelButton();
  };

  const handleBeforeInstallPrompt = (event: BeforeInstallPromptEvent) => {
    event.preventDefault();
    const isVisible = JSON.parse(getCookie().isAppInstallVisible || 'true');

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
