package com.votogether.domain.post.controller;

import com.votogether.domain.member.entity.Gender;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.SocialType;
import com.votogether.domain.post.dto.request.PostCreateRequest;
import com.votogether.domain.post.dto.response.VoteOptionStatisticsResponse;
import com.votogether.domain.post.service.PostService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
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
            @ApiResponse(responseCode = "201", description = "게시물 생성되었습니다."),
            @ApiResponse(responseCode = "400", description = "잘못된 입력입니다."),
            @ApiResponse(responseCode = "500", description = "인터넷 서버 오류입니다.")
    })
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> save(
            @RequestPart final PostCreateRequest request,
            @RequestPart final List<MultipartFile> images
    ) {
        // TODO : 일단 돌아가게 하기 위한 member 저장 (실제 어플에선 삭제될 코드)
        final Member member = Member.builder()
                .socialType(SocialType.KAKAO)
                .socialId("tjdtls690")
                .nickname("Abel")
                .gender(Gender.MALE)
                .birthday("0718")
                .ageRange("10~14")
                .socialType(SocialType.KAKAO)
                .socialId("tjdtls690")
                .point(100)
                .ageRange("30~39")
                .birthday("0101")
                .build();

        final Long postId = postService.save(request, member, images);
        return ResponseEntity.created(URI.create("/posts/" + postId)).build();
    }

    @Operation(summary = "게시글 투표 선택지 통계 조회", description = "게시글 특정 투표 선택지에 대한 통계를 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "게시글 투표 선택지 통계 조회 성공"),
            @ApiResponse(responseCode = "400", description = "게시글 투표 옵션이 게시글에 속하지 않아 조회 실패"),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 게시글이거나 게시글 투표 옵션")
    })
    @GetMapping(value = "/{postId}/options/{optionId}")
    public ResponseEntity<VoteOptionStatisticsResponse> getVoteOptionStatistics(
            @PathVariable final Long postId,
            @PathVariable final Long optionId
    ) {
        final VoteOptionStatisticsResponse response = postService.getVoteOptionStatistics(postId, optionId);
        return ResponseEntity.ok(response);
    }

}

