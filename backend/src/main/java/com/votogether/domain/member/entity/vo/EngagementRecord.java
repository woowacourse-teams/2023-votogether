package com.votogether.domain.member.entity.vo;

import lombok.Getter;

@Getter
public class EngagementRecord {

    private final int postCount;
    private final int voteCount;

    public EngagementRecord(int postCount, int voteCount) {
        this.postCount = postCount;
        this.voteCount = voteCount;
    }

    public int score() {
        return postCount * 5 + voteCount;
    }

}
