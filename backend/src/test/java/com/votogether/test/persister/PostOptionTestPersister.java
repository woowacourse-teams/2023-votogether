package com.votogether.test.persister;

import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostOption;
import com.votogether.domain.post.repository.PostOptionRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;

@RequiredArgsConstructor
@Persister
public class PostOptionTestPersister {

    private final PostTestPersister postTestPersister;
    private final PostOptionRepository postOptionRepository;

    public PostOptionBuilder builder() {
        return new PostOptionBuilder();
    }

    public final class PostOptionBuilder {

        private Post post;
        private int sequence;
        private String content;
        private String imageUrl;

        public PostOptionBuilder post(Post post) {
            this.post = post;
            return this;
        }

        public PostOptionBuilder sequence(int sequence) {
            this.sequence = sequence;
            return this;
        }

        public PostOptionBuilder content(String content) {
            this.content = content;
            return this;
        }

        public PostOptionBuilder imageUrl(String imageUrl) {
            this.imageUrl = imageUrl;
            return this;
        }

        public PostOption save() {
            PostOption postOption = PostOption.builder()
                    .post(post == null ? postTestPersister.builder().save() : post)
                    .sequence(sequence)
                    .content(content == null ? RandomStringUtils.random(10, true, true) : content)
                    .imageUrl(imageUrl)
                    .build();
            return postOptionRepository.save(postOption);
        }

    }

}
