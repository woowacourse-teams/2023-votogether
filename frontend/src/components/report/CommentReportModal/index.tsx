import { useSelect } from '@hooks/useSelect';

import Select from '@components/common/Select';
import TwoButtonModal from '@components/common/TwoButtonModal';

import { COMMENT_REPORT_KIND, COMMENT_REPORT_MESSAGE } from './constants';
import { type CommentReportMessage } from './types';

interface CommentReportModalProps {
  handleCancelClick: () => void;
}

export default function CommentReportModal({ handleCancelClick }: CommentReportModalProps) {
  const { handleOptionChange, selectedOption } = useSelect<CommentReportMessage>(
    COMMENT_REPORT_KIND.ADVERTISING
  );

  return (
    <TwoButtonModal
      title="댓글 신고하기"
      primaryButton={{
        text: '신고',
        handleClick: () => {},
      }}
      secondaryButton={{
        text: '취소',
        handleClick: handleCancelClick,
      }}
    >
      <Select<CommentReportMessage>
        aria-label="댓글 신고 방법 선택"
        optionList={COMMENT_REPORT_MESSAGE}
        handleOptionChange={handleOptionChange}
        selectedOption={COMMENT_REPORT_MESSAGE[selectedOption]}
      />
    </TwoButtonModal>
  );
}
