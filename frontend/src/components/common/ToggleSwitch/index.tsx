import { Size } from '@type/style';

import * as S from './style';

interface ButtonInfo {
  text: string;
  event: () => void;
}

interface ToggleSwitchProps {
  size: Size | 'free';
  selectedButton: string;
  firstButton: ButtonInfo;
  secondButton: ButtonInfo;
}

export default function ToggleSwitch({
  size,
  selectedButton,
  firstButton,
  secondButton,
}: ToggleSwitchProps) {
  const handleFirstButtonClick = () => {
    if (selectedButton === firstButton.text) return;

    firstButton.event();
  };

  const handleSecondButtonClick = () => {
    if (selectedButton === secondButton.text) return;

    secondButton.event();
  };

  return (
    <S.Wrapper $size={size}>
      <S.Content onClick={handleFirstButtonClick} $isSelected={selectedButton === firstButton.text}>
        {firstButton.text}
      </S.Content>
      <S.Content
        onClick={handleSecondButtonClick}
        $isSelected={selectedButton === secondButton.text}
      >
        {secondButton.text}
      </S.Content>
    </S.Wrapper>
  );
}
