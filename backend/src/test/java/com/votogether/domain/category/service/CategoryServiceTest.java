package com.votogether.domain.category.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.votogether.domain.category.dto.response.CategoryResponse;
import com.votogether.domain.category.entity.Category;
import com.votogether.domain.category.repository.CategoryRepository;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.MemberCategory;
import com.votogether.domain.member.repository.MemberCategoryRepository;
import com.votogether.domain.member.repository.MemberRepository;
import com.votogether.global.exception.BadRequestException;
import com.votogether.test.ServiceTest;
import com.votogether.test.fixtures.CategoryFixtures;
import com.votogether.test.fixtures.MemberFixtures;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class CategoryServiceTest extends ServiceTest {

    @Autowired
    CategoryService categoryService;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    MemberCategoryRepository memberCategoryRepository;

    @Autowired
    MemberRepository memberRepository;

    @Test
    @DisplayName("모든 카테고리를 가져온다.")
    void getAllCategories() {
        // given
        categoryRepository.save(CategoryFixtures.DEVELOP.get());

        // when
        List<CategoryResponse> categories = categoryService.getAllCategories();

        // then
        assertAll(
                () -> assertThat(categories.get(0).id()).isNotNull(),
                () -> assertThat(categories.get(0).name()).isEqualTo("개발"),
                () -> assertThat(categories.get(0).isFavorite()).isFalse()
        );
    }

    @Test
    @DisplayName("선호하는 카테고리를 선호 카테고리 목록에 추가한다.")
    void addFavoriteCategory() {
        // given
        Member member = memberRepository.save(MemberFixtures.MALE_20.get());
        Category category = categoryRepository.save(CategoryFixtures.DEVELOP.get());

        // when
        categoryService.addFavoriteCategory(member, category.getId());

        // then
        MemberCategory memberCategory = memberCategoryRepository.findByMemberAndCategory(member, category).get();

        assertAll(
                () -> assertThat(memberCategory.getMember()).isSameAs(member),
                () -> assertThat(memberCategory.getCategory()).isSameAs(category)
        );
    }

    @Nested
    @DisplayName("카테고리 삭제")
    class Deleting {

        @Test
        @DisplayName("선호하는 카테고리를 선호 카테고리 목록에 삭제한다.")
        void removeFavoriteCategory() {
            // given
            Member member = memberRepository.save(MemberFixtures.MALE_20.get());
            Category category = categoryRepository.save(CategoryFixtures.DEVELOP.get());
            MemberCategory memberCategory = MemberCategory.builder()
                    .member(member)
                    .category(category)
                    .build();

            memberCategoryRepository.save(memberCategory);

            // when
            categoryService.removeFavoriteCategory(member, category.getId());

            // then
            Optional<MemberCategory> foundMemberCategory =
                    memberCategoryRepository.findByMemberAndCategory(member, category);
            assertThat(foundMemberCategory).isEmpty();
        }

        @Test
        @DisplayName("선호하는 카테고리에 없는 카테고리를 삭제하는 경우 예외가 발생한다.")
        void removeFavoriteCategoryException() {
            // given
            Member member = memberRepository.save(MemberFixtures.MALE_20.get());
            Category category = categoryRepository.save(CategoryFixtures.DEVELOP.get());

            // when, then
            assertThatThrownBy(() -> categoryService.removeFavoriteCategory(member, category.getId()))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("해당 카테고리는 선호 카테고리가 아닙니다.");
        }

    }

}
