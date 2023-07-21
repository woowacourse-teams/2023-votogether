package com.votogether.domain.post.entity;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class PostOptionsTest {

    @Test
    @DisplayName("여러 PostOption을 저장한다")
    void addAllPostOptions() {
        // given
        PostOptions postOptions = new PostOptions();
        PostOption postOption1 = PostOption.builder().build();
        PostOption postOption2 = PostOption.builder().build();

        List<PostOption> postOptionsToSave = List.of(postOption1, postOption2);

        // when
        postOptions.addAllPostOptions(postOptionsToSave);

        // then
        assertThat(postOptions.getPostOptions()).hasSize(2);
    }

    @Test
    @DisplayName("PostOptions를 업데이트한다")
    void update() {
        // given
        PostOptions postOptions = new PostOptions();
        PostOption postOption1 = PostOption.builder().build();
        PostOption postOption2 = PostOption.builder().build();
        postOptions.addAllPostOptions(List.of(postOption1, postOption2));

        PostOption postOption3 = PostOption.builder().build();

        // when
        postOptions.update(List.of(postOption3));

        // then
        assertThat(postOptions.getPostOptions()).hasSize(1);
    }
    
}
