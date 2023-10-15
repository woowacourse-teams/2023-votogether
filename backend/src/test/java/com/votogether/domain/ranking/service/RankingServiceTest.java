package com.votogether.domain.ranking.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.ranking.dto.response.RankingResponse;
import com.votogether.test.ServiceTest;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class RankingServiceTest extends ServiceTest {

    @Autowired
    RankingService rankingService;

    @Test
    @DisplayName("회원의 열정 랭킹을 조회한다.")
    void getMemberPassionRanking() {
        // given
        Member memberA = memberTestPersister.builder().save();
        Member memberB = memberTestPersister.builder().save();
        Member memberC = memberTestPersister.builder().save();
        Member memberD = memberTestPersister.builder().save();
        Member memberE = memberTestPersister.builder().save();

        memberMetricTestPersister.builder().member(memberA).postCount(1).voteCount(1).score(6).save();
        memberMetricTestPersister.builder().member(memberB).postCount(1).score(5).save();
        memberMetricTestPersister.builder().member(memberC).postCount(1).voteCount(2).score(7).save();
        memberMetricTestPersister.builder().member(memberD).postCount(1).voteCount(1).score(6).save();
        memberMetricTestPersister.builder().member(memberE).voteCount(1).score(1).save();

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
        Member memberC = memberTestPersister.builder().save();
        Member memberD = memberTestPersister.builder().save();
        Member memberE = memberTestPersister.builder().save();
        Member memberF = memberTestPersister.builder().save();
        Member memberG = memberTestPersister.builder().save();
        Member memberH = memberTestPersister.builder().save();
        Member memberI = memberTestPersister.builder().save();
        Member memberJ = memberTestPersister.builder().save();

        memberMetricTestPersister.builder().member(memberA).postCount(1).score(5).save();
        memberMetricTestPersister.builder().member(memberB).postCount(1).score(5).save();
        memberMetricTestPersister.builder().member(memberC).save();
        memberMetricTestPersister.builder().member(memberD).save();
        memberMetricTestPersister.builder().member(memberE).save();
        memberMetricTestPersister.builder().member(memberF).save();
        memberMetricTestPersister.builder().member(memberG).save();
        memberMetricTestPersister.builder().member(memberH).save();
        memberMetricTestPersister.builder().member(memberI).save();
        memberMetricTestPersister.builder().member(memberJ).save();

        // when
        List<RankingResponse> rankings = rankingService.getPassionRanking();

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
