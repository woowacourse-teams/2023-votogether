package com.votogether.domain.report.repository;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.report.entity.Report;
import com.votogether.domain.report.entity.ReportType;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<Report, Long> {

    int countByReportTypeAndTargetId(final ReportType reportType, final Long targetId);

    Optional<Report> findByMemberAndReportTypeAndTargetId(
            final Member member,
            final ReportType reportType,
            final Long targetId
    );

    List<Report> findAllByMember(final Member member);

    List<Report> findAllByReportTypeAndTargetId(final ReportType reportType, final Long targetId);

}
