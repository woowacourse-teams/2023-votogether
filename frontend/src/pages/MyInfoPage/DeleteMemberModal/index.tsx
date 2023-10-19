import { useToggle } from '@hooks';

import Modal from '@components/common/Modal';

import * as S from './style';
interface DeleteMemberModalProps {
  handleModalClose: () => void;
  handleWithdrawalMembership: () => void;
}

export default function DeleteMemberModal({
  handleModalClose,
  handleWithdrawalMembership,
}: DeleteMemberModalProps) {
  const { isOpen, closeComponent: closeModal } = useToggle(true);

  const primaryButton = {
    text: '저장',
    handleClick: handleWithdrawalMembership,
  };

  const secondaryButton = {
    text: '초기화',
    handleClick: handleModalClose,
  };

  return (
    <>
      {isOpen && (
        <Modal
          title="정말 탈퇴하시겠어요?"
          size="sm"
          primaryButton={primaryButton}
          secondaryButton={secondaryButton}
          handleModalClose={closeModal}
        >
          <S.ModalDescription>
            탈퇴 버튼 클릭 시, <br></br>계정은 삭제되며 복구되지 않아요.
            <p>
              작성한 게시글과 투표 기록 등 <br></br> 서비스 사용 내역이 사라지므로 <br></br>
              유의해주세요.
            </p>
          </S.ModalDescription>
        </Modal>
      )}
    </>
  );
}
