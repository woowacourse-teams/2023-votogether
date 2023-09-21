package com.votogether.domain.post.dto.response.post;

import com.votogether.domain.category.entity.Category;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "카테고리 응답")
public record CategoryResponse(
        @Schema(description = "카테고리 ID", example = "1")
        Long id,

        @Schema(description = "카테고리 이름", example = "개발")
        String name
) {

    public static CategoryResponse from(Category category) {
        return new CategoryResponse(category.getId(), category.getName());
    }

}
