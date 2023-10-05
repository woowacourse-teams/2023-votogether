package com.votogether.domain.member.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.votogether.domain.category.entity.Category;
import com.votogether.domain.category.repository.CategoryRepository;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.MemberCategory;
import com.votogether.test.RepositoryTest;
import com.votogether.test.fixtures.CategoryFixtures;
import com.votogether.test.fixtures.MemberFixtures;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class MemberCategoryRepositoryTest extends RepositoryTest {

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    MemberCategoryRepository memberCategoryRepository;

    @Test
    @DisplayName("멤버가 선호하는 카테고리를 저장한다.")
    void save() {
        // given
        Member member = memberRepository.save(MemberFixtures.MALE_10.get());
        Category category = categoryRepository.save(CategoryFixtures.DEVELOP.get());

        MemberCategory memberCategory = MemberCategory.builder()
                .member(member)
                .category(category)
                .build();

        // when
        memberCategoryRepository.save(memberCategory);

        // then
        assertThat(memberCategory.getId()).isNotNull();
        assertThat(memberCategory.getCategory().getName()).isEqualTo("개발");
    }

    @Test
    @DisplayName("멤버와 카테고리를 통해 멤버 카테고리를 조회한다.")
    void findByMemberAndCategory() {
        // given
        Member member = memberRepository.save(MemberFixtures.MALE_10.get());
        Category category = categoryRepository.save(CategoryFixtures.DEVELOP.get());

        MemberCategory memberCategory = MemberCategory.builder()
                .member(member)
                .category(category)
                .build();

        memberCategoryRepository.save(memberCategory);

        // when
        MemberCategory findMemberCategory = memberCategoryRepository.findByMemberAndCategory(member, category).get();

        // then
        assertThat(findMemberCategory).isSameAs(memberCategory);
    }

    @Test
    @DisplayName("멤버를 통해 멤버 카테고리 목록을 조회힌다.")
    void findByMember() {
        // given
        Member member = memberRepository.save(MemberFixtures.MALE_20.get());
        Category categoryA = categoryRepository.save(CategoryFixtures.DEVELOP.get());
        Category categoryB = categoryRepository.save(CategoryFixtures.FOOD.get());

        MemberCategory memberCategoryA = MemberCategory.builder()
                .member(member)
                .category(categoryA)
                .build();

        MemberCategory memberCategoryB = MemberCategory.builder()
                .member(member)
                .category(categoryB)
                .build();

        memberCategoryRepository.save(memberCategoryA);
        memberCategoryRepository.save(memberCategoryB);

        // when
        List<MemberCategory> memberCategories = memberCategoryRepository.findAllByMember(member);

        // then
        assertAll(
                () -> assertThat(memberCategories).hasSize(2),
                () -> assertThat(memberCategories).contains(memberCategoryA, memberCategoryB)
        );
    }

}
