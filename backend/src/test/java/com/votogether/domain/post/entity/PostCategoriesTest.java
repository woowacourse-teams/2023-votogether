package com.votogether.domain.post.entity;

import static org.assertj.core.api.Assertions.assertThat;

import com.votogether.domain.category.entity.Category;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class PostCategoriesTest {

    @DisplayName("여러 Category를 전달하면 Post와 매핑되어 PostOptions를 생성한다")
    @Test
    void mapPostAndCategories() {
        // given
        final PostCategories postCategories = new PostCategories();
        final Post post = Post.builder().build();
        final Category category1 = Category.builder().build();
        final Category category2 = Category.builder().build();

        final List<Category> categories = List.of(category1, category2);

        // when
        postCategories.mapPostAndCategories(post, categories);

        // then
        assertThat(postCategories.getPostCategories()).hasSize(2);
    }

}
