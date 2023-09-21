package com.votogether.test.persister;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.comment.Comment;
import com.votogether.domain.post.repository.CommentRepository;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Persister
public class CommentTestPersister {

    private final CommentRepository commentRepository;
    private final MemberTestPersister memberTestPersister;
    private final PostTestPersister postTestPersister;

    public CommentBuilder builder() {
        return new CommentBuilder();
    }

    public final class CommentBuilder {

        private Post post;
        private Member writer;
        private String content;

        public CommentBuilder post(Post post) {
            this.post = post;
            return this;
        }

        public CommentBuilder writer(Member writer) {
            this.writer = writer;
            return this;
        }

        public CommentBuilder content(String content) {
            this.content = content;
            return this;
        }

        public Comment save() {
            Comment comment = Comment.builder()
                    .post(post == null ? postTestPersister.postBuilder().save() : post)
                    .writer(writer == null ? memberTestPersister.builder().save() : writer)
                    .content(content == null ? "hello" : content)
                    .build();
            return commentRepository.save(comment);
        }

    }

}
