package com.votogether.domain.post.entity;

import com.votogether.domain.post.exception.PostOptionExceptionType;
import com.votogether.global.exception.BadRequestException;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.util.StringUtils;

@Getter
@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PostOptionBody {

    private static final int MAXIMUM_CONTENT_LENGTH = 50;

    @Column(length = MAXIMUM_CONTENT_LENGTH, nullable = false)
    private String content;

    public PostOptionBody(final String content) {
        validate(content);
        this.content = content;
    }

    private void validate(final String content) {
        if (!StringUtils.hasText(content)) {
            throw new BadRequestException(PostOptionExceptionType.CONTENT_EMPTY);
        }
        if (content.length() > MAXIMUM_CONTENT_LENGTH) {
            throw new BadRequestException(PostOptionExceptionType.CONTENT_INVALID_LENGTH);
        }
    }

}
