package com.votogether.domain.vote.entity;

import com.votogether.domain.common.BaseEntity;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.entity.PostOption;
import com.votogether.domain.vote.exception.VoteExceptionType;
import com.votogether.global.exception.BadRequestException;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"member_id", "post_option_id"})})
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Vote extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_option_id", nullable = false)
    private PostOption postOption;

    @Builder
    private Vote(final Member member, final PostOption postOption) {
        validateVotingRights(member, postOption);
        this.member = member;
        this.postOption = postOption;
    }

    private void validateVotingRights(final Member member, final PostOption postOption) {
        if (postOption.getPost().isWriter(member)) {
            throw new BadRequestException(VoteExceptionType.CANNOT_VOTE_MY_POST);
        }
    }

    public void setPostOption(final PostOption postOption) {
        this.postOption = postOption;
    }

}
