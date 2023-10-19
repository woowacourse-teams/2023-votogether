package com.votogether.domain.member.dto.response;

import com.votogether.domain.member.entity.vo.Gender;
import com.votogether.domain.member.entity.vo.Roles;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "회원 정보 응답")
public record MemberInfoResponse(
        @Schema(description = "닉네임", example = "유저")
        String nickname,

        @Schema(description = "성별", example = "남성")
        Gender gender,

        @Schema(description = "출생년도", example = "2002")
        Integer birthYear,

        @Schema(description = "작성한 게시글 수", example = "5")
        long postCount,

        @Schema(description = "투표한 수", example = "10")
        long voteCount,

        @Schema(description = "권한", example = "MEMBER")
        Roles role,

        @Schema(description = "최신 알림 존재 여부", example = "false")
        boolean hasLatestAlarm
) {
}
