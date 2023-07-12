import { ButtonHTMLAttributes } from 'react';

import logo from '@assets/logo.svg';
import votogether from '@assets/projectName.svg';

import * as S from './style';

type Inclusion = 'icon' | 'text' | 'full';

const inclusionCategory: { [key in Inclusion]: { name: string; url: string } } = {
  icon: {
    name: '로고 아이콘',
    url: logo,
  },
  text: {
    name: 'votogether',
    url: votogether,
  },
  full: {
    name: 'votogether',
    url: '',
  },
};

interface LogoButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  inclusion: Inclusion;
}

export default function LogoButton({ inclusion, ...rest }: LogoButtonProps) {
  const src = inclusionCategory[inclusion].url;
  const ariaLabelText = inclusionCategory[inclusion].name;

  if (inclusion === 'full') {
    return (
      <S.Button inclusion={inclusion} aria-label={ariaLabelText} {...rest}>
        <img src={logo} alt="로고 아이콘" />
        <img src={votogether} alt="VoTogether" />
      </S.Button>
    );
  }

  return (
    <S.Button inclusion={inclusion} aria-label={ariaLabelText} {...rest}>
      <img src={src} alt="로고 아이콘" />
    </S.Button>
  );
}
