package com.votogether.domain.report.service.strategy;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.repository.MemberRepository;
import com.votogether.domain.report.dto.request.ReportRequest;
import com.votogether.domain.report.entity.vo.ReportType;
import com.votogether.domain.report.repository.ReportRepository;
import com.votogether.global.exception.BadRequestException;
import com.votogether.test.ServiceTest;
import com.votogether.test.fixtures.MemberFixtures;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

@DisplayName("닉네임 신고기능은")
class ReportNicknameStrategyTest extends ServiceTest {

    @Autowired
    ReportNicknameStrategy reportNicknameStrategy;

    @Autowired
    ReportRepository reportRepository;

    @Autowired
    MemberRepository memberRepository;

    @Test
    @DisplayName("정상적으로 동작한다.")
    void reportNickname() {
        // given
        Member reporter = memberRepository.save(MemberFixtures.FEMALE_60.get());
        Member reported = memberRepository.save(MemberFixtures.FEMALE_30.get());

        ReportRequest request = new ReportRequest(ReportType.NICKNAME, reported.getId(), "불건전한 닉네임");

        // when, then
        assertDoesNotThrow(() -> reportNicknameStrategy.report(reporter, request));
    }

    @Test
    @DisplayName("자신의 닉네임을 신고하는 경우 예외가 발생한다.")
    void reportOwnNicknameThrowsException() {
        // given
        Member reporter = memberRepository.save(MemberFixtures.FEMALE_30.get());

        ReportRequest request = new ReportRequest(ReportType.NICKNAME, reporter.getId(), "불건전한 닉네임");

        // when, then
        assertThatThrownBy(() -> reportNicknameStrategy.report(reporter, request))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("자신의 닉네임은 신고할 수 없습니다.");
    }

    @Test
    @DisplayName("하나의 회원이 다른 회원의 닉네임을 중복하여 신고하면 예외를 던진다.")
    void reportDuplicated() {
        // given
        Member reporter = memberRepository.save(MemberFixtures.FEMALE_20.get());
        Member reported = memberRepository.save(MemberFixtures.FEMALE_10.get());

        ReportRequest request = new ReportRequest(ReportType.NICKNAME, reported.getId(), "불건전한 닉네임");

        // when
        reportNicknameStrategy.report(reporter, request);

        // then
        assertThatThrownBy(() -> reportNicknameStrategy.report(reporter, request))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("하나의 닉네임에 대해서 중복하여 신고할 수 없습니다.");
    }

    @Test
    @DisplayName("닉네임 신고가 3회가 되면 닉네임이 자동변경처리가 된다.")
    void reportAndBlind() {
        // given
        Member reporter1 = memberRepository.save(MemberFixtures.FEMALE_20.get());
        Member reporter2 = memberRepository.save(MemberFixtures.FEMALE_30.get());
        Member reporter3 = memberRepository.save(MemberFixtures.FEMALE_40.get());
        Member reported = memberRepository.save(MemberFixtures.FEMALE_10.get());

        ReportRequest request = new ReportRequest(ReportType.NICKNAME, reported.getId(), "불건전한 닉네임");

        // when
        reportNicknameStrategy.report(reporter1, request);
        reportNicknameStrategy.report(reporter2, request);
        reportNicknameStrategy.report(reporter3, request);

        // then
        assertAll(
                () -> assertThat(reported.getNickname()).contains("Pause1"),
                () -> assertThat(reportRepository.findAll()).isEmpty()
        );
    }

    @Test
    @DisplayName("targetId를 통해 해당 멤버의 Nickname을 가져온다")
    void parseTarget() {
        // given
        final Member member = memberRepository.save(MemberFixtures.MALE_30.get());

        // when
        final String nickName = reportNicknameStrategy.parseTarget(member.getId());

        // then
        assertThat(nickName).isEqualTo(member.getNickname());
    }

}
