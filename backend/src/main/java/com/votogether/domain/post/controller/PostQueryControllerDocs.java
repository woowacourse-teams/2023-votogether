package com.votogether.domain.post.controller;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.dto.response.post.PostResponse;
import com.votogether.domain.post.dto.response.vote.VoteOptionStatisticsResponse;
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

@Tag(name = "게시글 조회", description = "게시글 조회 API")
public interface PostQueryControllerDocs {

    @Operation(summary = "게시글 목록 조회", description = "게시글 목록을 조회한다.")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "게시글 목록 조회 성공"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "0이상의 정수가 아닌 페이지",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<List<PostResponse>> getPosts(
            @Parameter(description = "현재 페이지 위치", example = "0")
            @PositiveOrZero(message = "페이지는 0이상 정수만 가능합니다.") final int page,
            @Parameter(description = "게시글 마감 여부", example = "ALL") final PostClosingType postClosingType,
            @Parameter(description = "게시글 정렬 기준", example = "HOT") final PostSortType postSortType,
            @Parameter(description = "카테고리 ID", example = "1") final Long categoryId,
            final Member loginMember
    );

    @Operation(summary = "게시글 상세 조회", description = "게시글을 상세 조회한다.")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "게시글 상세 조회 성공"
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
            @Positive(message = "게시글 ID는 양의 정수만 가능합니다.") final Long postId,
            final Member loginMember
    );

    @Operation(summary = "게시글 검색", description = "게시글을 검색한다.")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "게시글 검색 성공"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "0이상의 정수가 아닌 페이지",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<List<PostResponse>> searchPosts(
            @Parameter(description = "검색 키워드", example = "hello") final String keyword,
            @Parameter(description = "현재 페이지 위치", example = "0")
            @PositiveOrZero(message = "페이지는 0이상 정수만 가능합니다.") final int page,
            @Parameter(description = "게시글 마감 여부", example = "ALL") final PostClosingType postClosingType,
            @Parameter(description = "게시글 정렬 기준", example = "HOT") final PostSortType postSortType,
            final Member loginMember
    );

    @Operation(summary = "내가 작성한 게시글 조회", description = "내가 작성한 게시글을 조회한다.")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "내가 작성한 게시글 조회 성공"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "0이상의 정수가 아닌 페이지",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<List<PostResponse>> getPostsWrittenByMe(
            @Parameter(description = "현재 페이지 위치", example = "0")
            @PositiveOrZero(message = "페이지는 0이상 정수만 가능합니다.") final int page,
            @Parameter(description = "게시글 마감 여부", example = "ALL") final PostClosingType postClosingType,
            @Parameter(description = "게시글 정렬 기준", example = "HOT") final PostSortType postSortType,
            final Member loginMember
    );

    @Operation(summary = "내가 투표한 게시글 조회", description = "내가 투표한 게시글을 조회한다.")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "내가 투표한 게시글 조회 성공"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "0이상의 정수가 아닌 페이지",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<List<PostResponse>> getPostsVotedByMe(
            @Parameter(description = "현재 페이지 위치", example = "0")
            @PositiveOrZero(message = "페이지는 0이상 정수만 가능합니다.") final int page,
            @Parameter(description = "게시글 마감 여부", example = "ALL") final PostClosingType postClosingType,
            @Parameter(description = "게시글 정렬 기준", example = "HOT") final PostSortType postSortType,
            final Member loginMember
    );

    @Operation(summary = "게시글 투표 통계 조회", description = "게시글 투표 통계를 조회한다.")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "게시글 투표 통계 조회 성공"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = """
                            1.양의 정수가 아닌 게시글 ID
                                                        
                            2.게시글이 블라인드 처리된 경우
                                              
                            3.게시글 작성자가 아닌 경우
                            """,
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "존재하지 않는 게시글",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<VoteOptionStatisticsResponse> getVoteStatistics(
            @Parameter(description = "게시글 ID", example = "1")
            @Positive(message = "게시글 ID는 양의 정수만 가능합니다.") final Long postId,
            final Member loginMember
    );

    @Operation(summary = "게시글 투표 옵션 통계 조회", description = "게시글 투표 옵션 통계를 조회한다.")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "게시글 투표 옵션 통계 조회 성공"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = """
                            1.양의 정수가 아닌 게시글 ID
                                                        
                            2.양의 정수가 아닌 게시글 투표 옵션 ID
                                                        
                            3.게시글이 블라인드 처리된 경우
                                                        
                            4.게시글 작성자가 아닌 경우
                                                        
                            5.옵션이 해당 게시글에 속하지 않는 경우
                            """,
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = """
                            1.존재하지 않는 게시글
                                                        
                            2.존재하지 않는 게시글 투표 옵션
                            """,
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<VoteOptionStatisticsResponse> getVoteOptionStatistics(
            @Parameter(description = "게시글 ID", example = "1")
            @Positive(message = "게시글 ID는 양의 정수만 가능합니다.") final Long postId,
            @Parameter(description = "게시글 옵션 ID", example = "1")
            @Positive(message = "게시글 옵션 ID는 양의 정수만 가능합니다.") final Long optionId,
            final Member loginMember
    );

}
