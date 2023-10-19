package com.votogether.domain.member.entity;

import com.votogether.domain.common.BaseEntity;
import com.votogether.domain.member.exception.MemberExceptionType;
import com.votogether.global.exception.BadRequestException;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@EqualsAndHashCode(of = {"id"}, callSuper = false)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberMetric extends BaseEntity {

    private static final int POST_SCORE = 5;
    private static final int VOTE_SCORE = 1;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Column(nullable = false)
    private long postCount;

    @Column(nullable = false)
    private long voteCount;

    @Column(nullable = false)
    private long score;

    @Builder
    private MemberMetric(
            final Member member,
            final long postCount,
            final long voteCount,
            final long score
    ) {
        this.member = member;
        this.postCount = postCount;
        this.voteCount = voteCount;
        this.score = score;
    }

    public void increasePostCount() {
        this.postCount += 1;
        updateScore();
    }

    public void decreasePostCount() {
        this.postCount -= 1;
        updateScore();
    }

    public void updateVoteCount(final long voteCount) {
        if (voteCount < 0) {
            throw new BadRequestException(MemberExceptionType.INVALID_VOTE_COUNT);
        }
        this.voteCount = voteCount;
        updateScore();
    }

    private void updateScore() {
        this.score = (postCount * POST_SCORE) + (voteCount * VOTE_SCORE);
    }

}
