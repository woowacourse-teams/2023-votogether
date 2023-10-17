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
public class BannerTitle {

    private static final int MAXIMUM_TITLE_LENGTH = 100;

    @Column(length = MAXIMUM_TITLE_LENGTH)
    private String bannerTitle;

    @Column(length = MAXIMUM_TITLE_LENGTH)
    private String bannerSubtitle;

    public BannerTitle(final String bannerTitle, final String bannerSubtitle) {
        validate(bannerTitle);
        validate(bannerSubtitle);
        this.bannerTitle = bannerTitle;
        this.bannerSubtitle = bannerSubtitle;
    }

    private void validate(final String title) {
        if (title == null) {
            return;
        }
        if (title.isBlank()) {
            throw new BadRequestException(NoticeExceptionType.EMPTY_BANNER_TITLE);
        }
        if (title.length() > MAXIMUM_TITLE_LENGTH) {
            throw new BadRequestException(NoticeExceptionType.INVALID_BANNER_TITLE_LENGTH);
        }
    }

}
