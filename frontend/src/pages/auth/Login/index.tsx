import MobileLogin from './MobileLogin';
import StartUsingOurService from './StartUsingOurService';
import * as S from './style';

export default function Login() {
  return (
    <S.Container>
      <StartUsingOurService />
      <MobileLogin />
    </S.Container>
  );
}
