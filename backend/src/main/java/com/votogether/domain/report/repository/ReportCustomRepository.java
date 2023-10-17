package com.votogether.domain.report.repository;

import com.votogether.domain.report.dto.ReportAggregateDto;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface ReportCustomRepository {

    List<ReportAggregateDto> findReportsGroupedByReportTypeAndTargetId(final Pageable pageable);

}
