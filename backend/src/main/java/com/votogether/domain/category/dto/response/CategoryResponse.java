package com.votogether.domain.category.dto.response;

import com.votogether.domain.category.entity.Category;
import lombok.Builder;
import lombok.Getter;

@Getter
public class CategoryResponse {

    private final Long id;
    private final String name;
    private final boolean isFavorite;

    @Builder
    private CategoryResponse(
            final Long id,
            final String name,
            final boolean isFavorite
    ) {
        this.id = id;
        this.name = name;
        this.isFavorite = isFavorite;
    }

    public static CategoryResponse from(final Category category) {
        return CategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .isFavorite(false)
                .build();
    }

}
