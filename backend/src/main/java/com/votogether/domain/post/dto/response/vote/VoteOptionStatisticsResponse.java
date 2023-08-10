package com.votogether.domain.post.dto.response.vote;

import com.votogether.domain.member.entity.AgeRange;
import com.votogether.domain.member.entity.Gender;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public record VoteOptionStatisticsResponse(
        int totalVoteCount,
        int totalMaleCount,
        int totalFemaleCount,
        List<VoteCountForAgeGroupResponse> ageGroup
) {

    public static VoteOptionStatisticsResponse from(final Map<String, Map<Gender, Long>> voteStatusGroup) {
        final List<VoteCountForAgeGroupResponse> ageGroupStatistics = Arrays.stream(AgeRange.values())
                .map(AgeRange::getName)
                .map(ageName ->
                        VoteCountForAgeGroupResponse.of(
                                ageName,
                                voteStatusGroup.computeIfAbsent(ageName, ignore -> new HashMap<>())
                        )
                )
                .toList();

        final int totalVoteCount = ageGroupStatistics.stream().mapToInt(VoteCountForAgeGroupResponse::voteCount).sum();
        final int totalMaleCount = ageGroupStatistics.stream().mapToInt(VoteCountForAgeGroupResponse::maleCount).sum();
        final int totalFemaleCount =
                ageGroupStatistics.stream().mapToInt(VoteCountForAgeGroupResponse::femaleCount).sum();

        return new VoteOptionStatisticsResponse(totalVoteCount, totalMaleCount, totalFemaleCount, ageGroupStatistics);
    }

}
