package com.votogether.domain.post.entity.comment;

import com.votogether.domain.post.exception.CommentExceptionType;
import com.votogether.global.exception.BadRequestException;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Content {

    private static final int MAXIMUM_LENGTH = 500;

    @Column(name = "content", nullable = false, length = MAXIMUM_LENGTH)
    private String value;

    public Content(final String value) {
        validate(value);
        this.value = value;
    }

    private void validate(final String content) {
        if (content.length() > MAXIMUM_LENGTH) {
            throw new BadRequestException(CommentExceptionType.INVALID_LENGTH);
        }
    }

}
