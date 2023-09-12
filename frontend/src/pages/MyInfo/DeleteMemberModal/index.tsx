import Modal from '@components/common/Modal';
import SquareButton from '@components/common/SquareButton';

import * as S from './style';
interface DeleteMemberModalProps {
  handleModalClose: () => void;
  handleWithdrawalMembership: () => void;
}

export default function DeleteMemberModal({
  handleModalClose,
  handleWithdrawalMembership,
}: DeleteMemberModalProps) {
  return (
    <Modal size="sm" onModalClose={handleModalClose}>
      <S.ModalBody>
        <S.ModalTitle>정말 탈퇴하시겠어요?</S.ModalTitle>
        <S.ModalDescription>
          탈퇴 버튼 클릭 시, <br></br>계정은 삭제되며 복구되지 않아요.
          <p>
            작성한 게시글과 투표 기록 등 <br></br> 서비스 사용 내역이 사라지므로 <br></br>
            유의해주세요.
          </p>
        </S.ModalDescription>
        <S.ButtonListWrapper>
          <SquareButton onClick={handleWithdrawalMembership} aria-label="회원 탈퇴" theme="fill">
            탈퇴
          </SquareButton>
          <SquareButton onClick={handleModalClose} aria-label="회원 탈퇴" theme="blank">
            취소
          </SquareButton>
        </S.ButtonListWrapper>
      </S.ModalBody>
    </Modal>
  );
}
