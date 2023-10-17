package com.votogether.domain.report.repository;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.report.entity.Report;
import com.votogether.domain.report.entity.vo.ReportType;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReportRepository extends JpaRepository<Report, Long>, ReportCustomRepository {

    int countByReportTypeAndTargetId(final ReportType reportType, final Long targetId);

    Optional<Report> findByMemberAndReportTypeAndTargetId(
            final Member member,
            final ReportType reportType,
            final Long targetId
    );

    List<Report> findAllByMember(final Member member);

    List<Report> findAllByReportTypeAndTargetId(final ReportType reportType, final Long targetId);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query("delete from Report r where r.reportType = :reportType and r.targetId = :targetId")
    void deleteAllWithReportTypeAndTargetIdInBatch(
            @Param("reportType") final ReportType reportType,
            @Param("targetId") final Long targetId
    );

}
