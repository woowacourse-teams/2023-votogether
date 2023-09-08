package com.votogether.domain.member.service;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.ranking.domain.PassionRecord;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PassionRankings {

    private final Map<Member, Integer> rankings = new HashMap<>();
    private final Map<Member, PassionRecord> passionBoard;

    public PassionRankings(final Map<Member, PassionRecord> passionBoard) {
        this.passionBoard = passionBoard;
        calculateRanking();
    }

    private void calculateRanking() {
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

            this.rankings.put(member, ranking);

            previousRanking = ranking;
            previousScore = currentScore;
            currentRanking++;
        }
    }

    public long getScore(Member member) {
        return passionBoard.get(member).calculateScore();
    }

    public int getRanking(Member member) {
        return rankings.get(member);
    }

    public PassionRecord getActivityRecord(Member member) {
        return passionBoard.get(member);
    }

}
