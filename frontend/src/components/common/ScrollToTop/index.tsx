import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { defaultScrollToTop } from '@utils/scrollToTop';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    defaultScrollToTop();
  }, [pathname]);

  return null;
}
