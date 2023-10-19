package com.votogether.domain.member.repository;

import static com.votogether.domain.member.entity.QMember.member;
import static com.votogether.domain.member.entity.QMemberMetric.memberMetric;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.votogether.domain.member.entity.MemberMetric;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class MemberMetricCustomRepositoryImpl implements MemberMetricCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<MemberMetric> getTop10MemberMetrics() {
        return jpaQueryFactory.selectFrom(memberMetric)
                .innerJoin(memberMetric.member, member).fetchJoin()
                .orderBy(memberMetric.score.desc())
                .offset(0)
                .limit(10)
                .fetch();
    }

}
