package com.votogether.domain.post.entity;

import com.votogether.domain.common.BaseEntity;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.vote.entity.Vote;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
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
import org.hibernate.annotations.Formula;

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

    @Column(nullable = false)
    private Integer sequence;

    @Column(length = 50, nullable = false)
    private String content;

    @Column
    private String imageUrl;

    @Formula("(select count(*) from vote v where v.post_option_id = id)")
    private int voteCount;

    @OneToMany(mappedBy = "postOption", cascade = CascadeType.PERSIST, orphanRemoval = true)
    private List<Vote> votes = new ArrayList<>();

    @Builder
    private PostOption(
            final Post post,
            final int sequence,
            final String content,
            final String imageUrl
    ) {
        this.post = post;
        this.sequence = sequence;
        this.content = content;
        this.imageUrl = imageUrl;
    }

    public static PostOption of(
            final String postOptionContent,
            final Post post,
            final int postOptionSequence,
            final String optionImageUrl
    ) {
        if (!optionImageUrl.isEmpty()) {
            return toPostOptionEntity(post, postOptionSequence, postOptionContent, optionImageUrl);
        }

        return toPostOptionEntity(post, postOptionSequence, postOptionContent, "");
    }

    private static PostOption toPostOptionEntity(
            final Post post,
            final Integer postOptionSequence,
            final String postOptionContent,
            final String optionImageUrl
    ) {
        return PostOption.builder()
                .post(post)
                .sequence(postOptionSequence)
                .content(postOptionContent)
                .imageUrl(optionImageUrl)
                .build();
    }

    public void addVote(final Vote vote) {
        this.votes.add(vote);
        vote.setPostOption(this);
    }

    public boolean hasMemberVote(final Member member) {
        return votes.stream()
                .anyMatch(vote -> vote.isVoteByMember(member));
    }

    public boolean belongsTo(final Post post) {
        return Objects.equals(this.post.getId(), post.getId());
    }

    public int getVoteCount() {
        return this.votes.size();
    }

}
