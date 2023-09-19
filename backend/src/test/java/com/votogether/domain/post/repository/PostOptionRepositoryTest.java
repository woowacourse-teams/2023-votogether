package com.votogether.domain.post.repository;

import static org.assertj.core.api.Assertions.assertThat;

import com.votogether.domain.post.entity.Post;
import com.votogether.test.RepositoryTest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class PostOptionRepositoryTest extends RepositoryTest {

    @Autowired
    PostOptionRepository postOptionRepository;

    @Test
    @DisplayName("게시글의 모든 게시글 옵션을 삭제한다.")
    void deleteAllWithPostIdInBatch() {
        // given
        Post post = postTestPersister.postBuilder().save();
        postTestPersister.postOptionBuilder().post(post).sequence(1).save();
        postTestPersister.postOptionBuilder().post(post).sequence(2).save();

        // when
        postOptionRepository.deleteAllWithPostIdInBatch(post.getId());

        // then
        assertThat(postOptionRepository.findAll()).isEmpty();
    }

}
