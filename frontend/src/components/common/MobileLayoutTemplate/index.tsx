import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import IconButton from '../IconButton';
import NarrowTemplateHeader from '../NarrowTemplateHeader';

import * as S from './style';

interface MobileLayoutTemplateProps {
  children: ReactNode;
}

export default function MobileLayoutTemplate({ children }: MobileLayoutTemplateProps) {
  const navigate = useNavigate();

  return (
    <>
      <NarrowTemplateHeader>
        <IconButton
          category="back"
          onClick={() => {
            navigate(-1);
          }}
        />
      </NarrowTemplateHeader>
      <S.ContentWrapper>{children}</S.ContentWrapper>
    </>
  );
}
