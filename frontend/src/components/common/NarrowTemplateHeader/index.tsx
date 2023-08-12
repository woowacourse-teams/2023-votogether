import { PropsWithChildren } from 'react';

import * as S from './style';

interface NarrowTemplateHeaderProps extends PropsWithChildren {}

export default function NarrowTemplateHeader({ children }: NarrowTemplateHeaderProps) {
  return <S.Container>{children}</S.Container>;
}
