package com.votogether.domain.category.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.votogether.domain.category.dto.response.CategoryResponse;
import com.votogether.domain.category.entity.Category;
import com.votogether.domain.category.repository.CategoryRepository;
import com.votogether.domain.member.entity.Gender;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.MemberCategory;
import com.votogether.domain.member.entity.SocialType;
import com.votogether.domain.member.repository.MemberCategoryRepository;
import com.votogether.domain.member.repository.MemberRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
class CategoryServiceTest {

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
        Category category = Category.builder()
                .name("개발")
                .build();

        categoryRepository.save(category);

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
        Category category = Category.builder()
                .name("개발")
                .build();

        Member member = Member.builder()
                .gender(Gender.MALE)
                .point(0)
                .socialType(SocialType.GOOGLE)
                .nickname("user1")
                .socialId("kakao@gmail.com")
                .birthDate(LocalDateTime.of(1995, 7, 12, 0, 0))
                .build();

        categoryRepository.save(category);
        memberRepository.save(member);

        Long categoryId = category.getId();

        // when
        categoryService.addFavoriteCategory(member, categoryId);

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
            Category category = Category.builder()
                    .name("개발")
                    .build();

            Member member = Member.builder()
                    .gender(Gender.MALE)
                    .point(0)
                    .socialType(SocialType.GOOGLE)
                    .nickname("user1")
                    .socialId("kakao@gmail.com")
                    .birthDate(LocalDateTime.of(1995, 7, 12, 0, 0))
                    .build();

            MemberCategory memberCategory = MemberCategory.builder()
                    .member(member)
                    .category(category)
                    .build();

            categoryRepository.save(category);
            memberRepository.save(member);
            memberCategoryRepository.save(memberCategory);

            Long categoryId = category.getId();

            // when
            categoryService.removeFavoriteCategory(member, categoryId);

            // then
            Optional<MemberCategory> foundMemberCategory =
                    memberCategoryRepository.findByMemberAndCategory(member, category);
            assertThat(foundMemberCategory).isEmpty();
        }

        @Test
        @DisplayName("선호하는 카테고리에 없는 카테고리를 삭제하는 경우 예외가 발생한다.")
        void removeFavoriteCategoryException() {
            // given
            Category category = Category.builder()
                    .name("개발")
                    .build();

            Member member = Member.builder()
                    .gender(Gender.MALE)
                    .point(0)
                    .socialType(SocialType.GOOGLE)
                    .nickname("user1")
                    .socialId("kakao@gmail.com")
                    .birthDate(LocalDateTime.of(1995, 7, 12, 0, 0))
                    .build();

            categoryRepository.save(category);
            memberRepository.save(member);

            // when, then
            assertThatThrownBy(() -> categoryService.removeFavoriteCategory(member, category.getId()))
                    .isInstanceOf(IllegalArgumentException.class)
                    .hasMessage("해당 카테고리는 선호 카테고리가 아닙니다.");
        }

    }

}
