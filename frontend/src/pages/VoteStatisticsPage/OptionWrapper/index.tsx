import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext, usePostDetail } from '@hooks';

import { PATH } from '@constants/path';

import { checkWriter } from '@utils/post/checkWriter';

import OptionStatistics from '../OptionStatistics';

export default function OptionWrapper({ postId }: { postId: number }) {
  const { isLoggedIn } = useContext(AuthContext).loggedInfo;
  const { data: postDetail } = usePostDetail(isLoggedIn, postId);

  if (!isLoggedIn && postDetail && !checkWriter(postDetail.writer.id))
    return <Navigate to={PATH.HOME} />;

  return (
    postDetail &&
    postDetail.voteInfo.options.map(option => {
      const { postId, voteInfo } = postDetail;
      return (
        <OptionStatistics
          key={option.id}
          postId={postId}
          isSelectedOption={voteInfo.selectedOptionId === option.id}
          voteOption={option}
          size="sm"
        />
      );
    })
  );
}
