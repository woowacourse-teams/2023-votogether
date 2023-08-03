package com.votogether.domain.post.controller;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.dto.request.CommentRegisterRequest;
import com.votogether.domain.post.dto.request.CommentUpdateRequest;
import com.votogether.domain.post.dto.response.CommentResponse;
import com.votogether.domain.post.service.PostCommentService;
import com.votogether.exception.ExceptionResponse;
import com.votogether.global.jwt.Auth;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "게시글 댓글", description = "게시글 댓글 API")
@RequiredArgsConstructor
@RequestMapping("/posts")
@RestController
public class PostCommentController {

    private final PostCommentService postCommentService;

    @Operation(summary = "게시글 댓글 작성", description = "게시글 댓글을 작성한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "게시글 댓글 작성 성공"),
            @ApiResponse(
                    responseCode = "404",
                    description = "존재하지 않는 게시글에 대한 댓글 작성",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    @PostMapping("/{postId}/comments")
    public ResponseEntity<Void> createComment(
            @Auth final Member member,
            @PathVariable @Parameter(description = "댓글 작성 게시글 ID") final Long postId,
            @Valid @RequestBody CommentRegisterRequest commentRegisterRequest
    ) {
        postCommentService.createComment(member, postId, commentRegisterRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @Operation(summary = "게시글 댓글 목록 조회", description = "게시글 댓글 목록을 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "게시글 댓글 목록 조회 성공"),
            @ApiResponse(
                    responseCode = "404",
                    description = "존재하지 않는 게시글",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    @GetMapping("/{postId}/comments")
    public ResponseEntity<List<CommentResponse>> getComments(@PathVariable final Long postId) {
        final List<CommentResponse> response = postCommentService.getComments(postId);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "게시글 댓글 수정", description = "게시글 댓글을 수정한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "게시글 댓글 수정 성공"),
            @ApiResponse(
                    responseCode = "400",
                    description = "게시글에 속하지 않은 댓글, 올바르지 않은 댓글 작성자",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "존재하지 않는 게시글, 존재하지 않는 댓글",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    @PutMapping("/{postId}/comments/{commentId}")
    public ResponseEntity<Void> updateComment(
            @PathVariable @Parameter(description = "게시글 ID") final Long postId,
            @PathVariable @Parameter(description = "댓글 ID") final Long commentId,
            @RequestBody @Valid final CommentUpdateRequest commentUpdateRequest,
            @Auth final Member member
    ) {
        postCommentService.updateComment(postId, commentId, commentUpdateRequest, member);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "게시글 댓글 삭제", description = "게시글 댓글을 삭제한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "게시글 댓글 삭제 성공"),
            @ApiResponse(
                    responseCode = "400",
                    description = "게시글에 속하지 않은 댓글, 올바르지 않은 댓글 작성자",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "존재하지 않는 게시글, 존재하지 않는 댓글",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    @DeleteMapping("/{postId}/comments/{commentId}")
    public ResponseEntity<Void> deleteComment(
            @PathVariable @Parameter(description = "게시글 ID") final Long postId,
            @PathVariable @Parameter(description = "댓글 ID") final Long commentId,
            @Auth final Member member
    ) {
        postCommentService.deleteComment(postId, commentId, member);
        return ResponseEntity.noContent().build();
    }

}
