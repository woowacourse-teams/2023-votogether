package com.votogether.domain.vote.repository;

import com.votogether.domain.vote.entity.Vote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VoteRepository extends JpaRepository<Vote, Long> {

    Vote findByMemberIdAndPostOptionId(final Long memberId, final Long postOptionId);

}
