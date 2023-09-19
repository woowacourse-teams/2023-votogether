package com.votogether.domain.post.dto.response.vote;

import com.votogether.domain.member.entity.vo.AgeRange;
import com.votogether.domain.member.entity.vo.Gender;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.Map;

@Schema(description = "연령대별 투표 통계 응답")
public record VoteCountForAgeGroupResponse(
        @Schema(description = "연령대", example = "20대")
        String ageGroup,

        @Schema(description = "총 투표 수", example = "14")
        int voteCount,

        @Schema(description = "남자 투표 수", example = "7")
        int maleCount,

        @Schema(description = "여자 투표 수", example = "7")
        int femaleCount
) {

    public static VoteCountForAgeGroupResponse of(final AgeRange ageRange, final Map<Gender, Long> genderGroup) {
        final int maleCount = genderGroup.getOrDefault(Gender.MALE, 0L).intValue();
        final int femaleCount = genderGroup.getOrDefault(Gender.FEMALE, 0L).intValue();
        final int voteCount = maleCount + femaleCount;

        return new VoteCountForAgeGroupResponse(ageRange.getName(), voteCount, maleCount, femaleCount);
    }

}
