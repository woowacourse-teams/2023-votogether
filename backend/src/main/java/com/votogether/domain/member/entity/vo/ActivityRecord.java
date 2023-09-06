package com.votogether.domain.member.entity.vo;

import lombok.Getter;

@Getter
public class ActivityRecord {

    private static final int POST_WEIGHT = 5;
    private static final int VOTE_WEIGHT = 1;

    private final int postCount;
    private final int voteCount;

    public ActivityRecord(int postCount, int voteCount) {
        this.postCount = postCount;
        this.voteCount = voteCount;
    }

    public int calculateScore() {
        return postCount * POST_WEIGHT + voteCount * VOTE_WEIGHT;
    }

}
