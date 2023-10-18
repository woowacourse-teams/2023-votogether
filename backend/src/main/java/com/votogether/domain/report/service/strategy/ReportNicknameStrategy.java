package com.votogether.domain.report.service.strategy;

import com.votogether.domain.alarm.entity.ReportActionAlarm;
import com.votogether.domain.alarm.repository.ReportActionAlarmRepository;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.exception.MemberExceptionType;
import com.votogether.domain.member.repository.MemberRepository;
import com.votogether.domain.report.dto.ReportAggregateDto;
import com.votogether.domain.report.dto.request.ReportRequest;
import com.votogether.domain.report.exception.ReportExceptionType;
import com.votogether.domain.report.repository.ReportRepository;
import com.votogether.global.exception.BadRequestException;
import com.votogether.global.exception.NotFoundException;
import java.util.Objects;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class ReportNicknameStrategy implements ReportStrategy {

    private final MemberRepository memberRepository;
    private final ReportRepository reportRepository;
    private final ReportActionAlarmRepository reportActionAlarmRepository;

    @Override
    public void report(final Member reporter, final ReportRequest request) {
        validateMemberExistence(request);
        validateNickname(reporter, request);
        saveReport(reporter, request, reportRepository);
    }

    private void validateMemberExistence(final ReportRequest request) {
        final Optional<Member> memberById = memberRepository.findById(request.id());
        if (memberById.isEmpty()) {
            throw new NotFoundException(MemberExceptionType.NON_EXISTENT_MEMBER);
        }
    }

    private void validateNickname(final Member reporter, final ReportRequest request) {
        validateMyNickname(reporter, request);
        validateDuplicatedReport(
                reporter,
                request,
                ReportExceptionType.DUPLICATE_NICKNAME_REPORT,
                reportRepository
        );
    }

    private void validateMyNickname(final Member reporter, final ReportRequest request) {
        if (Objects.equals(reporter.getId(), request.id())) {
            throw new BadRequestException(ReportExceptionType.REPORT_MY_NICKNAME);
        }
    }

    @Override
    public String parseTarget(final Long targetId) {
        final Member reportedMember = memberRepository.findById(targetId)
                .orElseThrow(() -> new NotFoundException(MemberExceptionType.NON_EXISTENT_MEMBER));
        return reportedMember.getNickname();
    }

    @Override
    public void reportAction(final ReportAggregateDto reportAggregateDto) {
        final Member reportedMember = memberRepository.findById(reportAggregateDto.targetId())
                .orElseThrow(() -> new NotFoundException(MemberExceptionType.NON_EXISTENT_MEMBER));

        final ReportActionAlarm reportActionAlarm = ReportActionAlarm.builder()
                .member(reportedMember)
                .reportType(reportAggregateDto.reportType())
                .target(reportedMember.getNickname())
                .reasons(reportAggregateDto.reasons())
                .isChecked(false)
                .build();

        reportActionAlarmRepository.save(reportActionAlarm);
        reportedMember.changeNicknameByReport();
    }

}
