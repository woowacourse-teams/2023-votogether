package com.votogether.domain.post.controller;

import com.votogether.domain.post.dto.response.post.PostRankingResponse;
import com.votogether.domain.post.dto.response.post.PostResponse;
import com.votogether.domain.post.entity.vo.PostClosingType;
import com.votogether.domain.post.entity.vo.PostSortType;
import com.votogether.global.exception.ExceptionResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import java.util.List;
import org.springframework.http.ResponseEntity;

@Tag(name = "비회원 게시글", description = "비회원 게시글 API")
public interface PostGuestControllerDocs {

    @Operation(summary = "비회원 게시글 목록 조회", description = "비회원이 게시글 목록을 조회한다.")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "비회원 게시글 목록 조회 성공"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "0 이상의 정수가 아닌 페이지",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<List<PostResponse>> getPosts(
            @Parameter(description = "현재 페이지 위치", example = "0")
            @PositiveOrZero(message = "페이지는 0이상 정수만 가능합니다.") final int page,
            @Parameter(description = "게시글 마감 여부", example = "ALL") final PostClosingType postClosingType,
            @Parameter(description = "게시글 정렬 기준", example = "HOT") final PostSortType postSortType,
            @Parameter(description = "카테고리 ID", example = "1") final Long categoryId
    );

    @Operation(summary = "비회원 게시글 상세 조회", description = "비회원이 게시글을 상세 조회한다.")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "비회원 게시글 상세 조회 성공"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = """
                            1.양의 정수가 아닌 게시글 ID
                                                        
                            2.게시글이 블라인드 처리된 경우
                            """,
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "존재하지 않는 게시글",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<PostResponse> getPost(
            @Parameter(description = "게시글 ID", example = "1")
            @Positive(message = "게시글 ID는 양의 정수만 가능합니다.") final Long postId
    );

    @Operation(summary = "비회원 게시글 검색", description = "비회원이 게시글을 검색한다.")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "비회원 게시글 검색 성공"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "0 이상의 정수가 아닌 페이지",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<List<PostResponse>> searchPosts(
            @Parameter(description = "검색 키워드", example = "votogether") final String keyword,
            @Parameter(description = "현재 페이지 위치", example = "0")
            @PositiveOrZero(message = "페이지는 0이상 정수만 가능합니다.") final int page,
            @Parameter(description = "게시글 마감 여부", example = "ALL") final PostClosingType postClosingType,
            @Parameter(description = "게시글 정렬 기준", example = "HOT") final PostSortType postSortType
    );

    @Operation(summary = "인기 게시글 랭킹 조회", description = "인기 게시글 랭킹을 조회한다.")
    @ApiResponse(responseCode = "200", description = "인기 게시글 랭킹 조회 성공")
    ResponseEntity<List<PostRankingResponse>> getRanking();

}
