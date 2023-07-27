import React from 'react';

import { useSelect } from '@hooks/useSelect';

import Select from '@components/common/Select';

import CommentModal from '../CommentModal';

import { REPORT_MESSAGE } from './constants';
import { ReportMessage } from './types';

interface CommentReportModalProps {
  handleCancelClick: () => void;
}

export default function CommentReportModal({ handleCancelClick }: CommentReportModalProps) {
  const { handleOptionChange, selectedOption } = useSelect<ReportMessage>('advertising');

  return (
    <CommentModal
      title="댓글 신고하기"
      primaryText="신고"
      secondaryText="취소"
      primaryClick={() => {}}
      secondaryClick={handleCancelClick}
    >
      <Select<ReportMessage>
        aria-label="댓글 신고 방법 선택"
        optionList={REPORT_MESSAGE}
        handleOptionChange={handleOptionChange}
        selectedOption={REPORT_MESSAGE[selectedOption]}
        defaultValue="신고 사유를 선택해주세요"
      />
    </CommentModal>
  );
}
