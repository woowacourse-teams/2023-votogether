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
            Member member = Member.builder().nickname("00").build();
            Member member1 = Member.builder().nickname("11").build();
            Member member2 = Member.builder().nickname("22").build();
            ReflectionTestUtils.setField(member, "id", 1L);
            ReflectionTestUtils.setField(member1, "id", 2L);
            ReflectionTestUtils.setField(member2, "id", 3L);

            Map<Member, ActivityRecord> board = new HashMap<>();
            board.put(member, new ActivityRecord(1, 1));
            board.put(member1, new ActivityRecord(1, 2));
            board.put(member2, new ActivityRecord(1, 3));

            RankingBoard rankingBoard = new RankingBoard(board);

            //when, then
            assertAll(
                    () -> assertThat(rankingBoard.score(member)).isEqualTo(6),
                    () -> assertThat(rankingBoard.score(member1)).isEqualTo(7),
                    () -> assertThat(rankingBoard.score(member2)).isEqualTo(8),
                    () -> assertThat(rankingBoard.ranking(member)).isEqualTo(3),
                    () -> assertThat(rankingBoard.ranking(member1)).isEqualTo(2),
                    () -> assertThat(rankingBoard.ranking(member2)).isEqualTo(1)
            );
        }

        @Test
        @DisplayName("동순위가 존재하는 랭킹 순위와 점수를 계산한다.")
        void calculateRank1() {
            //given
            Member member = Member.builder().nickname("00").build();
            Member member1 = Member.builder().nickname("11").build();
            Member member2 = Member.builder().nickname("22").build();
            Member member3 = Member.builder().nickname("33").build();
            ReflectionTestUtils.setField(member, "id", 1L);
            ReflectionTestUtils.setField(member1, "id", 2L);
            ReflectionTestUtils.setField(member2, "id", 3L);
            ReflectionTestUtils.setField(member3, "id", 4L);

            Map<Member, ActivityRecord> board = new HashMap<>();
            board.put(member, new ActivityRecord(1, 1));
            board.put(member1, new ActivityRecord(1, 3));
            board.put(member2, new ActivityRecord(1, 3));
            board.put(member3, new ActivityRecord(1, 3));

            RankingBoard rankingBoard = new RankingBoard(board);

            //when, then
            assertAll(
                    () -> assertThat(rankingBoard.score(member)).isEqualTo(6),
                    () -> assertThat(rankingBoard.score(member1)).isEqualTo(8),
                    () -> assertThat(rankingBoard.score(member2)).isEqualTo(8),
                    () -> assertThat(rankingBoard.ranking(member)).isEqualTo(4),
                    () -> assertThat(rankingBoard.ranking(member1)).isEqualTo(1),
                    () -> assertThat(rankingBoard.ranking(member2)).isEqualTo(1),
                    () -> assertThat(rankingBoard.ranking(member3)).isEqualTo(1)
            );
        }

    }

}
