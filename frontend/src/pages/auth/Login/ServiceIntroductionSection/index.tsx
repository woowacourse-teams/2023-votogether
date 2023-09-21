import home from '@assets/votogether_home.webp';
import write from '@assets/votogether_write.webp';

import * as S from './style';

export default function ServiceIntroductionSection() {
  return (
    <S.Container>
      <S.ContentContainer>
        <S.TitleContainer>
          <S.TitleText>FUN FROM CHOICE!</S.TitleText>
          <S.TitleText>오늘도 즐거운 한 표!</S.TitleText>
        </S.TitleContainer>

        <S.IntroduceContainer>
          <S.Introduce>
            <S.Text>투표를 해보세요!</S.Text>
            <S.PhoneImage src={home} alt="보투게더 이용 사진" />
          </S.Introduce>
          <S.Introduce>
            <S.Text>글을 쓰며 사람들의 반응을 확인해요!</S.Text>
            <S.PhoneImage src={write} alt="보투게더 글 작성하는 사진" />
          </S.Introduce>
        </S.IntroduceContainer>
      </S.ContentContainer>
      <S.Decorator />
      <S.Decorator />
      <S.Decorator />
    </S.Container>
  );
}
