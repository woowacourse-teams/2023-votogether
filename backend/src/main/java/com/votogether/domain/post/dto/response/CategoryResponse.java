package com.votogether.domain.post.dto.response;

import com.votogether.domain.category.entity.Category;

public record CategoryResponse(
        Long id,
        String name
) {

    public CategoryResponse(final Category category) {
        this(category.getId(), category.getName());
    }

    @Override
    public String toString() {
        return "CategoryResponse{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }

}
