package com.votogether.domain.notice.dto.response;

import com.votogether.domain.notice.entity.Notice;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

@Schema(description = "공지사항 목록 페이징 응답")
public record NoticePageResponse(
        @Schema(description = "전체 페이지 수", example = "10")
        int totalPageNumber,

        @Schema(description = "현재 페이지", example = "1")
        int currentPageNumber,

        @Schema(description = "공지사항 목록")
        List<NoticeResponse> notices
) {

    public static NoticePageResponse of(final int totalPage, final int page, final List<Notice> notices) {
        return new NoticePageResponse(totalPage, page, convertToResponses(notices));
    }

    private static List<NoticeResponse> convertToResponses(final List<Notice> notices) {
        return notices.stream()
                .map(NoticeResponse::from)
                .toList();
    }

}
