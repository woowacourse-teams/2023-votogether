package com.votogether.domain.category.service;

import com.votogether.domain.category.dto.response.CategoryResponse;
import com.votogether.domain.category.entity.Category;
import com.votogether.domain.category.exception.CategoryExceptionType;
import com.votogether.domain.category.repository.CategoryRepository;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.MemberCategory;
import com.votogether.domain.member.repository.MemberCategoryRepository;
import com.votogether.global.exception.BadRequestException;
import com.votogether.global.exception.NotFoundException;
import java.util.Comparator;
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
        final List<Category> categories = categoryRepository.findAll();

        return categories.stream()
                .sorted(Comparator.comparing(Category::getName))
                .map(category -> new CategoryResponse(category, false))
                .toList();
    }

    @Transactional
    public void addFavoriteCategory(final Member member, final Long categoryId) {
        final Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new NotFoundException(CategoryExceptionType.NOT_FOUND));

        memberCategoryRepository.findByMemberAndCategory(member, category)
                .ifPresent(ignore -> {
                    throw new BadRequestException(CategoryExceptionType.EXIST_LIKE_CATEGORY);
                });

        final MemberCategory memberCategory = MemberCategory.builder()
                .member(member)
                .category(category)
                .build();

        memberCategoryRepository.save(memberCategory);
    }

    @Transactional
    public void removeFavoriteCategory(final Member member, final Long categoryId) {
        final Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new NotFoundException(CategoryExceptionType.NOT_FOUND));
        final MemberCategory memberCategory = memberCategoryRepository.findByMemberAndCategory(member, category)
                .orElseThrow(() -> new BadRequestException(CategoryExceptionType.NOT_LIKE_CATEGORY));

        memberCategoryRepository.delete(memberCategory);
    }

    @Transactional(readOnly = true)
    public List<CategoryResponse> getAllCategories(final Member member) {
        final List<Category> categories = categoryRepository.findAll();
        final List<MemberCategory> memberCategories = memberCategoryRepository.findAllByMember(member);

        final List<Category> favoriteCategories = memberCategories.stream()
                .map(MemberCategory::getCategory)
                .toList();

        return categories.stream()
                .sorted(Comparator.comparing(Category::getName))
                .map(category -> new CategoryResponse(category, favoriteCategories))
                .toList();
    }

}
