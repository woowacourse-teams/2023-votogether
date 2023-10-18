import { Suspense } from 'react';

import { useToggleSwitch } from '@hooks';

import ErrorBoundary from '@pages/ErrorBoundary';

import LoadingSpinner from '@components/common/LoadingSpinner';
import ToggleSwitch from '@components/common/ToggleSwitch';

import PassionUserRanking from '../PassionUser';
import PopularPost from '../PopularPost';
import * as RS from '../RankingTableStyle';

export default function PageContent() {
  const { selectedButton, firstButton, secondButton } = useToggleSwitch('열정 유저', '인기글 유저');

  return (
    <>
      <ToggleSwitch
        size="sm"
        selectedButton={selectedButton}
        firstButton={firstButton}
        secondButton={secondButton}
      />
      {selectedButton === '열정 유저' && (
        <RS.Background>
          <ErrorBoundary hasRetryInteraction={true}>
            <Suspense fallback={<LoadingSpinner size="md" />}>
              <PassionUserRanking />
            </Suspense>
          </ErrorBoundary>
        </RS.Background>
      )}
      {selectedButton === '인기글 유저' && (
        <RS.Background>
          <ErrorBoundary hasRetryInteraction={true}>
            <Suspense fallback={<LoadingSpinner size="md" />}>
              <PopularPost />
            </Suspense>
          </ErrorBoundary>
        </RS.Background>
      )}
    </>
  );
}
