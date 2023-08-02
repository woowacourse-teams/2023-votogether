package com.votogether.domain.post.repository;

import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.comment.Comment;
import java.util.List;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    @EntityGraph(attributePaths = {"member"})
    List<Comment> findAllByPostOrderByCreatedAtAsc(final Post post);

}
