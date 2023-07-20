package com.votogether.domain.post.entity;

import static org.assertj.core.api.Assertions.assertThat;

import com.votogether.domain.member.entity.Gender;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.SocialType;
import com.votogether.domain.vote.entity.Vote;
import java.time.LocalDateTime;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class PostOptionTest {

    @Test
    @DisplayName("해당 선택지를 현재 회원이 투표한 건지 확인한다")
    void isVoteByMember() {
        // given
        final PostOption postOption = PostOption.builder().build();
        Member member = Member.builder()
                .gender(Gender.MALE)
                .point(0)
                .socialType(SocialType.GOOGLE)
                .nickname("user1")
                .socialId("kakao@gmail.com")
                .birthDate(
                        LocalDateTime.of(1995, 7, 12, 0, 0))
                .build();

        final Vote vote = Vote.builder().member(member).build();
        postOption.getVotes().add(vote);

        // when
        final boolean isVoteByMember = postOption.isVoteByMember(member);

        // then
        assertThat(isVoteByMember).isTrue();
    }

}
