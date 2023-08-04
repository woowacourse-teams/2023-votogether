import { PropsWithChildren, useState } from 'react';

import chevronDown from '@assets/chevron-down.svg';
import chevronUp from '@assets/chevron-up.svg';

import * as S from './style';

interface AccordionProps extends PropsWithChildren {
  title: string;
}

export default function Accordion({ title, children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <S.Wrapper aria-label="Accordion">
      <S.Title onClick={toggleAccordion} aria-controls={`${title}에 대한 내용`}>
        {title}
        <S.Image src={isOpen ? chevronUp : chevronDown} alt="" $isOpen={isOpen} />
      </S.Title>
      <S.Content id={`${title}에 대한 내용`} $isOpen={isOpen}>
        {children}
      </S.Content>
    </S.Wrapper>
  );
}
