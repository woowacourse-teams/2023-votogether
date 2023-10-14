import IconButton from '../IconButton';

import * as S from './style';

interface AlarmIconButtonProps {
  isActive: boolean;
  handleAlarmOpenClick: () => void;
}

export default function AlarmIconButton({ isActive, handleAlarmOpenClick }: AlarmIconButtonProps) {
  return (
    <S.Container>
      <S.Active $isActive={isActive} />
      <IconButton category="alarm" onClick={handleAlarmOpenClick} />
    </S.Container>
  );
}
