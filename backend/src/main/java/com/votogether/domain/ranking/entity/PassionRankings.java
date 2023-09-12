package com.votogether.domain.ranking.entity;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.ranking.entity.vo.PassionRecord;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

public class PassionRankings {

    private final Map<Member, Integer> rankings = new LinkedHashMap<>();
    private final Map<Member, PassionRecord> passionBoard;

    public PassionRankings(final Map<Member, PassionRecord> passionBoard) {
        this.passionBoard = passionBoard;
        calculateRanking();
    }

    private void calculateRanking() {
        final List<Member> members = passionBoard.entrySet().stream()
                .sorted(Comparator.comparingLong(entry -> -entry.getValue().calculateScore()))
                .map(Entry::getKey)
                .toList();

        int currentRanking = 1;
        int previousRanking = -1;
        long previousScore = -1;
        for (final Member member : members) {
            long currentScore = passionBoard.get(member).calculateScore();
            int ranking = (currentScore == previousScore) ? previousRanking : currentRanking;

            this.rankings.put(member, ranking);

            previousRanking = ranking;
            previousScore = currentScore;
            currentRanking++;
        }
    }

    public List<Member> getTop10Members() {
        return new ArrayList<>(rankings.keySet())
                .subList(0, Math.min(10, rankings.size()));
    }

    public long getScore(final Member member) {
        return passionBoard.get(member).calculateScore();
    }

    public int getRanking(final Member member) {
        return rankings.get(member);
    }

    public PassionRecord getPassionRecord(final Member member) {
        return passionBoard.get(member);
    }
}
