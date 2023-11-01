package com.votogether.domain.notice.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import org.springframework.format.annotation.DateTimeFormat;

@Schema(description = "공지사항 생성 요청")
public record NoticeRequest(
        @Schema(description = "공지사항 제목", example = "제목")
        @NotBlank(message = "공지사항 제목을 입력하지 않았습니다.")
        String title,

        @Schema(description = "공지사항 배너 제목", example = "배너 제목")
        String bannerTitle,

        @Schema(description = "공지사항 배너 부제목", example = "배너 부제목")
        String bannerSubtitle,

        @Schema(description = "공지사항 내용", example = "내용")
        @NotBlank(message = "공지사항 내용을 입력하지 않았습니다.")
        String content,

        @Schema(description = "배너 노출 마감기한", example = "2023-12-25 23:59")
        @NotNull(message = "배너 노출 마감기한을 입력하지 않았습니다.")
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
        LocalDateTime deadline
) {
}
