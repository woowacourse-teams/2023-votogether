package com.votogether.domain.post.entity;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.votogether.global.exception.BadRequestException;
import java.time.LocalDateTime;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

class PostDeadlineTest {

    @Nested
    @DisplayName("게시글 마감시간 생성")
    class PostDeadlineCreate {

        @Test
        @DisplayName("게시글 마감시간이 정상적이라면 게시글 마감시간을 생성한다.")
        void success() {
            // given
            LocalDateTime deadline = LocalDateTime.now().plusDays(14);

            // when
            PostDeadline postDeadline = new PostDeadline(deadline);

            // then
            assertThat(postDeadline.getDeadline()).isEqualTo(deadline);
        }

        @Test
        @DisplayName("게시글 마감시간이 최대 마감시간을 초과하면 예외를 던진다.")
        void invalidDeadline() {
            // given
            LocalDateTime deadline = LocalDateTime.now().plusDays(15);

            // when, then
            assertThatThrownBy(() -> new PostDeadline(deadline))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("최대 마감기간을 초과하였습니다.");
        }

    }

    @Nested
    @DisplayName("게시글 마감 여부 확인")
    class IsClosed {

        @Test
        @DisplayName("게시글이 마감되었으면 true 반환한다.")
        void isClosed() {
            // given
            LocalDateTime deadline = LocalDateTime.now().minusDays(1);

            // when
            PostDeadline postDeadline = new PostDeadline(deadline);

            // then
            assertThat(postDeadline.isClosed()).isTrue();
        }

        @Test
        @DisplayName("게시글이 마감되지 않았으면 false 반환한다.")
        void isOpen() {
            // given
            LocalDateTime deadline = LocalDateTime.now().plusDays(1);

            // when
            PostDeadline postDeadline = new PostDeadline(deadline);

            // then
            assertThat(postDeadline.isClosed()).isFalse();
        }

    }

}
