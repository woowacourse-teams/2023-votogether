package com.votogether.domain.post.entity.comment;

import com.votogether.domain.common.BaseEntity;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.exception.CommentExceptionType;
import com.votogether.exception.BadRequestException;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.util.Objects;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class Comment extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Embedded
    private Content content;

    @Builder
    private Comment(final Post post, final Member member, final String content) {
        this.post = post;
        this.member = member;
        this.content = new Content(content);
    }

    public void validateWriter(final Member member) {
        if (!Objects.equals(this.member.getId(), member.getId())) {
            throw new BadRequestException(CommentExceptionType.NOT_WRITER);
        }
    }

    public void validateBelong(final Post post) {
        if (!Objects.equals(this.post.getId(), post.getId())) {
            throw new BadRequestException(CommentExceptionType.NOT_BELONG_POST);
        }
    }

}