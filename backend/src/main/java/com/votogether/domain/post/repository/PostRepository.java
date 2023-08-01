package com.votogether.domain.post.repository;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.entity.Post;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {

    Slice<Post> findByDeadlineBefore(final LocalDateTime currentTime, final Pageable pageable);

    Slice<Post> findByDeadlineAfter(final LocalDateTime currentTime, final Pageable pageable);

    int countByWriter(final Member member);

    List<Post> findAllByWriter(final Member member);

}
