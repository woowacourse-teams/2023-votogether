package com.votogether.domain.category.service;

import com.votogether.domain.category.dto.response.CategoryResponse;
import com.votogether.domain.category.entity.Category;
import com.votogether.domain.category.repository.CategoryRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    @Transactional(readOnly = true)
    public List<CategoryResponse> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();

        return categories.stream()
                .map(CategoryResponse::new)
                .toList();
    }

}
