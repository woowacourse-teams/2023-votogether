import logo from '@assets/logo.svg';
import projectName from '@assets/projectName.svg';

import SearchBar from '../SearchBar';

import * as S from './style';

export default function WideHeader() {
  return (
    <S.Container>
      <S.Button>
        <S.Img src={logo} alt="로고 아이콘" />
        <S.Img src={projectName} alt="VoTogether" />
      </S.Button>
      <SearchBar size="sm" />
    </S.Container>
  );
}
