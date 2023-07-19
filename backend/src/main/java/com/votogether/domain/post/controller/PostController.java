package com.votogether.domain.post.controller;

import com.votogether.domain.member.entity.Gender;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.SocialType;
import com.votogether.domain.post.dto.request.PostCreateRequest;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.service.PostService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.net.URI;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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
                .socialType(SocialType.GOOGLE)
                .socialId("tjdtls690")
                .nickname("Abel")
                .gender(Gender.MALE)
                .point(100)
                .birthDate(LocalDateTime.now())
                .build();

        final Long postId = postService.save(request, member, images);
        return ResponseEntity.created(URI.create("/posts/" + postId)).build();
    }


    // TODO: 2023/07/19 응답값 DTO로 변환해주기
    @GetMapping("/votes/me")
    public ResponseEntity<List<Post>> getPostsVotedOn(final Member member) {
        List<Post> postsVotedOn = postService.getPostsVotedOn(member);
        return ResponseEntity.status(HttpStatus.OK).body(postsVotedOn);
    }

}

