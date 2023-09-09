package com.votogether.domain.post.controller;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.dto.request.post.PostCreateRequest;
import com.votogether.domain.post.dto.request.post.PostUpdateRequest;
import com.votogether.global.exception.ExceptionResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

@Tag(name = "게시글", description = "게시글 API")
public interface PostControllerDocs {

    @Operation(summary = "게시글 작성", description = "게시글을 작성한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "게시글 작성 성공"),
            @ApiResponse(
                    responseCode = "400",
                    description = "잘못된 입력입니다.",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<Void> save(
            final PostCreateRequest request,
            final List<MultipartFile> contentImages,
            final List<MultipartFile> optionImages,
            final Member member
    );

    @Operation(summary = "게시글 수정", description = "게시글을 수정한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "게시글 수정 성공"),
            @ApiResponse(
                    responseCode = "400",
                    description = "잘못된 입력",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<Void> update(
            @Parameter(description = "게시글 ID", example = "1") final Long postId,
            final PostUpdateRequest request,
            final List<MultipartFile> contentImages,
            final List<MultipartFile> optionImages,
            final Member member
    );

    @Operation(summary = "게시글 조기 마감", description = "게시글을 조기 마감한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "게시물 조기 마감 성공."),
            @ApiResponse(
                    responseCode = "400",
                    description = "잘못된 입력",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<Void> closePostEarly(
            @Parameter(description = "게시글 ID", example = "1") final Long postId,
            final Member loginMember
    );

    @Operation(summary = "게시글 삭제", description = "게시글을 삭제한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "게시물 삭제 성공"),
            @ApiResponse(
                    responseCode = "400",
                    description = "잘못된 입력",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<Void> delete(
            @Parameter(description = "게시글 ID", example = "1") final Long postId
    );

}
