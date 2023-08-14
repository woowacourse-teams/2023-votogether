package com.votogether.domain.post.dto.response.post;

import com.votogether.domain.category.entity.Category;

public record CategoryResponse(
        Long id,
        String name
) {

    public static CategoryResponse of(Category category) {
        return new CategoryResponse(category.getId(), category.getName());
    }

}
