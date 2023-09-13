package com.votogether.domain.post.repository;

import com.votogether.domain.post.entity.PostContentImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PostContentImageRepository extends JpaRepository<PostContentImage, Long> {

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query("delete from PostContentImage p where p.post.id = :postId")
    void deleteAllWithPostIdInBatch(@Param("postId") final Long postId);

}
