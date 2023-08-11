package com.votogether.domain.member.dto;

import com.votogether.domain.member.entity.Gender;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

@Schema(description = "회원 상세 정보 수정 요청")

public record MemberDetailRequest(
        @Schema(description = "성별", example = "MALE")
        Gender gender,
        @Schema(description = "출생년도", example = "2000")
        @NotNull(message = "출생년도는 빈 값일 수 없습니다.")
        @Min(value = 1000, message = "출생년도는 1000년 이상부터 가능합니다.")
        @Max(value = 2100, message = "출생년도는 2100년까지만 가능합니다.")
        Integer birthYear
) {
}
