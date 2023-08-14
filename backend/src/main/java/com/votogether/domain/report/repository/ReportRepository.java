package com.votogether.domain.report.repository;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.report.entity.Report;
import com.votogether.domain.report.entity.vo.ReportType;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<Report, Long> {

    int countByReportTypeAndTargetId(final ReportType reportType, final Long targetId);

    Optional<Report> findByMemberAndReportTypeAndTargetId(
            final Member member,
            final ReportType reportType,
            final Long targetId
    );

}
