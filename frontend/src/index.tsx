import React from 'react';
import ReactGA from 'react-ga4';

import ReactDOM from 'react-dom/client';

import App from './App';
import { worker } from './mocks/worker';

if (process.env.NODE_ENV === 'development') {
  worker.start();
}

if (
  navigator.userAgent.search('Trident') !== -1 ||
  navigator.userAgent.toLowerCase().indexOf('msie') !== -1
) {
  alert('이 브라우저는 지원 중단 되었습니다. 최적의 환경을 위해 브라우저를 업데이트 하세요.');
}

if (process.env.VOTOGETHER_GOOGLE_ANALYTICS_ID) {
  ReactGA.initialize(process.env.VOTOGETHER_GOOGLE_ANALYTICS_ID);
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
