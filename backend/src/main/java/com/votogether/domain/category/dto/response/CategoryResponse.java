package com.votogether.domain.category.dto.response;

import com.votogether.domain.category.entity.Category;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

@Schema(description = "카테고리 응답")
public record CategoryResponse(
        @Schema(description = "카테고리 ID", example = "1")
        Long id,

        @Schema(description = "카테고리 이름", example = "개발")
        String name,

        @Schema(description = "선호 여부", example = "true")
        boolean isFavorite
) {

    public CategoryResponse(final Category category, final boolean isFavorite) {
        this(category.getId(), category.getName(), isFavorite);
    }

    public CategoryResponse(final Category category, final List<Category> favoriteCategories) {
        this(category.getId(), category.getName(), favoriteCategories.contains(category));
    }

}
