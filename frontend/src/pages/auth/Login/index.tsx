import MobileLogin from './MobileLogin';
import ServiceIntroductionSection from './ServiceIntroductionSection';
import * as S from './style';

export default function Login() {
  return (
    <S.Container>
      <ServiceIntroductionSection />
      <MobileLogin />
    </S.Container>
  );
}
