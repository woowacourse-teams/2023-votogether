/* src/RouteChangeTracker.js */
import { useEffect, useState } from 'react';
import ReactGA from 'react-ga4';
import { useLocation } from 'react-router-dom';

export default function RouteChangeTracker() {
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (process.env.VOTOGETHER_GOOGLE_ANALYTICS_ID) {
      ReactGA.initialize(process.env.VOTOGETHER_GOOGLE_ANALYTICS_ID);
      setInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (initialized) {
      ReactGA.set({ page: location.pathname });
      ReactGA.send('pageview');
    }
  }, [initialized, location]);

  return <></>;
}
