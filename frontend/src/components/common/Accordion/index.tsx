import { PropsWithChildren, useState } from 'react';

import chevronDown from '@assets/chevron-down.svg';
import chevronUp from '@assets/chevron-up.svg';

import * as S from './style';

interface AccordionProps extends PropsWithChildren {
  title: string;
  ariaLabel?: string;
}

export default function Accordion({ title, ariaLabel = '메뉴', children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <S.Wrapper>
      <S.Title
        aria-label={isOpen ? `${ariaLabel} 닫기` : `${ariaLabel} 열기`}
        tabIndex={0}
        onClick={toggleAccordion}
        aria-controls={`${title}에 대한 내용`}
      >
        {title}
        <S.Image src={isOpen ? chevronUp : chevronDown} alt="" $isOpen={isOpen} />
      </S.Title>
      <S.Content aria-live="polite" id={`${title}에 대한 내용`} $isOpen={isOpen}>
        {children}
      </S.Content>
    </S.Wrapper>
  );
}
