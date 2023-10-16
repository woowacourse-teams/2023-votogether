package com.votogether.domain.report.service;

import com.votogether.domain.report.dto.response.ReportsPageResponse;
import com.votogether.domain.report.entity.Report;
import com.votogether.domain.report.repository.ReportRepository;
import com.votogether.domain.report.service.strategy.ReportActionProvider;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class ReportQueryService {

    private static final int BASIC_PAGE_SIZE = 20;

    private final ReportRepository reportRepository;
    private final ReportActionProvider reportActionProvider;

    public ReportsPageResponse getReports(final int page) {
        final Pageable pageable = PageRequest.of(page, BASIC_PAGE_SIZE);
        final List<Report> reports = reportRepository.findReportsGroupedByMemberAndReportTypeAndTargetId(pageable);
        final int totalPageNumber = reportRepository.findAll(pageable).getTotalPages();

        final List<String> targets = reports.stream()
                .map(report ->
                        reportActionProvider.getStrategy(report.getReportType())
                                .parseTarget(report.getTargetId())
                )
                .toList();
        return ReportsPageResponse.of(totalPageNumber, page + 1, reports, targets);
    }

}

