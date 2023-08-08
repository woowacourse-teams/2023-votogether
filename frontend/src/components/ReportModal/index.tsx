import { ReportType } from '@type/report';

import { useSelect } from '@hooks/useSelect';

import Select from '@components/common/Select';
import TwoButtonModal from '@components/common/TwoButtonModal';

import { REPORT_TYPE } from './constants';

interface UserReportModalProps {
  reportType: ReportType;
  handleCancelClick: () => void;
  handleReportClick: (reason: string) => void;
}

export default function ReportModal({
  reportType,
  handleCancelClick,
  handleReportClick,
}: UserReportModalProps) {
  const { name, reportMessageList } = REPORT_TYPE[reportType];
  const defaultReportMessage = Object.keys(reportMessageList)[0];
  const { selectedOption, handleOptionChange } = useSelect(defaultReportMessage);

  return (
    <TwoButtonModal
      title={name}
      primaryButton={{
        text: '신고',
        handleClick: () => handleReportClick(selectedOption),
      }}
      secondaryButton={{
        text: '취소',
        handleClick: handleCancelClick,
      }}
    >
      <Select
        aria-label={`${name} 방법 선택`}
        optionList={reportMessageList}
        handleOptionChange={handleOptionChange}
        selectedOption={reportMessageList[selectedOption]}
      />
    </TwoButtonModal>
  );
}
