package com.votogether.test.persister;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostBody;
import com.votogether.domain.post.repository.PostRepository;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Persister
@RequiredArgsConstructor
@Component
public class PostTestPersister {

    private final MemberTestPersister memberTestPersister;
    private final PostRepository postRepository;

    public PostBuilder builder() {
        return new PostBuilder();
    }

    public final class PostBuilder {

        private Member writer;
        private PostBody postBody;
        private LocalDateTime deadline;

        public PostBuilder writer(Member writer) {
            this.writer = writer;
            return this;
        }

        public PostBuilder postBody(PostBody postBody) {
            this.postBody = postBody;
            return this;
        }

        public PostBuilder deadline(LocalDateTime deadline) {
            this.deadline = deadline;
            return this;
        }

        public Post save() {
            Post post = Post.builder()
                    .writer(writer == null ? memberTestPersister.builder().save() : writer)
                    .postBody(postBody == null ? generatePostBody() : postBody)
                    .deadline(deadline == null ? LocalDateTime.of(2100, 12, 25, 0, 0) : deadline)
                    .build();
            return postRepository.save(post);
        }

        private PostBody generatePostBody() {
            return PostBody.builder()
                    .title("title")
                    .content("content")
                    .build();
        }

    }

}
