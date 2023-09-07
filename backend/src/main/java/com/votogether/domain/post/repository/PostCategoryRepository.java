package com.votogether.domain.post.repository;

import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostCategory;
import java.util.List;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostCategoryRepository extends JpaRepository<PostCategory, Long> {

    @EntityGraph(attributePaths = {"category"})
    List<PostCategory> findAllByPost(final Post post);

}
