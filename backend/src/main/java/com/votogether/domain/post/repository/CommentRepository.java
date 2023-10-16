package com.votogether.domain.post.repository;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.comment.Comment;
import java.util.List;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    @EntityGraph(attributePaths = {"writer"})
    List<Comment> findAllByPostAndIsHiddenFalseOrderByIdAsc(final Post post);

    List<Comment> findAllByWriter(final Member writer);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query("delete from Comment c where c.post.id = :postId")
    void deleteAllWithPostIdInBatch(@Param("postId") final Long postId);

}
