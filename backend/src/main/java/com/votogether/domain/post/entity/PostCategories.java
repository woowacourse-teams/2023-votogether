package com.votogether.domain.post.entity;

import com.votogether.domain.category.entity.Category;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Embeddable;
import jakarta.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Embeddable
public class PostCategories {

    @OneToMany(mappedBy = "post", cascade = CascadeType.PERSIST, orphanRemoval = true)
    private List<PostCategory> postCategories = new ArrayList<>();

    public void mapPostAndCategories(final Post post, final List<Category> categories) {
        categories.forEach(category -> postCategories.add(createPostCategory(post, category)));
    }

    private PostCategory createPostCategory(final Post post, final Category category) {
        return PostCategory.builder()
                .post(post)
                .category(category)
                .build();
    }

    public void update(final Post post, final List<Category> categories) {
        postCategories.removeIf(Predicate.not(postCategory -> categories.contains(postCategory.getCategory())));

        categories.stream()
                .filter(this::isCategoryNotPresent)
                .forEach(category -> this.postCategories.add(createPostCategory(post, category)));
    }

    private boolean isCategoryNotPresent(Category category) {
        return this.postCategories.stream()
                .noneMatch(postCategory -> postCategory.getCategory().equals(category));
    }

}
