import { useContext } from 'react';

import { AuthContext } from '@hooks/context/auth';
import { useUserRanking } from '@hooks/query/ranking/useUserRanking';

import * as S from '../style';

export default function UserRanking() {
  const { loggedInfo } = useContext(AuthContext);
  const { isLoggedIn } = loggedInfo;

  const { data: userRanking } = useUserRanking(isLoggedIn);

  return (
    userRanking && (
      <S.Tr>
        <S.Td>{userRanking.ranking}</S.Td>
        <S.Td>{userRanking.nickname}</S.Td>
        <S.Td>{userRanking.postCount}</S.Td>
        <S.Td>{userRanking.voteCount}</S.Td>
        <S.Td>{userRanking.score}</S.Td>
      </S.Tr>
    )
  );
}
