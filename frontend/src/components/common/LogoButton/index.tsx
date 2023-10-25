import { ButtonHTMLAttributes } from 'react';

import logo from '@assets/logo.svg';
import votogether from '@assets/projectName.svg';

import * as S from './style';

type Content = 'icon' | 'text' | 'full';

const contentCategory: Record<Content, { name: string; url: string }> = {
  icon: {
    name: '보투게더 로고 아이콘',
    url: logo,
  },
  text: {
    name: '보투게더 아이콘',
    url: votogether,
  },
  full: {
    name: '보투게더 아이콘',
    url: '',
  },
};

interface LogoButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  content: Content;
}

export default function LogoButton({ content, ...rest }: LogoButtonProps) {
  const src = contentCategory[content].url;
  const ariaLabelText = contentCategory[content].name;

  if (content === 'full') {
    return (
      <S.Button content={content} aria-label={ariaLabelText} {...rest}>
        <img src={logo} alt="로고 아이콘" />
        <img src={votogether} alt="보투게더 아이콘" />
      </S.Button>
    );
  }

  return (
    <S.Button content={content} aria-label={ariaLabelText} {...rest}>
      <img src={src} alt="보투게더 아이콘" />
    </S.Button>
  );
}
