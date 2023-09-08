package com.votogether.domain.post.dto.response.vote;

import com.votogether.domain.member.entity.vo.AgeRange;
import com.votogether.domain.member.entity.vo.Gender;
import com.votogether.domain.vote.repository.dto.VoteCountByAgeGroupAndGenderDto;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.Arrays;
import java.util.EnumMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

    public static VoteOptionStatisticsResponse from(final List<VoteCountByAgeGroupAndGenderDto> voteCounts) {
        final Map<AgeRange, Map<Gender, Long>> ageRangeGroup = formAgeRangeGroup(voteCounts);
        final List<VoteCountForAgeGroupResponse> ageGroupStatistics = Arrays.stream(AgeRange.values())
                .map(ageRange ->
                        VoteCountForAgeGroupResponse.of(
                                ageRange,
                                ageRangeGroup.computeIfAbsent(ageRange, ignore -> new EnumMap<>(Gender.class))
                        )
                )
                .toList();

        final int totalVoteCount = ageGroupStatistics.stream().mapToInt(VoteCountForAgeGroupResponse::voteCount).sum();
        final int totalMaleCount = ageGroupStatistics.stream().mapToInt(VoteCountForAgeGroupResponse::maleCount).sum();
        final int totalFemaleCount =
                ageGroupStatistics.stream().mapToInt(VoteCountForAgeGroupResponse::femaleCount).sum();

        return new VoteOptionStatisticsResponse(totalVoteCount, totalMaleCount, totalFemaleCount, ageGroupStatistics);
    }

    private static Map<AgeRange, Map<Gender, Long>> formAgeRangeGroup(
            final List<VoteCountByAgeGroupAndGenderDto> voteCounts
    ) {
        return voteCounts.stream()
                .collect(Collectors.groupingBy(
                        voteCount -> AgeRange.from(voteCount.ageGroup()),
                        LinkedHashMap::new,
                        Collectors.toMap(
                                VoteCountByAgeGroupAndGenderDto::gender,
                                VoteCountByAgeGroupAndGenderDto::voteCount,
                                (exist, replace) -> replace,
                                () -> new EnumMap<>(Gender.class)
                        )
                ));
    }

}
