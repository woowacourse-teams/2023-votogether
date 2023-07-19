package com.votogether.domain.vote.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.votogether.domain.member.entity.QMember;
import com.votogether.domain.vote.dto.VoteStatus;
import com.votogether.domain.vote.entity.QVote;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class VoteCustomRepositoryImpl implements VoteCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<VoteStatus> findVoteCountByPostOptionIdGroupByAgeRangeAndGender(final Long postOptionId) {
        final QMember member = QMember.member;
        final QVote vote = QVote.vote;

        return jpaQueryFactory.select(
                        Projections.constructor(
                                VoteStatus.class,
                                member.ageRange,
                                member.gender,
                                member.count()
                        )
                )
                .from(vote)
                .join(vote.member, member)
                .where(vote.postOption.id.eq(postOptionId))
                .groupBy(member.ageRange, member.gender)
                .fetch();
    }

}
