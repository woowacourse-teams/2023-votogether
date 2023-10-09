package com.votogether.domain.vote.entity;

import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostOption;
import com.votogether.global.exception.BadRequestException;
import java.time.LocalDateTime;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

class VoteTest {

    @Test
    @DisplayName("게시글 작성자가 투표를 하면 예외가 발생한다.")
    void voteException() {
        // given
        Member writer = Member.builder().nickname("글쓴이").build();
        ReflectionTestUtils.setField(writer, "id", 1L);
        Post post = Post.builder().title("제목").content("내용").deadline(LocalDateTime.now()).writer(writer).build();
        PostOption postOption = PostOption.builder().post(post).content("내용").build();

        // when, then
        assertThatThrownBy(() -> Vote.builder().member(writer).postOption(postOption).build())
                .isInstanceOf(BadRequestException.class)
                .hasMessage("게시글 작성자는 투표할 수 없습니다.");
    }

}
