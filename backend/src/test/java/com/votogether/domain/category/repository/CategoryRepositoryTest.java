package com.votogether.domain.category.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.votogether.RepositoryTest;
import com.votogether.domain.category.entity.Category;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;

@RepositoryTest
class CategoryRepositoryTest {

    @Autowired
    CategoryRepository categoryRepository;

    @Nested
    @DisplayName("카테고리 저장")
    class Saving {

        @Test
        @DisplayName("카테고리를 저장한다.")
        void save() {
            // given
            Category category = Category.builder()
                    .name("개발")
                    .build();

            // when
            categoryRepository.save(category);

            // then
            assertThat(category.getId()).isNotNull();
        }

        @Test
        @DisplayName("같은 이름의 카테고리를 저장할 시 에러가 발생한다.")
        void saveButException() {
            // given
            Category category1 = Category.builder()
                    .name("개발")
                    .build();
            Category category2 = Category.builder()
                    .name("개발")
                    .build();
            categoryRepository.save(category1);

            // when & then
            assertThatThrownBy(() -> categoryRepository.save(category2))
                    .isInstanceOf(DataIntegrityViolationException.class);
        }

    }

    @Nested
    @DisplayName("카테고리 조회")
    class Finding {

        @Test
        @DisplayName("모든 카테고리를 조회한다.")
        void findAllCategories() {
            // given
            Category category1 = Category.builder()
                    .name("개발")
                    .build();
            Category category2 = Category.builder()
                    .name("음식")
                    .build();

            categoryRepository.save(category1);
            categoryRepository.save(category2);

            // when
            List<Category> categories = categoryRepository.findAll();

            // then
            assertAll(
                    () -> assertThat(categories).hasSize(2),
                    () -> assertThat(categories.get(0).getName()).isEqualTo("개발"),
                    () -> assertThat(categories.get(1).getName()).isEqualTo("음식"));
        }

        @Test
        @DisplayName("아이디를 통해 카테고리를 조회한다.")
        void findById() {
            // given
            Category category = Category.builder()
                    .name("개발")
                    .build();
            categoryRepository.save(category);

            // when
            Category findCategory = categoryRepository.findById(category.getId()).get();

            // then
            assertThat(findCategory).isSameAs(category);
        }
    }

}
