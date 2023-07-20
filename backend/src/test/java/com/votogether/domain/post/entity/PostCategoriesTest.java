package com.votogether.domain.post.entity;

import static com.votogether.fixtures.CategoryFixtures.DEVELOP;
import static com.votogether.fixtures.CategoryFixtures.FOOD;
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
        final PostCategories postCategories = new PostCategories();
        final Post post = Post.builder().build();

        final List<Category> categories = List.of(FOOD, DEVELOP);

        // when
        postCategories.mapPostAndCategories(post, categories);

        // then
        assertThat(postCategories.getPostCategories()).hasSize(2);
    }

}
