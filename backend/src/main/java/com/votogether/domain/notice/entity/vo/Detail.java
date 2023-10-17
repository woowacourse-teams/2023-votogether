package com.votogether.domain.notice.entity.vo;

import com.votogether.domain.notice.exception.NoticeExceptionType;
import com.votogether.global.exception.BadRequestException;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Detail {

    private static final int MAXIMUM_TITLE_LENGTH = 100;
    private static final int MAXIMUM_CONTENT_LENGTH = 3000;

    @Column(nullable = false, length = MAXIMUM_TITLE_LENGTH)
    private String title;

    @Column(nullable = false, length = MAXIMUM_CONTENT_LENGTH)
    private String content;

    public Detail(final String title, final String content) {
        validateTitle(title);
        validateContent(content);
        this.title = title;
        this.content = content;
    }

    private void validateTitle(final String title) {
        if (title == null || title.isBlank()) {
            throw new BadRequestException(NoticeExceptionType.EMPTY_TITLE);
        }
        if (title.length() > MAXIMUM_TITLE_LENGTH) {
            throw new BadRequestException(NoticeExceptionType.INVALID_TITLE_LENGTH);
        }
    }

    private void validateContent(final String content) {
        if (content == null || content.isBlank()) {
            throw new BadRequestException(NoticeExceptionType.EMPTY_CONTENT);
        }
        if (content.length() > MAXIMUM_CONTENT_LENGTH) {
            throw new BadRequestException(NoticeExceptionType.INVALID_CONTENT_LENGTH);
        }
    }

}
