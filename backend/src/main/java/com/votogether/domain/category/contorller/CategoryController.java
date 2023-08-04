package com.votogether.domain.category.contorller;

import com.votogether.domain.category.dto.response.CategoryResponse;
import com.votogether.domain.category.service.CategoryService;
import com.votogether.domain.member.entity.Member;
import com.votogether.global.jwt.Auth;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name = "카테고리", description = "카테고리 API")
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @Operation(summary = "카테고리 목록 조회하기", description = "전체 카테고리 목록을 조회한다.")
    @ApiResponse(responseCode = "200", description = "조회 성공")
    @GetMapping("/guest")
    public ResponseEntity<List<CategoryResponse>> getAllCategories() {
        final List<CategoryResponse> categories = categoryService.getAllCategories();
        return ResponseEntity.status(HttpStatus.OK).body(categories);
    }

    @Operation(summary = "선호 카테고리 추가하기", description = "선호하는 카테고리를 선호 카테고리 목록에 추가한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "추가 성공"),
            @ApiResponse(responseCode = "400", description = "해당 카테고리가 추가가 되어 있어 중복 추가 실패"),
            @ApiResponse(responseCode = "404", description = "해당 카테고리가 존재하지 않아 추가 실패"),
    })
    @PostMapping("/{categoryId}/like")
    public ResponseEntity<Void> addFavoriteCategory(@Auth final Member member, @PathVariable final Long categoryId) {
        categoryService.addFavoriteCategory(member, categoryId);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @Operation(summary = "선호 카테고리 삭제하기", description = "선호하는 카테고리를 선호 카테고리 목록에서 삭제한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "삭제 성공"),
            @ApiResponse(responseCode = "400", description = "선호하는 카테고리가 아니여서 삭제 실패"),
            @ApiResponse(responseCode = "404", description = "해당 카테고리가 존재하지 않아 삭제 실패")
    })
    @DeleteMapping("/{categoryId}/like")
    public ResponseEntity<Void> removeFavoriteCategory(@Auth final Member member, @PathVariable final Long categoryId) {
        categoryService.removeFavoriteCategory(member, categoryId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @Operation(summary = "회원으로 모든 카테고리 목록 조회하기", description = "회원의 선호하는 카테고리와 전체 카테고리 목록을 조회한다.")
    @ApiResponse(responseCode = "200", description = "조회 성공")
    @GetMapping
    public ResponseEntity<List<CategoryResponse>> getAllCategories(@Auth final Member member) {
        final List<CategoryResponse> categories = categoryService.getAllCategories(member);
        return ResponseEntity.status(HttpStatus.OK).body(categories);
    }

}
