package com.votogether.domain.post.entity;

import static org.assertj.core.api.Assertions.assertThat;

import com.votogether.domain.category.entity.Category;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;

@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class PostTest {

    @DisplayName("여러 Category를 전달하면 Post와 매핑되어 PostOptions를 생성한다")
    @Test
    void mapCategories() {
        // given
        final Post post = Post.builder().build();
        final Category category1 = Category.builder().build();
        final Category category2 = Category.builder().build();

        final List<Category> categories = List.of(category1, category2);

        // when
        post.mapCategories(categories);

        // then
        final PostCategories actualPostCategories = post.getPostCategories();
        assertThat(actualPostCategories.getPostCategories()).hasSize(2);
    }

    @DisplayName("여러 PostOption을 저장한다")
    @Test
    void addAllPostOptions() {
        // given
        final Post post = Post.builder().build();
        final PostOption postOption1 = PostOption.builder().build();
        final PostOption postOption2 = PostOption.builder().build();

        final List<PostOption> postOptions = List.of(postOption1, postOption2);

        // when
        post.addAllPostOptions(postOptions);

        // then
        final PostOptions actualPostOptions = post.getPostOptions();
        assertThat(actualPostOptions.getPostOptions()).hasSize(2);
    }
}
