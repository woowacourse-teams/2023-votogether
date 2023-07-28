package com.votogether.domain.post.repository;

import com.votogether.domain.post.entity.comment.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
