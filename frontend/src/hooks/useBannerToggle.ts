import { BANNER_VISIBLE_MAX_AGE } from '@constants/cookie';

import { getCookie, setCookie } from '@utils/cookie';

import { useToggle } from './useToggle';

export const useBannerToggle = () => {
  const { isBannerVisible } = getCookie();
  const initialBannerVisible = isBannerVisible ? JSON.parse(isBannerVisible) : true;
  const { isOpen: isBannerOpen, closeComponent } = useToggle(initialBannerVisible);

  const closeBanner = () => {
    const isCloseBannerConfirmed = window.confirm(
      '배너를 닫으시면 하루동안 볼 수 없습니다. 닫으시겠습니까?'
    );

    if (isCloseBannerConfirmed) {
      setCookie({
        key: 'isBannerVisible',
        value: 'false',
        maxAge: BANNER_VISIBLE_MAX_AGE,
      });

      closeComponent();
    }
  };

  return {
    isBannerOpen,
    closeBanner,
  };
};
