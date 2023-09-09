package com.votogether.domain.post.controller;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.dto.response.post.PostResponse;
import com.votogether.domain.post.dto.response.vote.VoteOptionStatisticsResponse;
import com.votogether.domain.post.entity.vo.PostClosingType;
import com.votogether.domain.post.entity.vo.PostSortType;
import com.votogether.domain.post.service.PostQueryService;
import com.votogether.global.jwt.Auth;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RequiredArgsConstructor
@RequestMapping("/posts")
@RestController
public class PostQueryController implements PostQueryControllerDocs {

    private final PostQueryService postQueryService;

    @GetMapping
    public ResponseEntity<List<PostResponse>> getPosts(
            @RequestParam @PositiveOrZero(message = "페이지는 0이상 정수만 가능합니다.") final int page,
            @RequestParam final PostClosingType postClosingType,
            @RequestParam final PostSortType postSortType,
            @RequestParam(name = "category", required = false) final Long categoryId,
            @Auth final Member loginMember
    ) {
        final List<PostResponse> response =
                postQueryService.getPosts(page, postClosingType, postSortType, categoryId, loginMember);
        return ResponseEntity.ok(response);
    }

    @GetMapping("{postId}")
    public ResponseEntity<PostResponse> getPost(
            @PathVariable @Positive(message = "게시글 ID는 양의 정수만 가능합니다.") final Long postId,
            @Auth final Member loginMember
    ) {
        final PostResponse response = postQueryService.getPost(postId, loginMember);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/search")
    public ResponseEntity<List<PostResponse>> searchPosts(
            @RequestParam final String keyword,
            @RequestParam @PositiveOrZero(message = "페이지는 0이상 정수만 가능합니다.") final int page,
            @RequestParam final PostClosingType postClosingType,
            @RequestParam final PostSortType postSortType,
            @Auth final Member loginMember
    ) {
        final List<PostResponse> response =
                postQueryService.searchPosts(keyword, page, postClosingType, postSortType, loginMember);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<List<PostResponse>> getPostsWrittenByMe(
            @RequestParam @PositiveOrZero(message = "페이지는 0이상 정수만 가능합니다.") final int page,
            @RequestParam final PostClosingType postClosingType,
            @RequestParam final PostSortType postSortType,
            @Auth final Member loginMember
    ) {
        final List<PostResponse> response =
                postQueryService.getPostsWrittenByMe(page, postClosingType, postSortType, loginMember);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/votes/me")
    public ResponseEntity<List<PostResponse>> getPostsVotedByMe(
            @RequestParam @PositiveOrZero(message = "페이지는 0이상 정수만 가능합니다.") final int page,
            @RequestParam final PostClosingType postClosingType,
            @RequestParam final PostSortType postSortType,
            @Auth final Member loginMember
    ) {
        final List<PostResponse> response =
                postQueryService.getPostsVotedByMe(page, postClosingType, postSortType, loginMember);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{postId}/options")
    public ResponseEntity<VoteOptionStatisticsResponse> getVoteStatistics(
            @PathVariable @Positive(message = "게시글 ID는 양의 정수만 가능합니다.") final Long postId,
            @Auth final Member loginMember
    ) {
        final VoteOptionStatisticsResponse response = postQueryService.getVoteStatistics(postId, loginMember);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{postId}/options/{optionId}")
    public ResponseEntity<VoteOptionStatisticsResponse> getVoteOptionStatistics(
            @PathVariable @Positive(message = "게시글 ID는 양의 정수만 가능합니다.") final Long postId,
            @PathVariable @Positive(message = "게시글 옵션 ID는 양의 정수만 가능합니다.") final Long optionId,
            @Auth final Member loginMember
    ) {
        final VoteOptionStatisticsResponse response =
                postQueryService.getVoteOptionStatistics(postId, optionId, loginMember);
        return ResponseEntity.ok(response);
    }

}
