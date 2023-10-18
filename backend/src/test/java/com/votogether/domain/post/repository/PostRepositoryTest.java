package com.votogether.domain.post.repository;

import static org.assertj.core.api.Assertions.assertThat;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.entity.Post;
import com.votogether.test.RepositoryTest;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class PostRepositoryTest extends RepositoryTest {

    @Autowired
    PostRepository postRepository;

    @Nested
    @DisplayName("회원이 작성한 게시글 조회")
    class FindPostsByWriter {

        @Test
        @DisplayName("작성한 게시글이 존재하면 게시글 목록을 조회한다.")
        void findPostsExist() {
            // given
            Member writer = memberTestPersister.builder().save();
            Post postA = postTestPersister.postBuilder().writer(writer).save();
            Post postB = postTestPersister.postBuilder().writer(writer).save();

            // when
            List<Post> result = postRepository.findAllByWriter(writer);

            // then
            assertThat(result).containsExactly(postA, postB);
        }

        @Test
        @DisplayName("작성한 게시글이 존재하지 않으면 빈 목록을 조회한다.")
        void findEmptyNotExist() {
            // given
            Member writer = memberTestPersister.builder().save();

            // when
            List<Post> result = postRepository.findAllByWriter(writer);

            // then
            assertThat(result).isEmpty();
        }

    }

}
