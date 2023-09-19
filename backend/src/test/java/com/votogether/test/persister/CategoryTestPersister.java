package com.votogether.test.persister;

import com.votogether.domain.category.entity.Category;
import com.votogether.domain.category.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;

@RequiredArgsConstructor
@Persister
public class CategoryTestPersister {

    private final CategoryRepository categoryRepository;

    public CategoryBuilder builder() {
        return new CategoryBuilder();
    }

    public final class CategoryBuilder {

        private String name;

        public CategoryBuilder name(String name) {
            this.name = name;
            return this;
        }

        public Category save() {
            Category category = Category.builder()
                    .name(name == null ? RandomStringUtils.random(5, true, false) : name)
                    .build();
            return categoryRepository.save(category);
        }

    }

}
