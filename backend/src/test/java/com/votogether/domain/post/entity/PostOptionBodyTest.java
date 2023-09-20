package com.votogether.domain.post.entity;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.votogether.global.exception.BadRequestException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.NullAndEmptySource;

class PostOptionBodyTest {

    @Nested
    @DisplayName("게시글 옵션 본문 생성")
    class PostOptionBodyCreate {

        @Test
        @DisplayName("게시글 옵션 본문이 정상적이라면 게시글 옵션 본문을 생성한다.")
        void success() {
            // given
            String content = "votogether";

            // when
            PostOptionBody postOptionBody = new PostOptionBody(content);

            // then
            assertThat(postOptionBody.getContent()).isEqualTo(content);
        }

        @ParameterizedTest
        @NullAndEmptySource
        @DisplayName("게시글 옵션 본문이 존재하지 않거나 공백이라면 예외를 던진다.")
        void emptyContent(String content) {
            // given, when, then
            assertThatThrownBy(() -> new PostOptionBody(content))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("게시글 옵션 내용은 비어있거나 공백일 수 없습니다.");
        }

        @Test
        @DisplayName("게시글 옵션 본문 길이가 유효하지 않으면 예외를 던진다.")
        void invalidContentLength() {
            // given
            String content = "a".repeat(51);

            // when, then
            assertThatThrownBy(() -> new PostOptionBody(content))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("게시글 옵션 내용 길이가 유효하지 않습니다.");
        }

    }

}
