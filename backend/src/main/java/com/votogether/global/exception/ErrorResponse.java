package com.votogether.global.exception;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "요청 검증 에러 응답")
public record ErrorResponse(
        @Schema(description = "검증 실패 필드", example = "id")
        String fieldName,

        @Schema(description = "검증 실패 에러 메시지", example = "ID는 양수만 가능합니다.")
        String message
) {

    @Override
    public String toString() {
        return "{" +
                "fieldName='" + fieldName + '\'' +
                ", message='" + message + '\'' +
                '}';
    }

}
