package com.votogether.domain.post.controller;

import com.votogether.domain.post.dto.response.post.PostRankingResponse;
import com.votogether.domain.post.dto.response.post.PostResponse;
import com.votogether.domain.post.entity.vo.PostClosingType;
import com.votogether.domain.post.entity.vo.PostSortType;
import com.votogether.domain.post.service.PostGuestService;
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
public class PostGuestController implements PostGuestControllerDocs {

    private final PostGuestService postGuestService;

    @GetMapping("/guest")
    public ResponseEntity<List<PostResponse>> getPosts(
            @RequestParam @PositiveOrZero(message = "페이지는 0이상 정수만 가능합니다.") final int page,
            @RequestParam final PostClosingType postClosingType,
            @RequestParam final PostSortType postSortType,
            @RequestParam(name = "category", required = false) final Long categoryId
    ) {
        final List<PostResponse> response = postGuestService.getPosts(page, postClosingType, postSortType, categoryId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("{postId}/guest")
    public ResponseEntity<PostResponse> getPost(
            @PathVariable @Positive(message = "게시글 ID는 양의 정수만 가능합니다.") final Long postId
    ) {
        final PostResponse response = postGuestService.getPost(postId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/search/guest")
    public ResponseEntity<List<PostResponse>> searchPosts(
            @RequestParam final String keyword,
            @RequestParam @PositiveOrZero(message = "페이지는 0이상 정수만 가능합니다.") final int page,
            @RequestParam final PostClosingType postClosingType,
            @RequestParam final PostSortType postSortType
    ) {
        final List<PostResponse> responses = postGuestService.searchPosts(keyword, page, postClosingType, postSortType);
        return ResponseEntity.ok(responses);
    }

    @GetMapping("ranking/popular/guest")
    public ResponseEntity<List<PostRankingResponse>> getRanking() {
        final List<PostRankingResponse> responses = postGuestService.getRanking();
        return ResponseEntity.ok(responses);
    }

}
