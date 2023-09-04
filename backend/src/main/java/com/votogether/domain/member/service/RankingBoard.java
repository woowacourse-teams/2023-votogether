package com.votogether.domain.member.service;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.vo.EngagementRecord;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class RankingBoard {

    private final Map<Member, Integer> ranking = new HashMap<>();
    private final Map<Member, EngagementRecord> passionBoard;

    public RankingBoard(final Map<Member, EngagementRecord> passionBoard) {
        this.passionBoard = passionBoard;
        calculateRank();
    }

    private void calculateRank() {
        List<Member> members = passionBoard.entrySet().stream()
                .sorted((e1, e2) -> e2.getValue().score() - e1.getValue().score())
                .map(s -> s.getKey())
                .toList();

        int currentRanking = 1;
        int previousRanking = -1;
        int previousScore = -1;
        for (Member member : members) {
            int currentScore = passionBoard.get(member).score();
            int ranking = (currentScore == previousScore) ? previousRanking : currentRanking;

            this.ranking.put(member, ranking);

            previousRanking = ranking;
            previousScore = currentScore;
            currentRanking++;
        }
    }

    public int score(Member member) {
        return passionBoard.get(member).score();
    }

    public int ranking(Member member) {
        return ranking.get(member);
    }

    public EngagementRecord engagementRecord(Member member) {
        return passionBoard.get(member);
    }

}
