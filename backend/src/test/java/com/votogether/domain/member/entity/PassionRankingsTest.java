package com.votogether.domain.member.entity;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.votogether.domain.ranking.entity.PassionRankings;
import com.votogether.domain.ranking.entity.vo.PassionRecord;
import java.util.HashMap;
import java.util.Map;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

class PassionRankingsTest {

    @Nested
    @DisplayName("랭킹")
    class Ranking {

        @Test
        @DisplayName("랭킹 순위와 점수를 계산한다.")
        void calculateRank() {
            //given
            Member memberA = Member.builder().nickname("00").build();
            Member memberB = Member.builder().nickname("11").build();
            Member memberC = Member.builder().nickname("22").build();
            ReflectionTestUtils.setField(memberA, "id", 1L);
            ReflectionTestUtils.setField(memberB, "id", 2L);
            ReflectionTestUtils.setField(memberC, "id", 3L);

            Map<Member, PassionRecord> board = new HashMap<>();
            board.put(memberA, new PassionRecord(1, 1));
            board.put(memberB, new PassionRecord(1, 2));
            board.put(memberC, new PassionRecord(1, 3));

            PassionRankings passionRankings = new PassionRankings(board);

            //when, then
            assertAll(
                    () -> assertThat(passionRankings.getScore(memberA)).isEqualTo(6),
                    () -> assertThat(passionRankings.getScore(memberB)).isEqualTo(7),
                    () -> assertThat(passionRankings.getScore(memberC)).isEqualTo(8),
                    () -> assertThat(passionRankings.getRanking(memberA)).isEqualTo(3),
                    () -> assertThat(passionRankings.getRanking(memberB)).isEqualTo(2),
                    () -> assertThat(passionRankings.getRanking(memberC)).isEqualTo(1)
            );
        }

        @Test
        @DisplayName("동순위가 존재하는 랭킹 순위와 점수를 계산한다.")
        void calculateRank1() {
            //given
            Member memberA = Member.builder().nickname("00").build();
            Member memberB = Member.builder().nickname("11").build();
            Member memberC = Member.builder().nickname("22").build();
            Member memberD = Member.builder().nickname("33").build();
            ReflectionTestUtils.setField(memberA, "id", 1L);
            ReflectionTestUtils.setField(memberB, "id", 2L);
            ReflectionTestUtils.setField(memberC, "id", 3L);
            ReflectionTestUtils.setField(memberD, "id", 4L);

            Map<Member, PassionRecord> board = new HashMap<>();
            board.put(memberA, new PassionRecord(1, 1));
            board.put(memberB, new PassionRecord(1, 3));
            board.put(memberC, new PassionRecord(1, 3));
            board.put(memberD, new PassionRecord(1, 3));

            PassionRankings passionRankings = new PassionRankings(board);

            //when, then
            assertAll(
                    () -> assertThat(passionRankings.getScore(memberA)).isEqualTo(6),
                    () -> assertThat(passionRankings.getScore(memberB)).isEqualTo(8),
                    () -> assertThat(passionRankings.getScore(memberC)).isEqualTo(8),
                    () -> assertThat(passionRankings.getRanking(memberA)).isEqualTo(4),
                    () -> assertThat(passionRankings.getRanking(memberB)).isEqualTo(1),
                    () -> assertThat(passionRankings.getRanking(memberC)).isEqualTo(1),
                    () -> assertThat(passionRankings.getRanking(memberD)).isEqualTo(1)
            );
        }

    }

}
