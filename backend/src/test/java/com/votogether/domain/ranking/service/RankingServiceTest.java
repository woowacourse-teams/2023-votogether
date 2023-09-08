package com.votogether.domain.ranking.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.ranking.dto.response.RankingResponse;
import com.votogether.test.annotation.ServiceTest;
import com.votogether.test.persister.MemberTestPersister;
import com.votogether.test.persister.PostTestPersister;
import com.votogether.test.persister.VoteTestPersister;
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
    VoteTestPersister voteTestPersister;

    @Test
    @DisplayName("회원의 랭킹을 조회한다.")
    void getRanking() {
        // given
        Member member = memberTestPersister.builder().save();
        Member member1 = memberTestPersister.builder().save();
        Member member2 = memberTestPersister.builder().save();
        Member member3 = memberTestPersister.builder().save();
        Member member4 = memberTestPersister.builder().save();

        postTestPersister.builder().writer(member).save();
        postTestPersister.builder().writer(member1).save();
        postTestPersister.builder().writer(member2).save();
        postTestPersister.builder().writer(member3).save();

        voteTestPersister.builder().member(member).save();
        voteTestPersister.builder().member(member2).save();
        voteTestPersister.builder().member(member3).save();
        voteTestPersister.builder().member(member3).save();
        voteTestPersister.builder().member(member4).save();

        // when
        RankingResponse response = rankingService.getRanking(member);

        // then (score: 6,5,7,6,1)
        assertAll(
                () -> assertThat(response.ranking()).isEqualTo(2),
                () -> assertThat(response.postCount()).isEqualTo(1),
                () -> assertThat(response.voteCount()).isEqualTo(1),
                () -> assertThat(response.score()).isEqualTo(6)
        );
    }

}
