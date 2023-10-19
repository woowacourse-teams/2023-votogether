package com.votogether.domain.report.service.strategy;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

import com.votogether.domain.alarm.entity.ReportActionAlarm;
import com.votogether.domain.alarm.repository.ReportActionAlarmRepository;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.repository.MemberRepository;
import com.votogether.domain.member.service.MemberService;
import com.votogether.domain.report.dto.ReportAggregateDto;
import com.votogether.domain.report.dto.request.ReportRequest;
import com.votogether.domain.report.entity.Report;
import com.votogether.domain.report.entity.vo.ReportType;
import com.votogether.domain.report.repository.ReportRepository;
import com.votogether.global.exception.BadRequestException;
import com.votogether.global.exception.NotFoundException;
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
    MemberService memberService;

    @Autowired
    ReportActionAlarmRepository reportActionAlarmRepository;

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
    @DisplayName("targetId를 통해 해당 멤버의 Nickname을 가져온다")
    void parseTarget() {
        // given
        Member member = memberRepository.save(MemberFixtures.MALE_30.get());

        // when
        String nickName = reportNicknameStrategy.parseTarget(member.getId());

        // then
        assertThat(nickName).isEqualTo(member.getNickname());
    }

    @Test
    @DisplayName("닉네임에 대한 신고 조치를 한다.")
    void nicknameReportAction() {
        // given
        Member reporter = memberService.register(MemberFixtures.MALE_20.get());
        Member member = memberService.register(MemberFixtures.MALE_30.get());
        String nickname = member.getNickname();

        Report savedReport = reportTestPersister.builder()
                .member(reporter)
                .reportType(ReportType.NICKNAME)
                .reason("reasonA")
                .targetId(member.getId())
                .save();

        ReportAggregateDto reportAggregateDto = new ReportAggregateDto(
                savedReport.getId(),
                savedReport.getReportType(),
                member.getId(),
                savedReport.getReason(),
                savedReport.getCreatedAt()
        );

        // when
        reportNicknameStrategy.reportAction(reportAggregateDto);

        // then
        ReportActionAlarm reportActionAlarm = reportActionAlarmRepository.findAll().get(0);

        assertSoftly(softly -> {
            softly.assertThat(reportActionAlarm.getMember().getId()).isEqualTo(member.getId());
            softly.assertThat(reportActionAlarm.getReportType()).isEqualTo(savedReport.getReportType());
            softly.assertThat(reportActionAlarm.getTarget()).isNotEqualTo(member.getNickname());
            softly.assertThat(reportActionAlarm.getReasons()).isEqualTo(savedReport.getReason());
            softly.assertThat(reportActionAlarm.isChecked()).isFalse();
        });
    }

    @Test
    @DisplayName("회원이 존재하지 않는 경우 예외 발생")
    void nicknameNotExistException() {
        // given
        Member reporter = memberService.register(MemberFixtures.MALE_20.get());
        Member member = memberService.register(MemberFixtures.MALE_30.get());

        Report savedReport = reportTestPersister.builder()
                .member(reporter)
                .reportType(ReportType.NICKNAME)
                .reason("reasonA")
                .targetId(member.getId())
                .save();

        ReportAggregateDto reportAggregateDto = new ReportAggregateDto(
                savedReport.getId(),
                savedReport.getReportType(),
                member.getId() + 1L,
                savedReport.getReason(),
                savedReport.getCreatedAt()
        );

        // when, then
        assertThatThrownBy(() -> reportNicknameStrategy.reportAction(reportAggregateDto))
                .isInstanceOf(NotFoundException.class);
    }

}
