package com.votogether.domain.vote.entity;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostOption;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class VoteTest {

    @Test
    @DisplayName("투표선택지의 값을 변경 할 수 있다.")
    void changePostOption() {
        // given
        Post post = Post.builder().build();
        PostOption postOption1 = PostOption.builder()
                .post(post)
                .build();
        PostOption postOption2 = PostOption.builder()
                .post(post)
                .build();
        Vote vote = Vote.builder()
                .postOption(postOption1)
                .build();

        // when
        vote.changePostOption(postOption2);

        // then
        assertThat(vote.getPostOption()).isEqualTo(postOption2);
    }

    @Test
    @DisplayName("다른 게시글의 투표선택지로 값을 변경 하는 경우 에러가 발생한다.")
    void changePostOption1() {
        // given
        Post post1 = Post.builder().build();
        Post post2 = Post.builder().build();
        PostOption postOption1 = PostOption.builder()
                .post(post1)
                .build();
        PostOption postOption2 = PostOption.builder()
                .post(post2)
                .build();
        Vote vote = Vote.builder()
                .postOption(postOption1)
                .build();

        // when & then
        assertThatThrownBy(() -> vote.changePostOption(postOption2))
                .isInstanceOf(IllegalArgumentException.class);
    }

}
