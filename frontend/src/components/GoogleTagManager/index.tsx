import { useEffect } from 'react';
import TagManager from 'react-gtm-module';

export default function GoogleTagManager({ gtmId }: { gtmId: string }) {
  useEffect(() => {
    TagManager.initialize({ gtmId });
  });

  return <></>;
}
