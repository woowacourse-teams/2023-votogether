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

    @Query("SELECT new com.votogether.domain.vote.dto.VoteStatus(m.birthYear, m.gender, COUNT(v))" +
            " FROM Vote v" +
            " JOIN v.member m" +
            " JOIN v.postOption p" +
            " WHERE p.post.id = :postId" +
            " GROUP BY m.birthYear, m.gender" +
            " ORDER BY m.birthYear DESC"
    )
    List<VoteStatus> findVoteCountByPostIdGroupByAgeRangeAndGender(@Param("postId") final Long postId);

    @Query("SELECT new com.votogether.domain.vote.dto.VoteStatus(m.birthYear, m.gender, COUNT(v))" +
            " FROM Vote v" +
            " JOIN v.member m" +
            " WHERE v.postOption.id = :postOptionId" +
            " GROUP BY m.birthYear, m.gender" +
            " ORDER BY m.birthYear DESC"
    )
    List<VoteStatus> findVoteCountByPostOptionIdGroupByAgeRangeAndGender(
            @Param("postOptionId") final Long postOptionId
    );

    Optional<Vote> findByMemberAndPostOption(final Member member, final PostOption postOption);

    List<Vote> findAllByMemberAndPostOptionIn(final Member member, final List<PostOption> postOptions);

    int countByMember(final Member member);

    List<Vote> findAllByMember(final Member member);

}
