import Layout from '@components/common/Layout';

import * as S from './style';

export default function ReportAlarmPage() {
  return (
    <Layout isSidebarVisible={true} isChannelTalkVisible={false}>
      <S.Container>
        <S.PageHeader>신고 처리 내역</S.PageHeader>
        <S.ContentContainer></S.ContentContainer>
      </S.Container>
    </Layout>
  );
}
