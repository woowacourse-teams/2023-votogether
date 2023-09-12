package com.votogether.domain.post.repository;

import com.votogether.domain.post.entity.PostCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostCategoryRepository extends JpaRepository<PostCategory, Long> {
}
