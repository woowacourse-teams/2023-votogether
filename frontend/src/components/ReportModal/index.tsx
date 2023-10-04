import { ReportType } from '@type/report';

import { useSelect } from '@hooks';

import Select from '@components/common/Select';
import TwoButtonModal from '@components/common/TwoButtonModal';

import { REPORT_TYPE } from './constants';

interface UserReportModalProps {
  reportType: ReportType;
  handleCancelClick: () => void;
  handleReportClick: (reason: string) => void;
  isReportLoading: boolean;
}

export default function ReportModal({
  reportType,
  handleCancelClick,
  handleReportClick,
  isReportLoading,
}: UserReportModalProps) {
  const { name, reportMessageList } = REPORT_TYPE[reportType];
  const defaultReportMessage = Object.keys(reportMessageList)[0];
  const { selectedOption, handleOptionChange } = useSelect(defaultReportMessage);

  const handlePrimaryButtonClick = () => {
    !isReportLoading && handleReportClick(selectedOption);
    handleCancelClick();
  };

  return (
    <TwoButtonModal
      title={name}
      primaryButton={{
        text: '신고',
        handleClick: handlePrimaryButtonClick,
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
