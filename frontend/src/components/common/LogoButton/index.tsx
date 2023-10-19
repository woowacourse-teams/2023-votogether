import { ButtonHTMLAttributes, useState } from 'react';

import EventMascot from '@pages/EventMascot';

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
  const [count, setCount] = useState(0);

  //이벤트를 위한 코드
  const handleLogoClick = () => {
    if (count > 5) return;

    setCount(count + 1);
  };

  if (content === 'full') {
    return (
      <S.Button content={content} aria-label={ariaLabelText} {...rest}>
        <img src={logo} alt="로고 아이콘" onClick={handleLogoClick} />
        {count > 5 && <EventMascot />}
        <img src={votogether} alt="보투게더 아이콘" />
      </S.Button>
    );
  }

  return (
    <S.Button content={content} aria-label={ariaLabelText} {...rest}>
      <img src={src} alt="보투게더 아이콘" onClick={handleLogoClick} />
      {count > 5 && <EventMascot />}
    </S.Button>
  );
}
