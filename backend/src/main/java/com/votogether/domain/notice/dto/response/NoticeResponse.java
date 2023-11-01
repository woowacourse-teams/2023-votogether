package com.votogether.domain.notice.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.votogether.domain.notice.entity.Notice;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;

@Schema(description = "공지사항 응답")
public record NoticeResponse(
        @Schema(description = "공지사항 ID", example = "1")
        Long id,

        @Schema(description = "공지사항 제목", example = "제목")
        String title,

        @Schema(description = "공지사항 배너 제목", example = "배너 제목")
        String bannerTitle,

        @Schema(description = "공지사항 배너 부제목", example = "배너 부제목")
        String bannerSubtitle,

        @Schema(description = "공지사항 내용", example = "내용")
        String content,

        @Schema(description = "공지사항 배너 마감기한", example = "2023-12-25 23:59")
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
        LocalDateTime deadline,

        @Schema(description = "공지사항 생성시각", example = "2023-12-25 23:59")
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
        LocalDateTime createdAt
) {

    public static NoticeResponse empty() {
        return new NoticeResponse(null, null, null, null, null, null, null);
    }

    public static NoticeResponse from(final Notice notice) {
        return new NoticeResponse(
                notice.getId(),
                notice.getTitle(),
                notice.getBannerTitle(),
                notice.getBannerSubtitle(),
                notice.getContent(),
                notice.getDeadline(),
                notice.getCreatedAt()
        );
    }

}
