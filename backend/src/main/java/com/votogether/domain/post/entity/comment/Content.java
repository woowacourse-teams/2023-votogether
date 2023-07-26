package com.votogether.domain.post.entity.comment;

import com.votogether.domain.post.exception.CommentExceptionType;
import com.votogether.exception.BadRequestException;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Embeddable
class Content {

    private static final int MAXIMUM_LENGTH = 500;

    @Column(name = "content", nullable = false, length = MAXIMUM_LENGTH)
    private String value;

    public Content(final String value) {
        validate(value);
        this.value = value;
    }

    private void validate(final String content) {
        if (content.length() > MAXIMUM_LENGTH) {
            throw new BadRequestException(
                    CommentExceptionType.INVALID_CONTENT_LENGTH.getCode(),
                    String.format("댓글 길이는 최대 %d자까지 가능합니다.", MAXIMUM_LENGTH)
            );
        }
    }

}
