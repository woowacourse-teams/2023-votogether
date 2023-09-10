package com.votogether.domain.post.controller;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.dto.request.comment.CommentCreateRequest;
import com.votogether.domain.post.dto.request.comment.CommentUpdateRequest;
import com.votogether.domain.post.dto.response.comment.CommentResponse;
import com.votogether.domain.post.service.PostCommentService;
import com.votogether.global.jwt.Auth;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RequiredArgsConstructor
@RequestMapping("/posts")
@RestController
public class PostCommentController implements PostCommentControllerDocs {

    private final PostCommentService postCommentService;

    @GetMapping("/{postId}/comments")
    public ResponseEntity<List<CommentResponse>> getComments(
            @PathVariable @Positive(message = "게시글 ID는 양의 정수만 가능합니다.") final Long postId
    ) {
        final List<CommentResponse> response = postCommentService.getComments(postId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{postId}/comments")
    public ResponseEntity<Void> createComment(
            @PathVariable @Positive(message = "게시글 ID는 양의 정수만 가능합니다.") final Long postId,
            @RequestBody @Valid CommentCreateRequest commentCreateRequest,
            @Auth final Member loginMember
    ) {
        postCommentService.createComment(postId, commentCreateRequest, loginMember);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/{postId}/comments/{commentId}")
    public ResponseEntity<Void> updateComment(
            @PathVariable @Positive(message = "게시글 ID는 양의 정수만 가능합니다.") final Long postId,
            @PathVariable @Positive(message = "댓글 ID는 양의 정수만 가능합니다.") final Long commentId,
            @RequestBody @Valid final CommentUpdateRequest commentUpdateRequest,
            @Auth final Member loginMember
    ) {
        postCommentService.updateComment(postId, commentId, commentUpdateRequest, loginMember);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{postId}/comments/{commentId}")
    public ResponseEntity<Void> deleteComment(
            @PathVariable @Positive(message = "게시글 ID는 양의 정수만 가능합니다.") final Long postId,
            @PathVariable @Positive(message = "댓글 ID는 양의 정수만 가능합니다.") final Long commentId,
            @Auth final Member loginMember
    ) {
        postCommentService.deleteComment(postId, commentId, loginMember);
        return ResponseEntity.noContent().build();
    }

}
