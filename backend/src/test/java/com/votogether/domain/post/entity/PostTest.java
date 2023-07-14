package com.votogether.domain.post.entity;

import static org.assertj.core.api.Assertions.assertThat;

import com.votogether.domain.member.entity.Gender;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.SocialType;
import java.time.LocalDateTime;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class PostTest {

    @Test
    @DisplayName("게시글의 작성자 여부를 확인한다.")
    void isWriter() {
        // given
        Member member = Member.builder()
                .gender(Gender.MALE)
                .point(0)
                .socialType(SocialType.GOOGLE)
                .nickname("user1")
                .socialId("kakao@gmail.com")
                .birthDate(
                        LocalDateTime.of(1995, 07, 12, 00, 00))
                .build();

        Post post = Post.builder()
                .member(member)
                .build();

        // when
        boolean result = post.isWriter(member);

        // then
        assertThat(result).isTrue();
    }

    @Test
    @DisplayName("게시글의 마감 여부를 확인한다.")
    void isClosed() {
        // given
        Post post = Post.builder()
                .deadline(
                        LocalDateTime.of(2022, 01, 01, 0, 0))
                .build();

        // when
        boolean result = post.isClosed();

        // then
        assertThat(result).isTrue();
    }

}
