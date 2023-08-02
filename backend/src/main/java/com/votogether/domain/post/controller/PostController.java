package com.votogether.domain.post.controller;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.dto.request.PostCreateRequest;
import com.votogether.domain.post.dto.response.detail.PostDetailResponse;
import com.votogether.domain.post.dto.response.PostResponse;
import com.votogether.domain.post.dto.response.vote.VoteOptionStatisticsResponse;
import com.votogether.domain.post.entity.PostClosingType;
import com.votogether.domain.post.entity.PostSortType;
import com.votogether.domain.post.service.PostService;
import com.votogether.global.jwt.Auth;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Tag(name = "게시글", description = "게시글 관련 API")
@RequiredArgsConstructor
@RequestMapping("/posts")
@RestController
public class PostController {

    private final PostService postService;

    @Operation(summary = "게시글 작성", description = "게시글을 저장한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "게시글 생성 성공"),
            @ApiResponse(responseCode = "400", description = "잘못된 입력입니다.")
    })
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> save(
            @RequestPart @Valid final PostCreateRequest request,
            @RequestPart final List<MultipartFile> contentImages,
            @RequestPart final List<MultipartFile> optionImages,
            @Auth final Member member
    ) {
        System.out.println("request = " + request);
        final long postId = postService.save(request, member, contentImages, optionImages);
        return ResponseEntity.created(URI.create("/posts/" + postId)).build();
    }

    @Operation(summary = "전체 게시글 조회", description = "게시글을 조회한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "게시글 조회 성공"),
            @ApiResponse(responseCode = "400", description = "잘못된 입력입니다.")
    })
    @GetMapping
    public ResponseEntity<List<PostResponse>> getAllPost(
            final int page,
            final PostClosingType postClosingType,
            final PostSortType postSortType,
            @Auth final Member member
    ) {
        final List<PostResponse> responses =
                postService.getAllPostBySortTypeAndClosingType(member, page, postClosingType, postSortType);

        return ResponseEntity.ok(responses);
    }

    @Operation(summary = "게시글 상세 조회", description = "한 게시글의 상세를 조회한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "게시글 조회 성공"),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 게시글")
    })
    @GetMapping("{postId}")
    public ResponseEntity<PostDetailResponse> getPost(
            @PathVariable final Long postId,
            @Auth final Member member
    ) {
        final PostDetailResponse response = postService.getPostById(postId, member);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "게시글 투표 통계 조회", description = "게시글 투표에 대한 전체 통계를 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "게시글 투표 통계 조회 성공"),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 게시글")
    })
    @GetMapping("/{postId}/options")
    public ResponseEntity<VoteOptionStatisticsResponse> getVoteStatistics(
            @PathVariable final long postId,
            @Auth final Member member
    ) {
        final VoteOptionStatisticsResponse response = postService.getVoteStatistics(postId, member);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "게시글 투표 선택지 통계 조회", description = "게시글 특정 투표 선택지에 대한 통계를 조회한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "게시글 투표 선택지 통계 조회 성공"),
            @ApiResponse(responseCode = "400", description = "게시글 투표 옵션이 게시글에 속하지 않아 조회 실패"),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 게시글이거나 게시글 투표 옵션")
    })
    @GetMapping("/{postId}/options/{optionId}")
    public ResponseEntity<VoteOptionStatisticsResponse> getVoteOptionStatistics(
            @PathVariable final long postId,
            @PathVariable final long optionId,
            @Auth final Member member
    ) {
        final VoteOptionStatisticsResponse response = postService.getVoteOptionStatistics(postId, optionId, member);
        return ResponseEntity.ok(response);
    }

}

