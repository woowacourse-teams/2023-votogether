package com.votogether.domain.member.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

@Schema(description = "닉네임 변경 요청")
public record MemberNicknameUpdateRequest(
        @Schema(description = "변경할 닉네임", example = "jeomxon")
        @NotBlank(message = "닉네임은 빈값 혹은 공백이 포함될 수 없습니다.")
        String nickname
) {
}
