package com.votogether.domain.post.repository;

import com.votogether.domain.post.entity.Post;
import java.time.LocalDateTime;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {

    Slice<Post> findByDeadlineBefore(LocalDateTime currentTime, Pageable pageable);
    Slice<Post> findByDeadlineAfter(LocalDateTime currentTime, Pageable pageable);

}
