import TwoButtonModal from '../../common/TwoButtonModal';

import * as S from './style';

interface DeleteModalProps {
  target: string;
  handleCancelClick: () => void;
  handleDeleteClick: () => void;
}

export default function DeleteModal({
  target,
  handleCancelClick,
  handleDeleteClick,
}: DeleteModalProps) {
  const handlePrimaryButtonClick = () => {
    handleDeleteClick();
    handleCancelClick();
  };

  return (
    <TwoButtonModal
      title={`${target} 삭제하기`}
      primaryButton={{
        text: '삭제',
        handleClick: handlePrimaryButtonClick,
      }}
      secondaryButton={{
        text: '취소',
        handleClick: handleCancelClick,
      }}
    >
      <S.Description>{`${target}을(를) 삭제하시겠습니까?\n${target}은(는) 삭제되고 취소할 수 없습니다.`}</S.Description>
    </TwoButtonModal>
  );
}
