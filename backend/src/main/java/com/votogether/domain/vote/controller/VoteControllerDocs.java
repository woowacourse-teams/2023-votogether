package com.votogether.domain.vote.controller;

import com.votogether.domain.member.entity.Member;
import com.votogether.global.exception.ExceptionResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;

@Tag(name = "투표", description = "투표 API")
public interface VoteControllerDocs {

    @Operation(summary = "투표", description = "게시글의 선택지에 투표를 한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "투표 성공"),
            @ApiResponse(
                    responseCode = "400",
                    description = "중복된 투표",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))),
            @ApiResponse(
                    responseCode = "404",
                    description = "1.존재하지 않는 게시글\t\n2.존재하지 않는 선택지",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class)))
    })
    ResponseEntity<Void> vote(
            @Parameter(description = "게시글 ID", example = "1") final Long postId,
            @Parameter(description = "게시글 선택지 ID", example = "1") final Long postOptionId,
            final Member member
    );

    @Operation(summary = "투표 수정", description = "게시글의 선택지의 투표를 수정한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "투표 수정 성공"),
            @ApiResponse(
                    responseCode = "404",
                    description = "1.존재하지 않는 게시글\t\n2.존재하지 않는 선택지",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class)))
    })
    ResponseEntity<Void> changeVote(
            @Parameter(description = "게시글 ID", example = "1") final Long postId,
            @Parameter(description = "기존 선택지 ID", example = "2") final Long originPostOptionId,
            @Parameter(description = "바꿀 선택지 ID", example = "3") final Long newPostOptionId,
            final Member member
    );

}
