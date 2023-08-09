import { useSelect } from '@hooks/useSelect';

import CommentModal from '@components/comment/CommentModal';
import Select from '@components/common/Select';

import { USER_REPORT_KIND, USER_REPORT_MESSAGE } from './constants';
import { type UserReportMessage } from './types';

interface UserReportModalProps {
  handleCancelClick: () => void;
}

export default function UserReportModal({ handleCancelClick }: UserReportModalProps) {
  const { handleOptionChange, selectedOption } = useSelect<UserReportMessage>(
    USER_REPORT_KIND.ADVERTISING
  );

  return (
    <CommentModal
      title="유저 신고하기"
      primaryButton={{
        text: '신고',
        handleClick: () => {},
      }}
      secondaryButton={{
        text: '취소',
        handleClick: handleCancelClick,
      }}
    >
      <Select<UserReportMessage>
        aria-label="유저 신고 방법 선택"
        optionList={USER_REPORT_MESSAGE}
        handleOptionChange={handleOptionChange}
        selectedOption={USER_REPORT_MESSAGE[selectedOption]}
      />
    </CommentModal>
  );
}
