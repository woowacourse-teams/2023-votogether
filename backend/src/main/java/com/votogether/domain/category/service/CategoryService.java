package com.votogether.domain.category.service;

import com.votogether.domain.category.dto.response.CategoryResponse;
import com.votogether.domain.category.entity.Category;
import com.votogether.domain.category.repository.CategoryRepository;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.MemberCategory;
import com.votogether.domain.member.repository.MemberCategoryRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final MemberCategoryRepository memberCategoryRepository;

    @Transactional(readOnly = true)
    public List<CategoryResponse> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();

        return categories.stream()
                .map(CategoryResponse::new)
                .toList();
    }

    @Transactional
    public void addFavoriteCategory(final Member member, final Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new IllegalArgumentException("해당 카테고리가 존재하지 않습니다."));

        memberCategoryRepository.findByMemberAndCategory(member, category)
                .ifPresent(ignore -> new IllegalStateException("이미 선호 카테고리에 등록되어 있습니다."));

        MemberCategory memberCategory = MemberCategory.builder()
                .member(member)
                .category(category)
                .build();

        memberCategoryRepository.save(memberCategory);
    }

    @Transactional
    public void removeFavoriteCategory(final Member member, final Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new IllegalArgumentException("해당 카테고리가 존재하지 않습니다."));

        MemberCategory memberCategory = memberCategoryRepository.findByMemberAndCategory(member, category)
                .orElseThrow(() -> new IllegalArgumentException("해당 카테고리는 선호 카테고리가 아닙니다."));

        memberCategoryRepository.delete(memberCategory);
    }

}
