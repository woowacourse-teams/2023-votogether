package com.votogether.domain.notice.controller;

import com.votogether.domain.notice.dto.response.NoticePageResponse;
import com.votogether.domain.notice.dto.response.NoticeResponse;
import com.votogether.global.exception.ExceptionResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import org.springframework.http.ResponseEntity;

@Tag(name = "공지사항 쿼리", description = "공지사항 쿼리 API")
public interface NoticeQueryControllerDocs {

    @Operation(
            summary = "배너 공지사항 조회",
            description = "배너 공지사항을 조회합니다."
    )
    @ApiResponse(
            responseCode = "200",
            description = "배너 공지사항 조회 성공"
    )
    ResponseEntity<NoticeResponse> getProgressNotice();

    @Operation(
            summary = "공지사항 목록 조회",
            description = "공지사항 목록을 조회합니다."
    )
    @ApiResponse(
            responseCode = "200",
            description = "공지사항 목록 조회 성공"
    )
    ResponseEntity<NoticePageResponse> getNotices(@PositiveOrZero(message = "페이지는 0이상 정수만 가능합니다.") final int page);

    @Operation(
            summary = "공지사항 상세 조회",
            description = "공지사항 상세 정보를 조회합니다."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "공지사항 상세 조회 성공"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "공지사항 ID가 양수가 아닌 경우",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "공지사항이 존재하지 않은 경우",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<NoticeResponse> getNotice(@Positive(message = "공지사항 ID는 양수만 가능합니다.") final Long noticeId);

}
