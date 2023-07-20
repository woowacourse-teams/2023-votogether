package com.votogether.fixtures;

import com.votogether.domain.category.entity.Category;

public class CategoryFixtures {

    public static final Category DEVELOP = Category.builder()
            .name("개발")
            .build();

    public static final Category FOOD = Category.builder()
            .name("음식")
            .build();

}
