package com.votogether.domain.post.entity;

import static org.assertj.core.api.Assertions.assertThat;

import com.votogether.domain.category.entity.Category;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class PostCategoriesTest {

    @Test
    @DisplayName("여러 Category를 전달하면 Post와 매핑되어 PostOptions를 생성한다")
    void mapPostAndCategories() {
        // given
        PostCategories postCategories = new PostCategories();
        Post post = Post.builder().build();
        Category categoryA = Category.builder().build();
        Category categoryB = Category.builder().build();

        List<Category> categories = List.of(categoryA, categoryB);

        // when
        postCategories.mapPostAndCategories(post, categories);

        // then
        assertThat(postCategories.getPostCategories()).hasSize(2);
    }

}
