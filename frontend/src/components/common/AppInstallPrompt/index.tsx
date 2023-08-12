import { Fragment, useEffect, useState } from 'react';

import { BeforeInstallPromptEvent } from '../../../../window';

import MobileInstallPrompt from './MobileInstallPrompt';

export default function AppInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const isDeviceIOS = /iPad|iPhone|iPod/.test(window.navigator.userAgent);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleBeforeInstallPrompt = (event: BeforeInstallPromptEvent) => {
    event.preventDefault();
    setDeferredPrompt(event);
  };

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();

      deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
        if (choiceResult.outcome === 'accepted') {
          window.console.log('사용자가 설치 프롬프트에 동의했습니다.');
        } else {
          window.console.log('사용자가 설치 프롬프트를 무시했습니다.');
        }

        setDeferredPrompt(null);
      });
    }
  };

  const handleCancelClick = () => {
    setDeferredPrompt(null);
  };

  return (
    <Fragment>
      {deferredPrompt && (
        <MobileInstallPrompt
          handleInstallClick={handleInstallClick}
          handleCancelClick={handleCancelClick}
          platform={isDeviceIOS ? 'ios' : 'android'}
        />
      )}
    </Fragment>
  );
}
