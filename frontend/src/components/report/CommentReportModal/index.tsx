import React from 'react';

import { useSelect } from '@hooks/useSelect';

import Select from '@components/common/Select';
import CommentModal from '@components/post/CommentList/CommentItem/CommentModal';

import { COMMENT_REPORT_MESSAGE } from './constants';
import { CommentReportMessage } from './types';

interface CommentReportModalProps {
  handleCancelClick: () => void;
}

export default function CommentReportModal({ handleCancelClick }: CommentReportModalProps) {
  const { handleOptionChange, selectedOption } = useSelect<CommentReportMessage>('advertising');

  return (
    <CommentModal
      title="댓글 신고하기"
      primaryText="신고"
      secondaryText="취소"
      primaryClick={() => {}}
      secondaryClick={handleCancelClick}
    >
      <Select<CommentReportMessage>
        aria-label="댓글 신고 방법 선택"
        optionList={COMMENT_REPORT_MESSAGE}
        handleOptionChange={handleOptionChange}
        selectedOption={COMMENT_REPORT_MESSAGE[selectedOption]}
        defaultValue="신고 사유를 선택해주세요"
      />
    </CommentModal>
  );
}
