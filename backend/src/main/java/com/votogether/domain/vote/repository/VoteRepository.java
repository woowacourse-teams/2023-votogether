package com.votogether.domain.vote.repository;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostOption;
import com.votogether.domain.vote.entity.Vote;
import com.votogether.domain.vote.repository.dto.VoteCountByAgeGroupAndGenderInterface;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface VoteRepository extends JpaRepository<Vote, Long> {

    @Query(
            nativeQuery = true,
            value = "select" +
                    " case" +
                    " when YEAR(CURRENT_DATE) - m.birth_year < 10 then 0" +
                    " when YEAR(CURRENT_DATE) - m.birth_year < 20 then 1" +
                    " when YEAR(CURRENT_DATE) - m.birth_year < 30 then 2" +
                    " when YEAR(CURRENT_DATE) - m.birth_year < 40 then 3" +
                    " when YEAR(CURRENT_DATE) - m.birth_year < 50 then 4" +
                    " when YEAR(CURRENT_DATE) - m.birth_year < 60 then 5" +
                    " else 6 end as ageGroup," +
                    " m.gender as gender," +
                    " count(m.id) as voteCount" +
                    " from vote as v" +
                    " left join member as m on v.member_id = m.id" +
                    " left join post_option as p on v.post_option_id = p.id" +
                    " where p.post_id = :post_id" +
                    " group by" +
                    " ageGroup, m.gender" +
                    " order by" +
                    " ageGroup, m.gender desc"
    )
    List<VoteCountByAgeGroupAndGenderInterface> findPostVoteCountByAgeGroupAndGender(
            @Param("post_id") final Long postId
    );

    @Query(
            nativeQuery = true,
            value = "select" +
                    " case" +
                    " when YEAR(CURRENT_DATE) - m.birth_year < 10 then 0" +
                    " when YEAR(CURRENT_DATE) - m.birth_year < 20 then 1" +
                    " when YEAR(CURRENT_DATE) - m.birth_year < 30 then 2" +
                    " when YEAR(CURRENT_DATE) - m.birth_year < 40 then 3" +
                    " when YEAR(CURRENT_DATE) - m.birth_year < 50 then 4" +
                    " when YEAR(CURRENT_DATE) - m.birth_year < 60 then 5" +
                    " else 6 end as ageGroup," +
                    " m.gender as gender," +
                    " count(m.id) as voteCount" +
                    " from vote as v" +
                    " left join member as m on v.member_id = m.id" +
                    " where v.post_option_id = :post_option_id" +
                    " group by" +
                    " ageGroup, m.gender" +
                    " order by" +
                    " ageGroup, m.gender desc"
    )
    List<VoteCountByAgeGroupAndGenderInterface> findPostOptionVoteCountByAgeGroupAndGender(
            @Param("post_option_id") final Long postOptionId
    );

    Optional<Vote> findByMemberAndPostOptionPost(final Member member, final Post post);

    Optional<Vote> findByMemberAndPostOption(final Member member, final PostOption postOption);

    List<Vote> findAllByMemberAndPostOptionIn(final Member member, final List<PostOption> postOptions);

    List<Vote> findAllByMember(final Member member);

    int countByMember(final Member member);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query("delete from Vote v where v.postOption.id in :postOptionIds")
    void deleteAllWithPostOptionIdsInBatch(@Param("postOptionIds") final List<Long> postOptionIds);

}
