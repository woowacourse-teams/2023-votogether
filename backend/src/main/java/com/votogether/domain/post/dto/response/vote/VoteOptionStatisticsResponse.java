package com.votogether.domain.post.dto.response.vote;

import com.votogether.domain.member.entity.vo.AgeRange;
import com.votogether.domain.member.entity.vo.Gender;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Schema(description = "투표 선택지 통계 응답")
public record VoteOptionStatisticsResponse(
        @Schema(description = "총 투표 수", example = "14")
        int totalVoteCount,

        @Schema(description = "총 남자 투표 수", example = "7")
        int totalMaleCount,

        @Schema(description = "총 여자 투표 수", example = "7")
        int totalFemaleCount,

        @Schema(description = "연령대별 투표 수 응답")
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
