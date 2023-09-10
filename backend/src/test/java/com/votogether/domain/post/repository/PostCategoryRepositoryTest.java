package com.votogether.domain.post.repository;

import static org.assertj.core.api.Assertions.assertThat;

import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostCategory;
import com.votogether.test.RepositoryTest;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class PostCategoryRepositoryTest extends RepositoryTest {

    @Autowired
    PostCategoryRepository postCategoryRepository;

    @Test
    @DisplayName("게시글의 모든 게시글 카테고리 목록을 조회한다.")
    void findAllPostCategoriesInPost() {
        // given
        Post post = postTestPersister.postBuilder().save();
        PostCategory postCategoryA = postTestPersister.postCategoryBuilder().post(post).save();
        PostCategory postCategoryB = postTestPersister.postCategoryBuilder().post(post).save();

        // when
        List<PostCategory> result = postCategoryRepository.findAllByPost(post);

        // then
        assertThat(result).containsExactly(postCategoryA, postCategoryB);
    }

    @Test
    @DisplayName("게시글의 모든 게시글 카테고리를 삭제한다.")
    void deleteAllWithPostIdInBatch() {
        // given
        Post post = postTestPersister.postBuilder().save();
        postTestPersister.postCategoryBuilder().post(post).save();
        postTestPersister.postCategoryBuilder().post(post).save();

        // when
        postCategoryRepository.deleteAllWithPostIdInBatch(post.getId());

        // then
        assertThat(postCategoryRepository.findAll()).isEmpty();
    }

}
