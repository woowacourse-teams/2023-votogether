import Modal from '../Modal';

import * as S from './style';

interface ImageModalProps {
  src: string;
}

export default function Image({ src }: ImageModalProps) {
  return (
    <Modal size="lg" onModalClose={() => {}}>
      <div>
        <S.Image src={src}></S.Image>;
      </div>
    </Modal>
  );
}
