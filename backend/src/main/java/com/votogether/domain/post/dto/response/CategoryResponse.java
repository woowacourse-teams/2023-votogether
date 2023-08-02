package com.votogether.domain.post.dto.response;

import com.votogether.domain.category.entity.Category;

public record CategoryResponse(
        long id,
        String name
) {

    public static CategoryResponse of(Category category) {
        return new CategoryResponse(category.getId(), category.getName());
    }

}
