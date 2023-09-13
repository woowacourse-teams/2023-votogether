package com.votogether.domain.post.repository;

import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostCategory;
import java.util.List;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PostCategoryRepository extends JpaRepository<PostCategory, Long> {

    @EntityGraph(attributePaths = {"category"})
    List<PostCategory> findAllByPost(final Post post);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query("delete from PostCategory p where p.post.id = :postId")
    void deleteAllWithPostIdInBatch(@Param("postId") final Long postId);

}
