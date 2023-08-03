package com.votogether.domain.post.dto.response.vote;

import com.votogether.domain.member.entity.Gender;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.Getter;

public record VoteOptionStatisticsResponse(
        int totalVoteCount,
        int totalMaleCount,
        int totalFemaleCount,
        List<VoteCountForAgeGroupResponse> ageGroup
) {

    public static VoteOptionStatisticsResponse from(final Map<String, Map<Gender, Long>> voteStatusGroup) {
        final List<VoteCountForAgeGroupResponse> ageGroupStatistics = Arrays.stream(AgeBracket.values())
                .map(ageBracket -> {
                    final Map<Gender, Long> genderVotes =
                            voteStatusGroup.getOrDefault(ageBracket.getAge(), new HashMap<>());
                    return VoteCountForAgeGroupResponse.of(ageBracket.getBracket(), genderVotes);
                })
                .collect(Collectors.toList());

        final int totalVoteCount = ageGroupStatistics.stream().mapToInt(VoteCountForAgeGroupResponse::voteCount).sum();
        final int totalMaleCount = ageGroupStatistics.stream().mapToInt(VoteCountForAgeGroupResponse::maleCount).sum();
        final int totalFemaleCount =
                ageGroupStatistics.stream().mapToInt(VoteCountForAgeGroupResponse::femaleCount).sum();

        return new VoteOptionStatisticsResponse(totalVoteCount, totalMaleCount, totalFemaleCount, ageGroupStatistics);
    }

    @Getter
    enum AgeBracket {

        UNDER_TEN("1~9", "10대 미만"),
        TEN("10~19", "10대"),
        TWENTY("20~29", "20대"),
        THIRTY("30~39", "30대"),
        FORTY("40~49", "40대"),
        FIFTY("50~59", "50대"),
        OVER_SIXTY("60~", "60대 이상"),
        ;

        private final String age;
        private final String bracket;

        AgeBracket(final String age, final String bracket) {
            this.age = age;
            this.bracket = bracket;
        }
    }

}
