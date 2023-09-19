package com.votogether.domain.post.entity;

import com.votogether.domain.post.exception.PostExceptionType;
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
public class PostBody {

    private static final int MAXIMUM_TITLE_LENGTH = 100;
    private static final int MAXIMUM_CONTENT_LENGTH = 1000;

    @Column(length = MAXIMUM_TITLE_LENGTH, nullable = false)
    private String title;

    @Column(length = MAXIMUM_CONTENT_LENGTH, nullable = false)
    private String content;

    public PostBody(final String title, final String content) {
        validateTitle(title);
        validateContent(content);
        this.title = title;
        this.content = content;
    }

    private void validateTitle(final String title) {
        if (!StringUtils.hasText(title)) {
            throw new BadRequestException(PostExceptionType.TITLE_EMPTY);
        }
        if (title.length() > MAXIMUM_TITLE_LENGTH) {
            throw new BadRequestException(PostExceptionType.TITLE_INVALID_LENGTH);
        }
    }

    private void validateContent(final String content) {
        if (!StringUtils.hasText(content)) {
            throw new BadRequestException(PostExceptionType.CONTENT_EMPTY);
        }
        if (content.length() > MAXIMUM_CONTENT_LENGTH) {
            throw new BadRequestException(PostExceptionType.CONTENT_INVALID_LENGTH);
        }
    }

}
