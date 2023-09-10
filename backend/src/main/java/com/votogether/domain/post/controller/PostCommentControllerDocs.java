package com.votogether.domain.post.controller;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.dto.request.comment.CommentCreateRequest;
import com.votogether.domain.post.dto.request.comment.CommentUpdateRequest;
import com.votogether.domain.post.dto.response.comment.CommentResponse;
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
import java.util.List;
import org.springframework.http.ResponseEntity;

@Tag(name = "게시글 댓글", description = "게시글 댓글 API")
public interface PostCommentControllerDocs {

    @Operation(summary = "게시글 댓글 목록 조회", description = "게시글 댓글 목록을 조회한다.")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "게시글 댓글 목록 조회 성공"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = """
                            1.양의 정수가 아닌 게시글 ID
                                                        
                            2.게시글이 블라인드 처리된 경우
                            """,
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "존재하지 않는 게시글",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<List<CommentResponse>> getComments(
            @Parameter(description = "댓글 작성 게시글 ID", example = "1")
            @Positive(message = "게시글 ID는 양의 정수만 가능합니다.") final Long postId
    );

    @Operation(summary = "게시글 댓글 작성", description = "게시글 댓글을 작성한다.")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "201",
                    description = "게시글 댓글 작성 성공"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = """
                            1.양의 정수가 아닌 게시글 ID
                                                        
                            2.존재하지 않는 댓글 내용
                                                        
                            3.게시글이 블라인드 처리된 경우
                            """,
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "존재하지 않는 게시글",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<Void> createComment(
            @Parameter(description = "댓글 작성 게시글 ID", example = "1")
            @Positive(message = "게시글 ID는 양의 정수만 가능합니다.") final Long postId,
            @Valid final CommentCreateRequest commentCreateRequest,
            final Member loginMember
    );

    @Operation(summary = "게시글 댓글 수정", description = "게시글 댓글을 수정한다.")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "게시글 댓글 수정 성공"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = """
                            1.양의 정수가 아닌 게시글 ID
                                                        
                            2.양의 정수가 아닌 댓글 ID
                                                        
                            3.존재하지 않는 댓글 내용
                                                        
                            4.게시글이 블라인드 처리된 경우
                                                        
                            5.댓글이 블라인드 처리된 경우
                                                        
                            6.게시글의 댓글이 아닌 경우
                                                        
                            7.댓글 작성자가 아닌 경우
                            """,
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = """
                            1.존재하지 않는 게시글
                                                        
                            2.존재하지 않는 댓글
                            """,
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<Void> updateComment(
            @Parameter(description = "게시글 ID", example = "1")
            @Positive(message = "게시글 ID는 양의 정수만 가능합니다.") final Long postId,
            @Parameter(description = "댓글 ID", example = "1")
            @Positive(message = "댓글 ID는 양의 정수만 가능합니다.") final Long commentId,
            @Valid final CommentUpdateRequest commentUpdateRequest,
            final Member loginMember
    );

    @Operation(summary = "게시글 댓글 삭제", description = "게시글 댓글을 삭제한다.")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "204",
                    description = "게시글 댓글 삭제 성공"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = """
                            1.양의 정수가 아닌 게시글 ID
                                                        
                            2.양의 정수가 아닌 댓글 ID
                                                        
                            3.게시글이 블라인드 처리된 경우
                                                        
                            4.댓글이 블라인드 처리된 경우
                                                        
                            5.게시글의 댓글이 아닌 경우
                                                        
                            6.댓글 작성자가 아닌 경우
                            """,
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = """
                            1.존재하지 않는 게시글
                                                        
                            2.존재하지 않는 댓글
                            """,
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<Void> deleteComment(
            @Parameter(description = "게시글 ID", example = "1")
            @Positive(message = "게시글 ID는 양의 정수만 가능합니다.") final Long postId,
            @Parameter(description = "댓글 ID", example = "1")
            @Positive(message = "댓글 ID는 양의 정수만 가능합니다.") final Long commentId,
            final Member loginMember
    );

}
