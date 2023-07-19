package com.votogether.domain.category.dto.response;

import com.votogether.domain.category.entity.Category;

public record CategoryResponse(
        Long id,
        String name,
        boolean isFavorite
) {

    public CategoryResponse(final Category category) {
        this(category.getId(), category.getName(), false);
    }

}
