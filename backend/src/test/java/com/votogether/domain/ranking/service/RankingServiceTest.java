package com.votogether.domain.ranking.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.ranking.dto.response.RankingResponse;
import com.votogether.test.annotation.ServiceTest;
import com.votogether.test.persister.MemberTestPersister;
import com.votogether.test.persister.PostOptionTestPersister;
import com.votogether.test.persister.PostTestPersister;
import com.votogether.test.persister.VoteTestPersister;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

@ServiceTest
class RankingServiceTest {

    @Autowired
    RankingService rankingService;

    @Autowired
    MemberTestPersister memberTestPersister;

    @Autowired
    PostTestPersister postTestPersister;

    @Autowired
    PostOptionTestPersister postOptionTestPersister;

    @Autowired
    VoteTestPersister voteTestPersister;

    @Test
    @DisplayName("회원의 열정 랭킹을 조회한다.")
    void getMemberPassionRanking() {
        // given
        Member memberA = memberTestPersister.builder().save();
        Member memberB = memberTestPersister.builder().save();
        Member memberC = memberTestPersister.builder().save();
        Member memberD = memberTestPersister.builder().save();
        Member memberE = memberTestPersister.builder().save();

        postTestPersister.builder().writer(memberA).save();
        postTestPersister.builder().writer(memberB).save();
        postTestPersister.builder().writer(memberC).save();
        postTestPersister.builder().writer(memberD).save();

        voteTestPersister.builder().member(memberA).save();
        voteTestPersister.builder().member(memberC).save();
        voteTestPersister.builder().member(memberD).save();
        voteTestPersister.builder().member(memberD).save();
        voteTestPersister.builder().member(memberE).save();

        // when
        RankingResponse response = rankingService.getPassionRanking(memberA);

        // then (score: 6,5,7,6,1)
        assertAll(
                () -> assertThat(response.ranking()).isEqualTo(2),
                () -> assertThat(response.postCount()).isEqualTo(1),
                () -> assertThat(response.voteCount()).isEqualTo(1),
                () -> assertThat(response.score()).isEqualTo(6)
        );
    }

    @Test
    @DisplayName("상위10명의 열정 유저 랭킹을 조회한다.")
    void getPassionRankingTop10() {
        // given
        Member memberA = memberTestPersister.builder().save();
        Member memberB = memberTestPersister.builder().save();
        memberTestPersister.builder().save();
        memberTestPersister.builder().save();
        memberTestPersister.builder().save();
        memberTestPersister.builder().save();
        memberTestPersister.builder().save();
        memberTestPersister.builder().save();
        memberTestPersister.builder().save();
        memberTestPersister.builder().save();

        postTestPersister.builder().writer(memberA).save();
        postTestPersister.builder().writer(memberB).save();

        // when
        final List<RankingResponse> rankings = rankingService.getPassionRanking();

        // then
        assertAll(
                () -> assertThat(rankings.get(0).ranking()).isEqualTo(1),
                () -> assertThat(rankings.get(0).postCount()).isEqualTo(1),
                () -> assertThat(rankings.get(0).score()).isEqualTo(5),
                () -> assertThat(rankings.get(1).ranking()).isEqualTo(1),
                () -> assertThat(rankings.get(1).postCount()).isEqualTo(1),
                () -> assertThat(rankings.get(1).score()).isEqualTo(5),
                () -> assertThat(rankings.get(2).ranking()).isEqualTo(3),
                () -> assertThat(rankings.get(3).ranking()).isEqualTo(3),
                () -> assertThat(rankings.get(4).ranking()).isEqualTo(3),
                () -> assertThat(rankings.get(5).ranking()).isEqualTo(3),
                () -> assertThat(rankings.get(6).ranking()).isEqualTo(3),
                () -> assertThat(rankings.get(7).ranking()).isEqualTo(3),
                () -> assertThat(rankings.get(8).ranking()).isEqualTo(3),
                () -> assertThat(rankings.get(9).ranking()).isEqualTo(3)
        );
    }

}
