package com.votogether.domain.member.service;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.vo.ActivityRecord;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class RankingBoard {

    private final Map<Member, Integer> ranking = new HashMap<>();
    private final Map<Member, ActivityRecord> passionBoard;

    public RankingBoard(final Map<Member, ActivityRecord> passionBoard) {
        this.passionBoard = passionBoard;
        calculateRank();
    }

    private void calculateRank() {
        final List<Member> members = passionBoard.entrySet().stream()
                .sorted(Comparator.comparingLong(entry -> -entry.getValue().calculateScore()))
                .map(s -> s.getKey())
                .toList();

        int currentRanking = 1;
        int previousRanking = -1;
        long previousScore = -1;
        for (Member member : members) {
            long currentScore = passionBoard.get(member).calculateScore();
            int ranking = (currentScore == previousScore) ? previousRanking : currentRanking;

            this.ranking.put(member, ranking);

            previousRanking = ranking;
            previousScore = currentScore;
            currentRanking++;
        }
    }

    public long getScore(Member member) {
        return passionBoard.get(member).calculateScore();
    }

    public int getRanking(Member member) {
        return ranking.get(member);
    }

    public ActivityRecord getActivityRecord(Member member) {
        return passionBoard.get(member);
    }

}
