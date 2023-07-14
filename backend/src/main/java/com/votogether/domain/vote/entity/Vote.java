package com.votogether.domain.vote.entity;

import com.votogether.domain.common.BaseEntity;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.entity.PostOption;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
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
        this.member = member;
        this.postOption = postOption;
    }

    public void changePostOption(PostOption postOption) {
        validatePostOption(postOption);
        this.postOption = postOption;
    }

    private void validatePostOption(PostOption postOption) {
        if (!this.postOption.isFromSamePost(postOption)) {
            throw new IllegalArgumentException("같은 게시글이어야 합니다.");
        }
    }

}
