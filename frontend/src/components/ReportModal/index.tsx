import { ReportMessage, ReportType } from '@type/report';

import { useSelect } from '@hooks';

import Modal from '@components/common/Modal';
import Select from '@components/common/Select';

import { REPORT_TYPE } from './constants';
import * as S from './style';
interface UserReportModalProps {
  handleModalClose: () => void;
  reportType: ReportType;
  handleCancelClick: () => void;
  handleReportClick: (reason: ReportMessage) => void;
  isReportLoading: boolean;
}

export default function ReportModal({
  handleModalClose,
  reportType,
  handleCancelClick,
  handleReportClick,
  isReportLoading,
}: UserReportModalProps) {
  const { name, reportMessageList } = REPORT_TYPE[reportType];
  const defaultReportMessage = Object.keys(reportMessageList)[0] as ReportMessage;
  const { selectedOption, handleOptionChange } = useSelect<ReportMessage>(defaultReportMessage);

  const handlePrimaryButtonClick = () => {
    if (isReportLoading) return;

    handleReportClick(selectedOption);
    handleCancelClick();
  };

  return (
    <Modal
      title={name}
      size="sm"
      primaryButton={{
        text: '신고',
        handleClick: handlePrimaryButtonClick,
      }}
      secondaryButton={{
        text: '취소',
        handleClick: handleCancelClick,
      }}
      handleModalClose={handleModalClose}
    >
      <S.ModalBody>
        <Select
          aria-label={`${name} 방법 선택`}
          optionList={reportMessageList}
          handleOptionChange={handleOptionChange}
          selectedOption={reportMessageList[selectedOption]}
        />
      </S.ModalBody>
    </Modal>
  );
}
