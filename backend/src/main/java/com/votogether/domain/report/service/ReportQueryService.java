package com.votogether.domain.report.service;

import com.votogether.domain.report.dto.response.ReportsResponse;
import com.votogether.domain.report.entity.Report;
import com.votogether.domain.report.entity.vo.ReportType;
import com.votogether.domain.report.repository.ReportRepository;
import com.votogether.domain.report.service.strategy.ReportActionProvider;
import com.votogether.domain.report.service.strategy.ReportCommentStrategy;
import com.votogether.domain.report.service.strategy.ReportNicknameStrategy;
import com.votogether.domain.report.service.strategy.ReportPostStrategy;
import com.votogether.domain.report.service.strategy.ReportStrategy;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;
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

    public ReportsResponse getReports(final int page) {
        final Pageable pageable = PageRequest.of(page, BASIC_PAGE_SIZE);
        final List<Report> reports = reportRepository.findReportsGroupedByMemberAndReportTypeAndTargetId(pageable);
        final int totalPages = reportRepository.findAll(pageable).getTotalPages();

        final List<String> targets = reports.stream()
                .map(report ->
                        reportActionProvider.getStrategy(report.getReportType())
                                .parseTarget(report.getTargetId())
                )
                .toList();
        return ReportsResponse.of(totalPages, page + 1, reports, targets);
    }

}

