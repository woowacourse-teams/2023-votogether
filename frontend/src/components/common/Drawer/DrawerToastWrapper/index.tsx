import { HTMLAttributes } from 'react';

import { ToastContentId } from '@type/toast';

import * as S from './style';

interface DrawerToastWrapperProps extends HTMLAttributes<HTMLDivElement> {
  id: ToastContentId;
  placement: 'left' | 'right';
}

export default function DrawerToastWrapper({ placement, ...rest }: DrawerToastWrapperProps) {
  return <S.ToastWrapper {...rest} $placement={placement} />;
}
