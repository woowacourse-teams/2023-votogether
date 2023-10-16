package com.votogether.domain.alarm.controller;

import com.votogether.domain.alarm.dto.response.PostAlarmResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.PositiveOrZero;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;

@Tag(name = "알림", description = "알림 API")
public interface AlarmControllerDocs {

    @Operation(summary = "게시글 내역 알림 조회", description = "게시글 내역 알림을 조회한다.")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "게시글 내역 알림 조회 성공"
            )
    })
    ResponseEntity<List<PostAlarmResponse>> getPostAlarm(
            @RequestParam @PositiveOrZero(message = "페이지는 0이상 정수만 가능합니다.") final int page
    );

}
