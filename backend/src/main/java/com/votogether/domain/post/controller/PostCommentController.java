package com.votogether.domain.post.controller;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.dto.request.comment.CommentRegisterRequest;
import com.votogether.domain.post.dto.request.comment.CommentUpdateRequest;
import com.votogether.domain.post.dto.response.comment.CommentResponse;
import com.votogether.domain.post.service.PostCommentService;
import com.votogether.global.jwt.Auth;
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

@RequiredArgsConstructor
@RequestMapping("/posts")
@RestController
public class PostCommentController implements PostCommentControllerDocs {

    private final PostCommentService postCommentService;

    @GetMapping("/{postId}/comments")
    public ResponseEntity<List<CommentResponse>> getComments(@PathVariable final Long postId) {
        final List<CommentResponse> response = postCommentService.getComments(postId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{postId}/comments")
    public ResponseEntity<Void> createComment(
            @PathVariable final Long postId,
            @Valid @RequestBody CommentRegisterRequest commentRegisterRequest,
            @Auth final Member member
    ) {
        postCommentService.createComment(member, postId, commentRegisterRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/{postId}/comments/{commentId}")
    public ResponseEntity<Void> updateComment(
            @PathVariable final Long postId,
            @PathVariable final Long commentId,
            @RequestBody @Valid final CommentUpdateRequest commentUpdateRequest,
            @Auth final Member member
    ) {
        postCommentService.updateComment(postId, commentId, commentUpdateRequest, member);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{postId}/comments/{commentId}")
    public ResponseEntity<Void> deleteComment(
            @PathVariable final Long postId,
            @PathVariable final Long commentId,
            @Auth final Member member
    ) {
        postCommentService.deleteComment(postId, commentId, member);
        return ResponseEntity.noContent().build();
    }

}
