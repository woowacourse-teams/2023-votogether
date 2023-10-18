package com.votogether.domain.post.controller;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.dto.request.post.PostCreateRequest;
import com.votogether.domain.post.dto.request.post.PostUpdateRequest;
import com.votogether.domain.post.service.PostCommandService;
import com.votogether.global.jwt.Auth;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RequiredArgsConstructor
@RequestMapping("/posts")
@RestController
public class PostCommandController implements PostCommandControllerDocs {

    private final PostCommandService postCommandService;

    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Void> createPost(
            @ModelAttribute @Valid final PostCreateRequest postCreateRequest,
            @Auth final Member loginMember
    ) {
        final Long postId = postCommandService.createPost(postCreateRequest, loginMember);
        return ResponseEntity.created(URI.create("/posts/" + postId)).build();
    }

    @PutMapping(value = "/{postId}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Void> updatePost(
            @PathVariable @Positive(message = "게시글 ID는 양의 정수만 가능합니다.") final Long postId,
            @ModelAttribute @Valid final PostUpdateRequest postUpdateRequest,
            @Auth final Member loginMember
    ) {
        postCommandService.updatePost(postId, postUpdateRequest, loginMember);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{postId}/close")
    public ResponseEntity<Void> closePostEarly(
            @PathVariable @Positive(message = "게시글 ID는 양의 정수만 가능합니다.") final Long postId,
            @Auth final Member loginMember
    ) {
        postCommandService.closePostEarly(postId, loginMember);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<Void> deletePost(
            @PathVariable @Positive(message = "게시글 ID는 양의 정수만 가능합니다.") final Long postId,
            @Auth final Member loginMember
    ) {
        postCommandService.deletePost(postId, loginMember);
        return ResponseEntity.noContent().build();
    }

}
