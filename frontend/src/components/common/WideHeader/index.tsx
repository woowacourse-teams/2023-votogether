import { CSSProperties, MouseEvent, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext, ToastContext, useToggle } from '@hooks';

import { useReadLatestAlarm } from '@hooks/query/user/useReadLatestAlarm';

import { PATH } from '@constants/path';

import AlarmContainer from '../../AlarmContainer';
import AlarmIconButton from '../ActiveContainer';
import IconButton from '../IconButton';
import LogoButton from '../LogoButton';
import SearchBar from '../SearchBar';
import ToolTip from '../ToolTip';

import * as S from './style';

// 70px = 토글 스위치의 크기(40px) 및 상하 padding(각 10px), gap(10px)
const alarmToolTipStyle: CSSProperties = {
  maxHeight: '600px',
  width: '450px',
};

export default function WideHeader() {
  const navigate = useNavigate();
  const { isOpen, openComponent, closeComponent } = useToggle();
  const toolTipRef = useRef<HTMLDivElement | null>(null);

  const { addMessage } = useContext(ToastContext);
  const loggedInfo = useContext(AuthContext).loggedInfo;
  const isAlarmActive = loggedInfo.userInfo?.hasLatestAlarm;

  const { mutate } = useReadLatestAlarm();

  const movePostListPage = () => {
    navigate('/');
  };

  const moveRankingPage = () => {
    navigate(PATH.RANKING);
  };

  const handleToolTipOpen = () => {
    if (!loggedInfo.isLoggedIn) return addMessage('알림은 로그인 후 이용할 수 있습니다.');

    openComponent();
    mutate();
  };

  const handleToolTipClick = (e: MouseEvent<HTMLDivElement>) => {
    const targetElement = e.target;
    targetElement === toolTipRef.current && closeComponent();
  };

  return (
    <S.Container>
      <S.LogoWrapper>
        <LogoButton content="full" onClick={movePostListPage} />
      </S.LogoWrapper>
      <S.Wrapper>
        <SearchBar size="sm" />
        <AlarmIconButton isActive={isAlarmActive ?? false}>
          <IconButton category="alarm" onClick={handleToolTipOpen} />
        </AlarmIconButton>
        <IconButton category="ranking" onClick={moveRankingPage} />
      </S.Wrapper>
      {isOpen && (
        <S.ToolTipBackdrop onClick={handleToolTipClick} ref={toolTipRef}>
          <ToolTip size="free">
            <AlarmContainer closeToolTip={closeComponent} style={alarmToolTipStyle} />
          </ToolTip>
        </S.ToolTipBackdrop>
      )}
    </S.Container>
  );
}
