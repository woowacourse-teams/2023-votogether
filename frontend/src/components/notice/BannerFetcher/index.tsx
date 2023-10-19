import { useBannerNotice } from '@hooks';

import Banner from '@components/common/Banner';

import { PATH } from '@constants/path';

interface BannerFetcherProps {
  handleClose: () => void;
}

export default function BannerFetcher({ handleClose }: BannerFetcherProps) {
  const { data } = useBannerNotice();

  if (!data) return <></>;

  const { id, bannerTitle, bannerSubtitle } = data;

  return (
    <Banner
      title={bannerTitle}
      content={bannerSubtitle}
      handleClose={handleClose}
      path={`${PATH.NOTICES}/${id}`}
    />
  );
}
