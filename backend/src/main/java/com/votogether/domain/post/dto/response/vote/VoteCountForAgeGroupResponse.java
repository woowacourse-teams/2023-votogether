package com.votogether.domain.post.dto.response.vote;

import com.votogether.domain.member.entity.Gender;
import java.util.Map;

public record VoteCountForAgeGroupResponse(String ageGroup, int voteCount, int maleCount, int femaleCount) {

    public static VoteCountForAgeGroupResponse of(final String ageGroup, final Map<Gender, Long> genderGroup) {
        final int maleCount = genderGroup.getOrDefault(Gender.MALE, 0L).intValue();
        final int femaleCount = genderGroup.getOrDefault(Gender.FEMALE, 0L).intValue();
        final int voteCount = maleCount + femaleCount;

        return new VoteCountForAgeGroupResponse(ageGroup, voteCount, maleCount, femaleCount);
    }

}
