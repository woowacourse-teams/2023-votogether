package com.votogether.domain.category.contorller;

import com.votogether.domain.category.dto.response.CategoryResponse;
import com.votogether.domain.member.entity.Member;
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

@Tag(name = "카테고리", description = "카테고리 API")
public interface CategoryControllerDocs {

    @Operation(summary = "[비회원] 전체 카테고리 목록 조회", description = "[비회원] 전체 카테고리 목록을 조회한다.")
    @ApiResponse(responseCode = "200", description = "전체 카테고리 목록 조회 성공")
    ResponseEntity<List<CategoryResponse>> getAllCategories();

    @Operation(summary = "[회원] 전체 카테고리 목록 조회", description = "[회원] 전체 카테고리 목록을 조회한다.")
    @ApiResponse(responseCode = "200", description = "전체 카테고리 목록 조회 성공")
    ResponseEntity<List<CategoryResponse>> getAllCategories(final Member member);

    @Operation(summary = "선호 카테고리 추가", description = "선호 카테고리를 추가한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "선호 카테고리 추가 성공"),
            @ApiResponse(
                    responseCode = "400",
                    description = "중복된 선호 카테고리",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "존재하지 않는 카테고리",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            ),
    })
    ResponseEntity<Void> addFavoriteCategory(
            @Parameter(description = "카테고리 ID", example = "1") final Long categoryId,
            final Member member
    );

    @Operation(summary = "선호 카테고리 삭제", description = "선호하는 카테고리 삭제한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "선호 카테고리 삭제 성공"),
            @ApiResponse(
                    responseCode = "400",
                    description = "선호하지 않는 카테고리",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "존재하지 않는 카테고리",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<Void> removeFavoriteCategory(
            @Parameter(description = "카테고리 ID", example = "1") final Long categoryId,
            final Member member
    );

}

