package com.votogether.domain.post.entity.comment;

import com.votogether.domain.common.BaseEntity;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.entity.Post;
import jakarta.persistence.Column;
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
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EqualsAndHashCode(of = {"id"}, callSuper = false)
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
    private Member writer;

    @Embedded
    private Content content;

    @Column(nullable = false)
    private boolean isHidden;

    @Builder
    private Comment(
            final Post post,
            final Member writer,
            final String content
    ) {
        this.post = post;
        this.writer = writer;
        this.content = new Content(content);
        this.isHidden = false;
    }

    public boolean belongsTo(final Post post) {
        return Objects.equals(this.post, post);
    }

    public boolean isWriter(final Member member) {
        return Objects.equals(this.writer, member);
    }

    public void updateContent(final String content) {
        this.content = new Content(content);
    }

    public void blind() {
        this.isHidden = true;
    }

    public String getContent() {
        return content.getValue();
    }

}
