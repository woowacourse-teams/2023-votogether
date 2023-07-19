package com.votogether.domain.category.dto.response;

import com.votogether.domain.category.entity.Category;
import java.util.List;

public record CategoryResponse(
        Long id,
        String name,
        boolean isFavorite
) {

    public CategoryResponse(final Category category, final boolean isFavorite) {
        this(category.getId(), category.getName(), isFavorite);
    }

}
