import React from 'react';

import { useSelect } from '@hooks/useSelect';

import Select from '@components/common/Select';

import CommentModal from '../CommentModal';

import { USER_REPORT_MESSAGE } from './constants';
import { UserReportMessage } from './types';

interface UserReportModalProps {
  handleCancelClick: () => void;
}

export default function UserReportModal({ handleCancelClick }: UserReportModalProps) {
  const { handleOptionChange, selectedOption } =
    useSelect<UserReportMessage>('advertisingNickname');

  return (
    <CommentModal
      title="유저 신고하기"
      primaryText="신고"
      secondaryText="취소"
      primaryClick={() => {}}
      secondaryClick={handleCancelClick}
    >
      <Select<UserReportMessage>
        aria-label="유저 신고 방법 선택"
        optionList={USER_REPORT_MESSAGE}
        handleOptionChange={handleOptionChange}
        selectedOption={USER_REPORT_MESSAGE[selectedOption]}
        defaultValue="신고 사유를 선택해주세요"
      />
    </CommentModal>
  );
}
