package com.votogether.domain.post.entity;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

import com.votogether.global.exception.BadRequestException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.NullAndEmptySource;

class PostBodyTest {

    @Nested
    @DisplayName("게시글 바디 생성")
    class PostBodyCreate {

        @Test
        @DisplayName("게시글 제목과 내용이 정상적이라면 게시글 바디를 생성한다.")
        void success() {
            // given
            String title = "votogether";
            String content = "안녕 모두들 hello world!";

            // when
            PostBody postBody = new PostBody(title, content);

            // then
            assertSoftly(softly -> {
                softly.assertThat(postBody.getTitle()).isEqualTo(title);
                softly.assertThat(postBody.getContent()).isEqualTo(content);
            });
        }

        @ParameterizedTest
        @NullAndEmptySource
        @DisplayName("게시글 제목이 존재하지 않거나 공백이라면 예외를 던진다.")
        void emptyTitle(String title) {
            // given
            String content = "안녕 모두들 hello world!";

            // when, then
            assertThatThrownBy(() -> new PostBody(title, content))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("게시글 제목은 비어있거나 공백일 수 없습니다.");
        }

        @Test
        @DisplayName("게시글 제목 길이가 유효하지 않으면 예외를 던진다.")
        void invalidTitleLength() {
            // given
            String title = "a".repeat(101);
            String content = "안녕 모두들 hello world!";

            // when, then
            assertThatThrownBy(() -> new PostBody(title, content))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("게시글 제목 길이가 유효하지 않습니다.");
        }

        @ParameterizedTest
        @NullAndEmptySource
        @DisplayName("게시글 내용이 존재하지 않거나 공백이라면 예외를 던진다.")
        void emptyContent(String content) {
            // given
            String title = "votogether";

            // when, then
            assertThatThrownBy(() -> new PostBody(title, content))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("게시글 내용은 비어있거나 공백일 수 없습니다.");
        }

        @Test
        @DisplayName("게시글 내용 길이가 유효하지 않으면 예외를 던진다.")
        void invalidContentLength() {
            // given
            String title = "votogether";
            String content = "a".repeat(1001);

            // when, then
            assertThatThrownBy(() -> new PostBody(title, content))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("게시글 내용 길이가 유효하지 않습니다.");
        }

    }

}
