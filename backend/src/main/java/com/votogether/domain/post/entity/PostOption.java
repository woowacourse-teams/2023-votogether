package com.votogether.domain.post.entity;

import com.votogether.domain.common.BaseEntity;
import com.votogether.domain.vote.entity.Vote;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Entity
@EqualsAndHashCode(of = {"id"}, callSuper = false)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"post_id", "sequence"})})
public class PostOption extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;

    @Setter
    @Column(nullable = false)
    private Integer sequence;

    @Embedded
    private PostOptionBody postOptionBody;

    @Column
    private String imageUrl;

    @Column(nullable = false)
    private long voteCount;

    @OneToMany(mappedBy = "postOption", cascade = CascadeType.PERSIST, orphanRemoval = true)
    private List<Vote> votes = new ArrayList<>();

    @Builder
    private PostOption(
            final Post post,
            final int sequence,
            final String content,
            final String imageUrl,
            final long voteCount
    ) {
        this.post = post;
        this.sequence = sequence;
        this.postOptionBody = new PostOptionBody(content);
        this.imageUrl = imageUrl;
        this.voteCount = voteCount;
    }

    public void addVote(final Vote vote) {
        vote.setPostOption(this);
        this.votes.add(vote);
    }

    public void update(final String content, final String imageUrl) {
        this.postOptionBody = new PostOptionBody(content);
        this.imageUrl = imageUrl;
    }

    public void increaseVoteCount() {
        this.voteCount += 1;
    }

    public void decreaseVoteCount() {
        this.voteCount -= 1;
    }

    public boolean belongsTo(final Post post) {
        return Objects.equals(this.post.getId(), post.getId());
    }

    public String getContent() {
        return this.postOptionBody.getContent();
    }

}
