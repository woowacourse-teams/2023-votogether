package com.votogether.domain.post.repository;

import com.votogether.domain.post.entity.PostOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PostOptionRepository extends JpaRepository<PostOption, Long> {

    @Modifying(clearAutomatically = true)
    @Query("delete from PostOption p where p.post.id = :postId")
    void deleteAllWithPostIdInBatch(@Param("postId") final Long postId);

}
