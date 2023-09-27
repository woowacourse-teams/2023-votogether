import MobileLogin from './MobileLogin';
import ServiceIntroductionSection from './ServiceIntroductionSection';
import * as S from './style';

export default function LoginPage() {
  return (
    <S.Container>
      <ServiceIntroductionSection />
      <MobileLogin />
    </S.Container>
  );
}
