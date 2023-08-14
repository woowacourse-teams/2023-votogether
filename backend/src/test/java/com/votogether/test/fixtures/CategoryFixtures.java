package com.votogether.test.fixtures;

import com.votogether.domain.category.entity.Category;

public enum CategoryFixtures {

    DEVELOP("개발"),
    FOOD("음식"),
    ;

    private final String name;

    CategoryFixtures(final String name) {
        this.name = name;
    }

    public Category get() {
        return Category.builder()
                .name(name)
                .build();
    }

}
