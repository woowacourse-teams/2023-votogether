package com.votogether.domain.post.controller;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.dto.request.post.PostCreateRequest;
import com.votogether.domain.post.dto.request.post.PostUpdateRequest;
import com.votogether.domain.post.dto.response.post.PostDetailResponse;
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
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

@Tag(name = "게시글", description = "게시글 API")
public interface PostControllerDocs {

    @Operation(summary = "[회원] 전체 게시글 목록 조회", description = "[회원] 전체 게시글 목록을 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "전체 게시글 목록 조회 성공"),
            @ApiResponse(
                    responseCode = "400",
                    description = "잘못된 입력",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<List<PostResponse>> getAllPost(
            @Parameter(description = "현재 페이지 위치", example = "0") final int page,
            @Parameter(description = "게시글 마감 여부", example = "ALL") final PostClosingType postClosingType,
            @Parameter(description = "게시글 정렬 기준", example = "HOT") final PostSortType postSortType,
            @Parameter(description = "카테고리 ID", example = "1") final Long categoryId,
            final Member member
    );

    @Operation(summary = "[회원] 게시글 상세 조회", description = "[회원] 게시글을 상세 조회 한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "게시글 상세 조회 성공"),
            @ApiResponse(
                    responseCode = "404",
                    description = "존재하지 않는 게시글",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<PostDetailResponse> getPost(
            @Parameter(description = "게시글 ID", example = "1") final Long postId,
            final Member member
    );

    @Operation(summary = "게시글 투표 통계 조회", description = "게시글 투표에 대한 전체 통계를 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "게시글 투표 통계 조회 성공"),
            @ApiResponse(
                    responseCode = "404",
                    description = "존재하지 않는 게시글",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<VoteOptionStatisticsResponse> getVoteStatistics(
            @Parameter(description = "게시글 ID", example = "1") final Long postId,
            final Member member
    );

    @Operation(summary = "게시글 투표 선택지 통계 조회", description = "게시글 특정 투표 선택지에 대한 통계를 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "게시글 투표 선택지 통계 조회 성공"),
            @ApiResponse(
                    responseCode = "400",
                    description = "게시글에 속하지 않는 투표 옵션",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "1.존재하지 않는 게시글\t\n2.존재하지 않는 게시글 투표 옵션",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<VoteOptionStatisticsResponse> getVoteOptionStatistics(
            @Parameter(description = "게시글 ID", example = "1") final Long postId,
            @Parameter(description = "게시글 선택지 ID", example = "2") final Long optionId,
            final Member member
    );

    @Operation(summary = "투표한 게시글 목록 조회", description = "투표한 게시글 목록을 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "투표한 게시글 목록 조회 성공"),
            @ApiResponse(
                    responseCode = "400",
                    description = "잘못된 입력",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<List<PostResponse>> getPostsVotedByMe(
            @Parameter(description = "현재 페이지 위치", example = "0") final int page,
            @Parameter(description = "게시글 마감 여부", example = "ALL") final PostClosingType postClosingType,
            @Parameter(description = "게시글 정렬 기준", example = "HOT") final PostSortType postSortType,
            final Member member
    );


    @Operation(summary = "[회원] 게시글 검색", description = "[회원] 키워드를 통해 게시글을 검색한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "게시글 검색 성공"),
            @ApiResponse(
                    responseCode = "400",
                    description = "잘못된 입력",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<List<PostResponse>> searchPostsWithKeyword(
            @Parameter(description = "검색 키워드", example = "취업") final String keyword,
            @Parameter(description = "현재 페이지 위치", example = "0") final int page,
            @Parameter(description = "게시글 마감 여부", example = "ALL") final PostClosingType postClosingType,
            @Parameter(description = "게시글 정렬 기준", example = "HOT") final PostSortType postSortType,
            final Member member
    );

    @Operation(summary = "작성한 게시글 목록 조회", description = "작성한 게시글 목록을 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "작성한 게시글 목록 조회 성공"),
            @ApiResponse(
                    responseCode = "400",
                    description = "잘못된 입력",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<List<PostResponse>> getPostsByMe(
            @Parameter(description = "현재 페이지 위치", example = "0") final int page,
            @Parameter(description = "게시글 마감 여부", example = "ALL") final PostClosingType postClosingType,
            @Parameter(description = "게시글 정렬 기준", example = "HOT") final PostSortType postSortType,
            final Member member
    );

    @Operation(summary = "게시글 작성", description = "게시글을 작성한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "게시글 작성 성공"),
            @ApiResponse(
                    responseCode = "400",
                    description = "잘못된 입력입니다.",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<Void> save(
            final PostCreateRequest request,
            final List<MultipartFile> contentImages,
            final List<MultipartFile> optionImages,
            final Member member
    );

    @Operation(summary = "게시글 수정", description = "게시글을 수정한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "게시글 수정 성공"),
            @ApiResponse(
                    responseCode = "400",
                    description = "잘못된 입력",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<Void> update(
            @Parameter(description = "게시글 ID", example = "1") final Long postId,
            final PostUpdateRequest request,
            final List<MultipartFile> contentImages,
            final List<MultipartFile> optionImages,
            final Member member
    );

    @Operation(summary = "게시글 조기 마감", description = "게시글을 조기 마감한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "게시물 조기 마감 성공."),
            @ApiResponse(
                    responseCode = "400",
                    description = "잘못된 입력",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<Void> closePostEarly(
            @Parameter(description = "게시글 ID", example = "1") final Long postId,
            final Member loginMember
    );

    @Operation(summary = "게시글 삭제", description = "게시글을 삭제한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "게시물 삭제 성공"),
            @ApiResponse(
                    responseCode = "400",
                    description = "잘못된 입력",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<Void> delete(
            @Parameter(description = "게시글 ID", example = "1") final Long postId
    );

}
