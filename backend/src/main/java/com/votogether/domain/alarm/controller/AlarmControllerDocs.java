package com.votogether.domain.alarm.controller;

import com.votogether.domain.alarm.dto.response.PostAlarmResponse;
import com.votogether.global.exception.ExceptionResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.PositiveOrZero;
import java.util.List;
import org.springframework.http.ResponseEntity;

@Tag(name = "알림", description = "알림 API")
public interface AlarmControllerDocs {

    @Operation(summary = "게시글 내역 알림 조회", description = "게시글 내역 알림을 조회한다.")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "게시글 내역 알림 조회 성공"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "0 이상의 정수가 아닌 페이지",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<List<PostAlarmResponse>> getPostAlarm(
            @PositiveOrZero(message = "페이지는 0이상 정수만 가능합니다.") final int page
    );

}
