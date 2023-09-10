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
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import org.springframework.http.ResponseEntity;

@Tag(name = "게시글 커맨드", description = "게시글 커맨드 API")
public interface PostCommandControllerDocs {

    @Operation(summary = "게시글 작성", description = "게시글을 작성한다.")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "201",
                    description = "게시글 작성 성공"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "정상적이지 않은 요청",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<Void> createPost(
            @Valid final PostCreateRequest postCreateRequest,
            final Member loginMember
    );

    @Operation(summary = "게시글 수정", description = "게시글을 수정한다.")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "게시글 수정 성공"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = """
                            1.게시글 ID가 양의 정수가 아닌 경우
                                               
                            2.정상적이지 않은 요청
                                                        
                            3.게시글이 블라인드 처리된 경우
                                                        
                            4.게시글 작성자가 아닌 경우
                            """,
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "존재하지 않는 게시글",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<Void> updatePost(
            @Parameter(description = "게시글 ID", example = "1")
            @Positive(message = "게시글 ID는 양의 정수만 가능합니다.") final Long postId,
            @Valid final PostUpdateRequest postUpdateRequest,
            final Member loginMember
    );

    @Operation(summary = "게시글 조기 마감", description = "게시글을 조기 마감한다.")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "게시글 조기 마감 성공"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = """
                            1.게시글 ID가 양의 정수가 아닌 경우
                                                        
                            2.게시글이 블라인드 처리된 경우
                                                        
                            3.게시글 작성자가 아닌 경우
                            """,
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "존재하지 않는 게시글",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<Void> closePostEarly(
            @Parameter(description = "게시글 ID", example = "1")
            @Positive(message = "게시글 ID는 양의 정수만 가능합니다.") final Long postId,
            final Member loginMember
    );

    @Operation(summary = "게시글 삭제", description = "게시글을 삭제한다.")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "204",
                    description = "게시글 삭제 성공"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = """
                            1.게시글 ID가 양의 정수가 아닌 경우
                                                        
                            2.게시글이 블라인드 처리된 경우
                                                        
                            3.게시글 작성자가 아닌 경우
                                                        
                            4.삭제할 수 없는 투표 수가 존재하는 게시글인 경우
                            """,
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "존재하지 않는 게시글",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<Void> deletePost(
            @Parameter(description = "게시글 ID", example = "1")
            @Positive(message = "게시글 ID는 양의 정수만 가능합니다.") final Long postId,
            final Member loginMember
    );

}
