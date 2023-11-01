package com.votogether.domain.alarm.dto.response;

import com.votogether.domain.alarm.entity.Alarm;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "게시글 내역 세부 사항 응답")
public record PostAlarmDetailResponse(
        @Schema(description = "게시글 ID", example = "1")
        Long postId,

        @Schema(description = "게시글 제목", example = "제목입니다.")
        String postTitle,

        @Schema(description = "댓글 작성자 닉네임", example = "저문")
        String commentWriter
) {

    public static PostAlarmDetailResponse of(final Alarm alarm) {
        return new PostAlarmDetailResponse(
                alarm.getTargetId(),
                alarm.getDetail(),
                alarm.getCommentWriterNickname()
        );
    }

}
