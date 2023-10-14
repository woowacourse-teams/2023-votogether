package com.votogether.domain.post.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

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

    @Test
    @DisplayName("모든 유저의 작성한 게시글 수를 가져온다.")
    void findCountsByMembers() {
        // given
        Member member = memberTestPersister.builder().save();
        Member member1 = memberTestPersister.builder().save();
        Member member2 = memberTestPersister.builder().save();

        postTestPersister.postBuilder().writer(member).save();
        postTestPersister.postBuilder().writer(member1).save();
        postTestPersister.postBuilder().writer(member1).save();

        // when
        List<Integer> postCounts = postRepository.findCountsByMembers(List.of(member, member1, member2));

        // then
        assertAll(
                () -> assertThat(postCounts).hasSize(3),
                () -> assertThat(postCounts.get(0)).isEqualTo(1),
                () -> assertThat(postCounts.get(1)).isEqualTo(2),
                () -> assertThat(postCounts.get(2)).isEqualTo(0)
        );
    }

}
