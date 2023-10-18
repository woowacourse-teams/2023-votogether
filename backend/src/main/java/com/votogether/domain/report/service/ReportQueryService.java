package com.votogether.domain.report.service;

import com.votogether.domain.report.dto.ReportAggregateDto;
import com.votogether.domain.report.dto.response.ReportPageResponse;
import com.votogether.domain.report.dto.response.ReportResponse;
import com.votogether.domain.report.repository.ReportRepository;
import com.votogether.domain.report.service.strategy.ReportActionProvider;
import com.votogether.domain.report.service.strategy.ReportStrategy;
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

    public ReportPageResponse getReports(final int page) {
        final long totalCount = reportRepository.count();
        final int totalPageNumber = (int) Math.ceil((double) totalCount / BASIC_PAGE_SIZE);

        final Pageable pageable = PageRequest.of(page, BASIC_PAGE_SIZE);
        final List<ReportAggregateDto> reportAggregateDtos = reportRepository
                .findReportAggregateDtosByReportTypeAndTargetId(pageable);
        final List<ReportResponse> reportResponses = parseReportResponses(reportAggregateDtos);

        return ReportPageResponse.of(totalPageNumber, page, reportResponses);
    }

    private List<ReportResponse> parseReportResponses(final List<ReportAggregateDto> reportAggregateDtos) {
        return reportAggregateDtos.stream()
                .map(this::parseReportResponse)
                .toList();
    }

    private ReportResponse parseReportResponse(final ReportAggregateDto reportAggregateDto) {
        final ReportStrategy strategy = reportActionProvider.getStrategy(reportAggregateDto.reportType());
        return ReportResponse.of(reportAggregateDto, strategy.parseTarget(reportAggregateDto.targetId()));
    }

}

