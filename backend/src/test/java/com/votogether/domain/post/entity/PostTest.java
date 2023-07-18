package com.votogether.domain.post.entity;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

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
        Member member1 = Member.builder()
                .gender(Gender.MALE)
                .point(0)
                .socialType(SocialType.GOOGLE)
                .nickname("user1")
                .socialId("kakao@gmail.com")
                .birthDate(
                        LocalDateTime.of(1995, 07, 12, 00, 00))
                .build();

        Member member2 = Member.builder()
                .nickname("s")
                .build();

        Post post = Post.builder()
                .member(member1)
                .build();

        // when
        boolean result1 = post.isWriter(member1);
        boolean result2 = post.isWriter(member2);

        // then
        assertAll(
                () -> assertThat(result1).isTrue(),
                () -> assertThat(result2).isFalse()
        );
    }

    @Test
    @DisplayName("게시글의 마감 여부를 확인한다.")
    void isClosed() {
        // given
        Post post1 = Post.builder()
                .deadline(
                        LocalDateTime.of(2022, 01, 01, 0, 0))
                .build();

        Post post2 = Post.builder()
                .deadline(
                        LocalDateTime.of(3222, 01, 01, 0, 0))
                .build();

        // when
        boolean result1 = post1.isClosed();
        boolean result2 = post2.isClosed();

        // then
        assertAll(
                () -> assertThat(result1).isTrue(),
                () -> assertThat(result2).isFalse()
        );
    }

}
