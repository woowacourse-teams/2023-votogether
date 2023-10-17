package com.votogether.domain.report.repository;

import static com.votogether.domain.report.entity.QReport.report;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.votogether.domain.report.dto.ReportAggregateDto;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class ReportCustomRepositoryImpl implements ReportCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<ReportAggregateDto> findReportsGroupedByReportTypeAndTargetId(final Pageable pageable) {
        return jpaQueryFactory.select(
                        Projections.constructor(
                                ReportAggregateDto.class,
                                report.id.max(),
                                report.reportType,
                                report.targetId,
                                Expressions.stringTemplate("group_concat({0})", report.reason),
                                report.createdAt.max()
                        )
                )
                .from(report)
                .orderBy(report.id.max().desc())
                .groupBy(report.reportType, report.targetId)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
    }

}
