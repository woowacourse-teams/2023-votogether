package com.votogether.domain.report.service;

import com.votogether.domain.report.dto.ReportAggregateDto;
import com.votogether.domain.report.dto.response.ReportResponse;
import com.votogether.domain.report.dto.response.ReportPageResponse;
import com.votogether.domain.report.entity.Report;
import com.votogether.domain.report.repository.ReportRepository;
import com.votogether.domain.report.service.strategy.ReportActionProvider;
import java.util.List;
import java.util.stream.IntStream;
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

    public ReportPageResponse getReports(final int page) {
        long totalCount = reportRepository.count();
        final int totalPageNumber = (int) Math.ceil((double) totalCount / BASIC_PAGE_SIZE);

        final Pageable pageable = PageRequest.of(page, BASIC_PAGE_SIZE);
        final List<ReportAggregateDto> reports = reportRepository.findReportsGroupedByMemberAndReportTypeAndTargetId(pageable);
        final List<ReportResponse> reportResponses = parseReportResponses(reports);

        return ReportPageResponse.of(totalPageNumber, page, reportResponses);
    }

    private List<ReportResponse> parseReportResponses(final List<ReportAggregateDto> reports) {
        final List<String> targets = parseTargets(reports);
        return IntStream.range(0, reports.size())
                .mapToObj(index -> ReportResponse.of(reports.get(index), targets.get(index)))
                .toList();
    }

    private List<String> parseTargets(final List<ReportAggregateDto> reportAggregateDtos) {
        return reportAggregateDtos.stream()
                .map(this::parseTarget)
                .toList();
    }

    private String parseTarget(final ReportAggregateDto reportAggregateDto) {
        return reportActionProvider.getStrategy(reportAggregateDto.reportType())
                .parseTarget(reportAggregateDto.targetId());
    }

}

