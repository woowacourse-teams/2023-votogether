package com.votogether.test.persister;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.comment.Comment;
import com.votogether.domain.post.entity.comment.Content;
import com.votogether.domain.post.repository.CommentRepository;
import com.votogether.test.fixtures.MemberFixtures;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Persister
public class CommentTestPersister {

    private final CommentRepository commentRepository;

    public CommentBuilder builder() {
        return new CommentTestPersister.CommentBuilder();
    }

    public final class CommentBuilder {

        private Post post;
        private Member member;
        private Content content;

        public CommentBuilder post(Post post) {
            this.post = post;
            return this;
        }

        public CommentBuilder member(Member member) {
            this.member = member;
            return this;
        }

        public CommentBuilder content(Content content) {
            this.content = content;
            return this;
        }

        public Comment save() {
            Comment comment = Comment.builder()
                    .post(post == null ? Post.builder().build() : post)
                    .member(member == null ? MemberFixtures.MALE_20.get() : member)
                    .content(content == null ? "content" : content.getValue())
                    .build();
            return commentRepository.save(comment);
        }
    }

}
