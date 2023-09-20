package com.votogether.domain.vote.repository.dto;

import com.votogether.domain.member.entity.vo.Gender;

public interface VoteCountByAgeGroupAndGenderInterface {

    int getAgeGroup();

    Gender getGender();

    long getVoteCount();

}
