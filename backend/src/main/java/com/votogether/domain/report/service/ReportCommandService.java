package com.votogether.domain.report.service;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.report.dto.ReportAggregateDto;
import com.votogether.domain.report.dto.request.ReportActionRequest;
import com.votogether.domain.report.dto.request.ReportRequest;
import com.votogether.domain.report.entity.Report;
import com.votogether.domain.report.exception.ReportExceptionType;
import com.votogether.domain.report.repository.ReportRepository;
import com.votogether.domain.report.service.strategy.ReportActionProvider;
import com.votogether.domain.report.service.strategy.ReportStrategy;
import com.votogether.global.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class ReportCommandService {

    private final ReportActionProvider reportActionProvider;
    private final ReportRepository reportRepository;

    public void report(final Member reporter, final ReportRequest request) {
        final ReportStrategy reportStrategy = reportActionProvider.getStrategy(request.type());
        reportStrategy.report(reporter, request);
    }

    public void reportAction(final ReportActionRequest request) {
        final Report report = reportRepository.findById(request.id())
                .orElseThrow(() -> new NotFoundException(ReportExceptionType.NOT_FOUND));

        final ReportAggregateDto reportAggregateDto = reportRepository
                .findReportAggregateDtoByReportTypeAndTargetId(report.getReportType(), report.getTargetId())
                .orElseThrow(() -> new NotFoundException(ReportExceptionType.NOT_FOUND_REPORT_AGGREGATE));

        reportRepository.deleteAllWithReportTypeAndTargetIdInBatch(report.getReportType(), report.getTargetId());

        if (!request.hasAction()) {
            return;
        }

        final ReportStrategy strategy = reportActionProvider.getStrategy(reportAggregateDto.reportType());
        strategy.reportAction(reportAggregateDto);
    }

}
