package com.votogether.domain.post.controller;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.dto.request.post.PostCreateRequest;
import com.votogether.domain.post.dto.request.post.PostUpdateRequest;
import com.votogether.domain.post.service.PostService;
import com.votogether.global.jwt.Auth;
import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RequestMapping("/posts")
@RestController
public class PostController implements PostControllerDocs {

    private final PostService postService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> save(
            @RequestPart @Valid final PostCreateRequest request,
            @RequestPart final List<MultipartFile> contentImages,
            @RequestPart final List<MultipartFile> optionImages,
            @Auth final Member member
    ) {
        final Long postId = postService.save(request, member, contentImages, optionImages);
        return ResponseEntity.created(URI.create("/posts/" + postId)).build();
    }

    @PutMapping(value = "/{postId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> update(
            @PathVariable final Long postId,
            @RequestPart @Valid final PostUpdateRequest request,
            @RequestPart final List<MultipartFile> contentImages,
            @RequestPart final List<MultipartFile> optionImages,
            @Auth final Member member
    ) {
        postService.update(postId, request, member, contentImages, optionImages);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{postId}/close")
    public ResponseEntity<Void> closePostEarly(
            @PathVariable final Long postId,
            @Auth final Member loginMember
    ) {
        postService.closePostEarlyById(postId, loginMember);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<Void> delete(@PathVariable final Long postId) {
        postService.delete(postId);
        return ResponseEntity.noContent().build();
    }

}
