package com.votogether.domain.post.controller;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.dto.request.comment.CommentRegisterRequest;
import com.votogether.domain.post.dto.request.comment.CommentUpdateRequest;
import com.votogether.domain.post.dto.response.comment.CommentResponse;
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

@Tag(name = "게시글 댓글", description = "게시글 댓글 API")
public interface PostCommentControllerDocs {

    @Operation(summary = "게시글 댓글 목록 조회", description = "게시글 댓글 목록을 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "게시글 댓글 목록 조회 성공"),
            @ApiResponse(
                    responseCode = "404",
                    description = "존재하지 않는 게시글",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<List<CommentResponse>> getComments(
            @Parameter(description = "댓글 작성 게시글 ID", example = "1") final Long postId
    );

    @Operation(summary = "게시글 댓글 작성", description = "게시글 댓글을 작성한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "게시글 댓글 작성 성공"),
            @ApiResponse(
                    responseCode = "404",
                    description = "존재하지 않는 게시글",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<Void> createComment(
            @Parameter(description = "댓글 작성 게시글 ID", example = "1") final Long postId,
            final CommentRegisterRequest commentRegisterRequest,
            final Member member
    );

    @Operation(summary = "게시글 댓글 수정", description = "게시글 댓글을 수정한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "게시글 댓글 수정 성공"),
            @ApiResponse(
                    responseCode = "400",
                    description = "1.게시글에 속하지 않은 댓글\t\n2.올바르지 않은 댓글 작성자",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "1.존재하지 않는 게시글\t\n2.존재하지 않는 댓글",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<Void> updateComment(
            @Parameter(description = "게시글 ID", example = "1") final Long postId,
            @Parameter(description = "댓글 ID", example = "1") final Long commentId,
            final CommentUpdateRequest commentUpdateRequest,
            final Member member
    );

    @Operation(summary = "게시글 댓글 삭제", description = "게시글 댓글을 삭제한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "게시글 댓글 삭제 성공"),
            @ApiResponse(
                    responseCode = "400",
                    description = "1.게시글에 속하지 않은 댓글\t\n2.올바르지 않은 댓글 작성자",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "1.존재하지 않는 게시글\t\n2.존재하지 않는 댓글",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<Void> deleteComment(
            @Parameter(description = "게시글 ID", example = "1") final Long postId,
            @Parameter(description = "댓글 ID", example = "1") final Long commentId,
            final Member member
    );

}
