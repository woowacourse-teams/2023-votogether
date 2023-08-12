import { PropsWithChildren } from 'react';

import * as S from './style';

export default function NarrowTemplateHeader({ children }: PropsWithChildren) {
  return <S.Container>{children}</S.Container>;
}
