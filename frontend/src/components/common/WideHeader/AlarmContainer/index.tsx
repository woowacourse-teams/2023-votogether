import { Suspense } from 'react';

import { useToggleSwitch } from '@hooks';

import ErrorBoundary from '@pages/ErrorBoundary';

import LoadingSpinner from '@components/common/LoadingSpinner';
import ToggleSwitch from '@components/common/ToggleSwitch';

import ContentAlarmList from './ContentAlarmList';
import ReportAlarmList from './ReportAlarmList';
import * as S from './style';

const CONTENT = 'content';
const REPORT = 'report';

export default function AlarmContainer() {
  const { selectedButton, firstButton, secondButton } = useToggleSwitch(CONTENT, REPORT);

  return (
    <S.Container>
      <ToggleSwitch
        size="free"
        selectedButton={selectedButton}
        firstButton={firstButton}
        secondButton={secondButton}
      />
      <S.Content>
        <ErrorBoundary>
          <Suspense
            fallback={
              <S.LoadingSpinnerWrapper>
                <LoadingSpinner size="sm" />
              </S.LoadingSpinnerWrapper>
            }
          >
            {selectedButton === CONTENT && <ContentAlarmList />}
            {selectedButton === REPORT && <ReportAlarmList />}
          </Suspense>
        </ErrorBoundary>
      </S.Content>
    </S.Container>
  );
}
