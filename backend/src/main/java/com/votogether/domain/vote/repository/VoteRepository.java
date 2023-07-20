package com.votogether.domain.vote.repository;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.entity.PostOption;
import com.votogether.domain.vote.dto.VoteStatus;
import com.votogether.domain.vote.entity.Vote;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface VoteRepository extends JpaRepository<Vote, Long> {

    @Query("SELECT new com.votogether.domain.vote.dto.VoteStatus(m.ageRange, m.gender, COUNT(v))" +
            " FROM Vote v" +
            " JOIN v.member m" +
            " WHERE v.postOption.id = :postOptionId" +
            " GROUP BY m.ageRange, m.gender"
    )
    List<VoteStatus> findVoteCountByPostOptionIdGroupByAgeRangeAndGender(@Param("postOptionId") Long postOptionId);

    Optional<Vote> findByMemberAndPostOption(final Member member, final PostOption postOption);

    List<Vote> findByMemberAndPostOptionIn(final Member member, final List<PostOption> postOptions);

}
