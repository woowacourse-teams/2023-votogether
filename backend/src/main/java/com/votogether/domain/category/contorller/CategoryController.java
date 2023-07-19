package com.votogether.domain.category.contorller;

import com.votogether.domain.category.dto.response.CategoryResponse;
import com.votogether.domain.category.service.CategoryService;
import com.votogether.domain.member.entity.Member;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @Operation(summary = "카테고리 조회하기", description = "전체 카테고리 목록을 조회한다.")
    @ApiResponse(responseCode = "200", description = "조회 성공")
    @GetMapping("/guest")
    public ResponseEntity<List<CategoryResponse>> getAllCategories() {
        List<CategoryResponse> categories = categoryService.getAllCategories();
        return ResponseEntity.status(HttpStatus.OK).body(categories);
    }

    @Operation(summary = "선호 카테고리 추가하기", description = "선호하는 카테고리를 선호 카테고리 목록에 추가한다.")
    @ApiResponse(responseCode = "201", description = "추가 성공")
    @PostMapping("/{categoryId}/like")
    public ResponseEntity<Void> addFavoriteCategory(final Member member, @PathVariable final Long categoryId) {
        categoryService.addFavoriteCategory(member, categoryId);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

}
