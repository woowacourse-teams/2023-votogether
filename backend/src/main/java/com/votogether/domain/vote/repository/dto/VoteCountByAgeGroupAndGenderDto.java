package com.votogether.domain.vote.repository.dto;

import com.querydsl.core.annotations.QueryProjection;
import com.votogether.domain.member.entity.vo.Gender;

public record VoteCountByAgeGroupAndGenderDto(int ageGroup, Gender gender, long voteCount) {

    @QueryProjection
    public VoteCountByAgeGroupAndGenderDto {
    }

    public static VoteCountByAgeGroupAndGenderDto from(
            final VoteCountByAgeGroupAndGenderInterface voteCountByAgeGroupAndGenderInterface
    ) {
        return new VoteCountByAgeGroupAndGenderDto(
                voteCountByAgeGroupAndGenderInterface.getAgeGroup(),
                voteCountByAgeGroupAndGenderInterface.getGender(),
                voteCountByAgeGroupAndGenderInterface.getVoteCount()
        );
    }

}
