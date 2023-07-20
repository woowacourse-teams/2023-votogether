package com.votogether.domain.post.entity;

import static com.votogether.fixtures.MemberFixtures.MALE_30;
import static org.assertj.core.api.Assertions.assertThat;

import com.votogether.domain.vote.entity.Vote;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class PostOptionTest {

    @Test
    @DisplayName("해당 선택지를 현재 회원이 투표한 건지 확인한다")
    void isVoteByMember() {
        // given
        final PostOption postOption = PostOption.builder().build();

        final Vote vote = Vote.builder().member(MALE_30).build();
        postOption.getVotes().add(vote);

        // when
        final boolean isVoteByMember = postOption.isVoteByMember(MALE_30);

        // then
        assertThat(isVoteByMember).isTrue();
    }

}
