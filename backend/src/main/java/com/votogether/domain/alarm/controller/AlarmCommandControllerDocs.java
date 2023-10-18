package com.votogether.domain.alarm.controller;

import com.votogether.domain.member.entity.Member;
import com.votogether.global.exception.ExceptionResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import org.springframework.http.ResponseEntity;

@Tag(name = "알림 커맨드", description = "알림 커맨드 API")
public interface AlarmCommandControllerDocs {

    @Operation(
            summary = "알림 읽기",
            description = "알림을 읽을 수 있는 대상이라면 알림을 읽습니다."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "알림 읽기 성공"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = """
                            1.알림 ID가 양수가 아닌 경우
                                                        
                            2.알림을 읽을 수 있는 대상이 아닌 경우
                            """,
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "알림이 존재하지 않은 경우",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<Void> readAlarm(
            @Parameter(description = "알림 ID", example = "1")
            @Positive(message = "알림 ID는 양수만 가능합니다.") final Long alarmId,
            @Parameter(description = "알림 타입", example = "CONTENT")
            @NotBlank(message = "알림 타입이 공백이거나 존재하지 않습니다.") final String alarmType,
            final Member loginMember
    );

}
