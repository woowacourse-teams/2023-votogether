package com.votogether.domain.post.repository;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.entity.Post;
import java.time.LocalDateTime;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PostRepository extends JpaRepository<Post, Long> {

    Slice<Post> findByDeadlineBefore(final LocalDateTime currentTime, final Pageable pageable);

    Slice<Post> findByDeadlineAfter(final LocalDateTime currentTime, final Pageable pageable);

    int countByWriter(final Member member);

    @Query("SELECT v.postOption.post FROM Vote v WHERE v.member = :member "
            + "AND v.postOption.post.deadline < CURRENT_TIMESTAMP")
    Slice<Post> findClosedPostsVotedByMember(@Param("member") final Member member, final Pageable pageable);

    @Query("SELECT v.postOption.post FROM Vote v WHERE v.member = :member "
            + "AND v.postOption.post.deadline > CURRENT_TIMESTAMP")
    Slice<Post> findOpenPostsVotedByMember(@Param("member") final Member member, final Pageable pageable);

    @Query("SELECT v.postOption.post FROM Vote v WHERE v.member = :member ")
    Slice<Post> findPostsVotedByMember(@Param("member") final Member member, final Pageable pageable);

}
