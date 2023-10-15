package com.votogether.domain.notice.controller;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.notice.dto.request.NoticeRequest;
import com.votogether.domain.notice.dto.response.NoticeResponse;
import com.votogether.global.exception.ExceptionResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;

@Tag(name = "공지사항", description = "공지사항 API")
public interface NoticeControllerDocs {

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
            summary = "공지사항 생성",
            description = "공지사항을 생성합니다."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "201",
                    description = "공지사항 생성 성공"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = """
                            1.공지사항 제목이 존재하지 않거나 공백인 경우
                                                        
                            2.공지사항 내용이 존재하지 않거나 공백인 경우
                                                        
                            3.공지사항 배너 마감기한이 존재하지 않은 경우
                                                        
                            4.공지사항 제목 길이가 유효하지 않은 경우
                                                        
                            5.공지사항 내용 길이가 유효하지 않은 경우
                                                        
                            6.공지사항 배너 제목 길이가 유효하지 않은 경우
                                                        
                            7.공지사항 배너 부제목 길이가 유효하지 않은 경우
                            """,
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<Void> createNotice(final NoticeRequest noticeRequest, final Member loginMember);

}
