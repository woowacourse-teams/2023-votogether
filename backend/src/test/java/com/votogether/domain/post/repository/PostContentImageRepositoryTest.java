package com.votogether.domain.post.repository;

import static org.assertj.core.api.Assertions.assertThat;

import com.votogether.domain.post.entity.Post;
import com.votogether.test.RepositoryTest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class PostContentImageRepositoryTest extends RepositoryTest {

    @Autowired
    PostContentImageRepository postContentImageRepository;

    @Test
    @DisplayName("게시글의 모든 게시글 이미지를 삭제한다.")
    void deleteAllWithPostIdInBatch() {
        // given
        Post post = postTestPersister.postBuilder().save();
        postTestPersister.postContentImageBuilder().post(post).save();
        postTestPersister.postContentImageBuilder().post(post).save();

        // when
        postContentImageRepository.deleteAllWithPostIdInBatch(post.getId());

        // when
        assertThat(postContentImageRepository.findAll()).isEmpty();
    }

}
