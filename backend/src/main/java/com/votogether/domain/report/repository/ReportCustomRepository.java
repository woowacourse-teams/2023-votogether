package com.votogether.domain.report.repository;

import com.votogether.domain.report.dto.ReportAggregateDto;
import com.votogether.domain.report.entity.vo.ReportType;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Pageable;

public interface ReportCustomRepository {

    List<ReportAggregateDto> findReportAggregateDtosByReportTypeAndTargetId(final Pageable pageable);

    Optional<ReportAggregateDto> findReportAggregateDtoByReportTypeAndTargetId(
            final ReportType reportType,
            final Long targetId
    );

}
