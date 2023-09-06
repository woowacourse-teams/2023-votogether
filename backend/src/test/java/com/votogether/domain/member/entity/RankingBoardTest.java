package com.votogether.domain.member.entity;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.votogether.domain.member.entity.vo.ActivityRecord;
import com.votogether.domain.member.service.RankingBoard;
import java.util.HashMap;
import java.util.Map;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

class RankingBoardTest {

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

            Map<Member, ActivityRecord> board = new HashMap<>();
            board.put(memberA, new ActivityRecord(1, 1));
            board.put(memberB, new ActivityRecord(1, 2));
            board.put(memberC, new ActivityRecord(1, 3));

            RankingBoard rankingBoard = new RankingBoard(board);

            //when, then
            assertAll(
                    () -> assertThat(rankingBoard.score(memberA)).isEqualTo(6),
                    () -> assertThat(rankingBoard.score(memberB)).isEqualTo(7),
                    () -> assertThat(rankingBoard.score(memberC)).isEqualTo(8),
                    () -> assertThat(rankingBoard.ranking(memberA)).isEqualTo(3),
                    () -> assertThat(rankingBoard.ranking(memberB)).isEqualTo(2),
                    () -> assertThat(rankingBoard.ranking(memberC)).isEqualTo(1)
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

            Map<Member, ActivityRecord> board = new HashMap<>();
            board.put(memberA, new ActivityRecord(1, 1));
            board.put(memberB, new ActivityRecord(1, 3));
            board.put(memberC, new ActivityRecord(1, 3));
            board.put(memberD, new ActivityRecord(1, 3));

            RankingBoard rankingBoard = new RankingBoard(board);

            //when, then
            assertAll(
                    () -> assertThat(rankingBoard.score(memberA)).isEqualTo(6),
                    () -> assertThat(rankingBoard.score(memberB)).isEqualTo(8),
                    () -> assertThat(rankingBoard.score(memberC)).isEqualTo(8),
                    () -> assertThat(rankingBoard.ranking(memberA)).isEqualTo(4),
                    () -> assertThat(rankingBoard.ranking(memberB)).isEqualTo(1),
                    () -> assertThat(rankingBoard.ranking(memberC)).isEqualTo(1),
                    () -> assertThat(rankingBoard.ranking(memberD)).isEqualTo(1)
            );
        }

    }

}
