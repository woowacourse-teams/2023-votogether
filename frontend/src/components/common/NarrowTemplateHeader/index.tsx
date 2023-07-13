import { ReactNode } from 'react';

import * as S from './style';

export default function NarrowTemplateHeader({ children }: { children: ReactNode }) {
  return <S.Container>{children}</S.Container>;
}
