package com.votogether.domain.post.entity;

import com.votogether.domain.category.entity.Category;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Embeddable;
import jakarta.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
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

}
