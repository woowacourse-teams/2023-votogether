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
        final PostOptions postOptions = new PostOptions();
        final PostOption postOption1 = PostOption.builder().build();
        final PostOption postOption2 = PostOption.builder().build();

        final List<PostOption> postOptionsToSave = List.of(postOption1, postOption2);

        // when
        postOptions.addAllPostOptions(postOptionsToSave);

        // then
        assertThat(postOptions.getPostOptions()).hasSize(2);
    }
}
