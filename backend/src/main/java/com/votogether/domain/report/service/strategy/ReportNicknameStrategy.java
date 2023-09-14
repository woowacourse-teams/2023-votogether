package com.votogether.domain.report.service.strategy;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.exception.MemberExceptionType;
import com.votogether.domain.member.repository.MemberRepository;
import com.votogether.domain.report.dto.request.ReportRequest;
import com.votogether.domain.report.entity.vo.ReportType;
import com.votogether.domain.report.exception.ReportExceptionType;
import com.votogether.domain.report.repository.ReportRepository;
import com.votogether.global.exception.BadRequestException;
import com.votogether.global.exception.NotFoundException;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class ReportNicknameStrategy implements ReportStrategy {

    private final MemberRepository memberRepository;
    private final ReportRepository reportRepository;

    @Override
    public void report(
            final Member reporter,
            final ReportRequest request
    ) {
        final Member reportedMember = memberRepository.findById(request.id())
                .orElseThrow(() -> new NotFoundException(MemberExceptionType.NONEXISTENT_MEMBER));
        validateNickname(reporter, request);

        saveReport(reporter, request, reportRepository);
        changeNicknameByReport(reportedMember, request);
    }

    private void validateNickname(
            final Member reporter,
            final ReportRequest request
    ) {
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

    private void changeNicknameByReport(final Member reportedMember, final ReportRequest request) {
        final int reportCount = reportRepository.countByReportTypeAndTargetId(request.type(), reportedMember.getId());
        if (reportCount >= NUMBER_OF_NICKNAME_CHANGE_REPORTS) {
            reportedMember.changeNicknameByReport();
            reportRepository.deleteByReportTypeAndTargetId(ReportType.NICKNAME, request.id());
        }
    }
}
