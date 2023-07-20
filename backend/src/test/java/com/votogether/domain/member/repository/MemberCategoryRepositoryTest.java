package com.votogether.domain.member.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.votogether.RepositoryTest;
import com.votogether.domain.category.entity.Category;
import com.votogether.domain.category.repository.CategoryRepository;
import com.votogether.domain.member.entity.Gender;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.MemberCategory;
import com.votogether.domain.member.entity.SocialType;
import com.votogether.fixtures.MemberFixtures;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

@RepositoryTest
class MemberCategoryRepositoryTest {

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
        Category category = Category.builder()
                .name("개발")
                .build();

        Member member = Member.builder()
                .gender(Gender.MALE)
                .point(0)
                .socialType(SocialType.KAKAO)
                .nickname("user1")
                .gender(Gender.MALE)
                .birthday("0718")
                .ageRange("10~14")
                .socialType(SocialType.KAKAO)
                .socialId("kakao@gmail.com")
                .ageRange("30~39")
                .birthday("0101")
                .point(0)
                .build();

        categoryRepository.save(category);
        memberRepository.save(member);

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
        Category category = Category.builder()
                .name("개발")
                .build();

        Member member = Member.builder()
                .gender(Gender.MALE)
                .point(0)
                .socialType(SocialType.KAKAO)
                .nickname("user1")
                .gender(Gender.MALE)
                .birthday("0718")
                .ageRange("10~14")
                .socialType(SocialType.KAKAO)
                .socialId("kakao@gmail.com")
                .ageRange("30~39")
                .birthday("0101")
                .point(0)
                .build();

        MemberCategory memberCategory = MemberCategory.builder()
                .member(member)
                .category(category)
                .build();

        categoryRepository.save(category);
        memberRepository.save(member);
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
        Member member = memberRepository.save(MemberFixtures.MALE_20);

        Category category = Category.builder()
                .name("개발")
                .build();

        Category category1 = Category.builder()
                .name("음식")
                .build();

        MemberCategory memberCategory = MemberCategory.builder()
                .member(member)
                .category(category)
                .build();

        MemberCategory memberCategory1 = MemberCategory.builder()
                .member(member)
                .category(category1)
                .build();

        categoryRepository.save(category);
        categoryRepository.save(category1);

        memberCategoryRepository.save(memberCategory);
        memberCategoryRepository.save(memberCategory1);

        // when
        List<MemberCategory> memberCategories = memberCategoryRepository.findByMember(member);

        // then
        assertAll(
                () -> assertThat(memberCategories).hasSize(2),
                () -> assertThat(memberCategories).contains(memberCategory, memberCategory1)
        );
    }

}
