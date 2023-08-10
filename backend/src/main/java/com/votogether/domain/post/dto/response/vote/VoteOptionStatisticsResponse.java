package com.votogether.domain.post.dto.response.vote;

import com.votogether.domain.member.entity.Gender;
import java.util.List;
import java.util.Map;

public record VoteOptionStatisticsResponse(
        int totalVoteCount,
        int totalMaleCount,
        int totalFemaleCount,
        List<VoteCountForAgeGroupResponse> ageGroup
) {

    public static VoteOptionStatisticsResponse from(final Map<String, Map<Gender, Long>> voteStatusGroup) {
        final List<VoteCountForAgeGroupResponse> ageGroupStatistics = voteStatusGroup.keySet()
                .stream()
                .map(ageRange -> VoteCountForAgeGroupResponse.of(ageRange, voteStatusGroup.get(ageRange)))
                .toList();

        final int totalVoteCount = ageGroupStatistics.stream().mapToInt(VoteCountForAgeGroupResponse::voteCount).sum();
        final int totalMaleCount = ageGroupStatistics.stream().mapToInt(VoteCountForAgeGroupResponse::maleCount).sum();
        final int totalFemaleCount =
                ageGroupStatistics.stream().mapToInt(VoteCountForAgeGroupResponse::femaleCount).sum();

        return new VoteOptionStatisticsResponse(totalVoteCount, totalMaleCount, totalFemaleCount, ageGroupStatistics);
    }

}
