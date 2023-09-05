package com.votogether.domain.post.controller;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.dto.request.post.PostCreateRequest;
import com.votogether.domain.post.dto.request.post.PostUpdateRequest;
import com.votogether.domain.post.dto.response.post.PostDetailResponse;
import com.votogether.domain.post.dto.response.post.PostResponse;
import com.votogether.domain.post.dto.response.vote.VoteOptionStatisticsResponse;
import com.votogether.domain.post.entity.vo.PostClosingType;
import com.votogether.domain.post.entity.vo.PostSortType;
import com.votogether.domain.post.service.PostService;
import com.votogether.global.jwt.Auth;
import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RequestMapping("/posts")
@RestController
public class PostController implements PostControllerDocs {

    private final PostService postService;

    @GetMapping("/search")
    public ResponseEntity<List<PostResponse>> searchPostsWithKeyword(
            @RequestParam final String keyword,
            @RequestParam final int page,
            @RequestParam final PostClosingType postClosingType,
            @RequestParam final PostSortType postSortType,
            @RequestParam(required = false, name = "category") final Long categoryId,
            @Auth final Member member
    ) {
        final List<PostResponse> responses =
                postService.searchPostsWithKeyword(keyword, page, postClosingType, postSortType, categoryId, member);
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/search/guest")
    public ResponseEntity<List<PostResponse>> searchPostsWithKeywordForGuest(
            @RequestParam final String keyword,
            @RequestParam final int page,
            @RequestParam final PostClosingType postClosingType,
            @RequestParam final PostSortType postSortType,
            @RequestParam(required = false, name = "category") final Long categoryId
    ) {
        final List<PostResponse> responses =
                postService.searchPostsWithKeywordForGuest(keyword, page, postClosingType, postSortType, categoryId);
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/me")
    public ResponseEntity<List<PostResponse>> getPostsByMe(
            @RequestParam final int page,
            @RequestParam final PostClosingType postClosingType,
            @RequestParam final PostSortType postSortType,
            @RequestParam(required = false, name = "category") final Long categoryId,
            @Auth final Member member
    ) {
        final List<PostResponse> responses =
                postService.getPostsByWriter(page, postClosingType, postSortType, categoryId, member);
        return ResponseEntity.ok(responses);
    }

    @GetMapping
    public ResponseEntity<List<PostResponse>> getAllPost(
            @RequestParam final int page,
            @RequestParam final PostClosingType postClosingType,
            @RequestParam final PostSortType postSortType,
            @RequestParam(name = "category", required = false) final Long categoryId,
            @Auth final Member member
    ) {
        final List<PostResponse> responses = postService.getAllPostBySortTypeAndClosingTypeAndCategoryId(
                page,
                postClosingType,
                postSortType,
                categoryId,
                member
        );
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/guest")
    public ResponseEntity<List<PostResponse>> getPostsGuest(
            @RequestParam final int page,
            @RequestParam final PostClosingType postClosingType,
            @RequestParam final PostSortType postSortType,
            @RequestParam(required = false, name = "category") final Long categoryId
    ) {
        final List<PostResponse> response = postService.getPostsGuest(page, postClosingType, postSortType, categoryId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("{postId}")
    public ResponseEntity<PostDetailResponse> getPost(
            @PathVariable final Long postId,
            @Auth final Member member
    ) {
        final PostDetailResponse response = postService.getPostById(postId, member);
        return ResponseEntity.ok(response);
    }

    @GetMapping("{postId}/guest")
    public ResponseEntity<PostDetailResponse> getPostByGuest(
            @PathVariable final Long postId
    ) {
        final PostDetailResponse response = postService.getPostById(postId, null);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{postId}/options")
    public ResponseEntity<VoteOptionStatisticsResponse> getVoteStatistics(
            @PathVariable final Long postId,
            @Auth final Member member
    ) {
        final VoteOptionStatisticsResponse response = postService.getVoteStatistics(postId, member);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{postId}/options/{optionId}")
    public ResponseEntity<VoteOptionStatisticsResponse> getVoteOptionStatistics(
            @PathVariable final Long postId,
            @PathVariable final Long optionId,
            @Auth final Member member
    ) {
        final VoteOptionStatisticsResponse response = postService.getVoteOptionStatistics(postId, optionId, member);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/votes/me")
    public ResponseEntity<List<PostResponse>> getPostsVotedByMe(
            final int page,
            final PostClosingType postClosingType,
            final PostSortType postSortType,
            @Auth final Member member
    ) {
        final List<PostResponse> posts = postService.getPostsVotedByMember(page, postClosingType, postSortType, member);
        return ResponseEntity.status(HttpStatus.OK).body(posts);
    }

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


