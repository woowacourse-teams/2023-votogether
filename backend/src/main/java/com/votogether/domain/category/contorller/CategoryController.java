package com.votogether.domain.category.contorller;

import com.votogether.domain.category.dto.response.CategoryResponse;
import com.votogether.domain.category.service.CategoryService;
import com.votogether.domain.member.entity.Member;
import com.votogether.global.jwt.Auth;
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

@RequiredArgsConstructor
@RequestMapping("/categories")
@RestController
public class CategoryController implements CategoryControllerDocs {

    private final CategoryService categoryService;

    @GetMapping("/guest")
    public ResponseEntity<List<CategoryResponse>> getAllCategories() {
        final List<CategoryResponse> categories = categoryService.getAllCategories();
        return ResponseEntity.status(HttpStatus.OK).body(categories);
    }

    @GetMapping
    public ResponseEntity<List<CategoryResponse>> getAllCategories(@Auth final Member member) {
        final List<CategoryResponse> categories = categoryService.getAllCategories(member);
        return ResponseEntity.status(HttpStatus.OK).body(categories);
    }

    @PostMapping("/{categoryId}/like")
    public ResponseEntity<Void> addFavoriteCategory(@PathVariable final Long categoryId, @Auth final Member member) {
        categoryService.addFavoriteCategory(member, categoryId);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/{categoryId}/like")
    public ResponseEntity<Void> removeFavoriteCategory(@PathVariable final Long categoryId, @Auth final Member member) {
        categoryService.removeFavoriteCategory(member, categoryId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
