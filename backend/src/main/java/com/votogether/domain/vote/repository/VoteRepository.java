package com.votogether.domain.vote.repository;

import com.votogether.domain.vote.entity.Vote;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VoteRepository extends JpaRepository<Vote, Long> {

    Optional<Vote> findByMemberIdAndPostOptionId(final Long memberId, final Long postOptionId);

    List<Vote> findByMemberIdAndPostOptionIdIn(final Long memberId, final List<Long> postOptionIds);

}
