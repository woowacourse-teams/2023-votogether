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
        PostOption postOptionA = PostOption.builder().build();
        PostOption postOptionB = PostOption.builder().build();

        List<PostOption> postOptionsToSave = List.of(postOptionA, postOptionB);

        // when
        postOptions.addAllPostOptions(postOptionsToSave);

        // then
        assertThat(postOptions.getPostOptions()).hasSize(2);
    }
}
