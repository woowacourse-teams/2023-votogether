package com.votogether.domain.report.repository;

import com.votogether.domain.report.entity.Report;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface ReportCustomRepository {

    List<Report> findReportsGroupedByMemberAndReportTypeAndTargetId(final Pageable pageable);

}
