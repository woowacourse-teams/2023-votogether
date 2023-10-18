package com.votogether.domain.report.service.strategy;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.report.dto.ReportAggregateDto;
import com.votogether.domain.report.dto.request.ReportRequest;
import com.votogether.domain.report.entity.Report;
import com.votogether.domain.report.exception.ReportExceptionType;
import com.votogether.domain.report.repository.ReportRepository;
import com.votogether.global.exception.BadRequestException;

public interface ReportStrategy {

    void report(final Member reporter, final ReportRequest request);

    String parseTarget(final Long targetId);

    void reportAction(final ReportAggregateDto reportAggregateDto);

    default void validateDuplicatedReport(
            final Member reporter,
            final ReportRequest request,
            final ReportExceptionType reportExceptionType,
            final ReportRepository reportRepository
    ) {
        reportRepository.findByMemberAndReportTypeAndTargetId(reporter, request.type(), request.id())
                .ifPresent(report -> {
                    throw new BadRequestException(reportExceptionType);
                });
    }

    default void saveReport(
            final Member reporter,
            final ReportRequest request,
            final ReportRepository reportRepository
    ) {
        final Report report = Report.builder()
                .member(reporter)
                .reportType(request.type())
                .targetId(request.id())
                .reason(request.reason())
                .build();
        reportRepository.save(report);
    }

}
