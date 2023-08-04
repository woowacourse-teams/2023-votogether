package com.votogether.domain.vote.dto;

import com.votogether.domain.member.entity.Gender;

public record VoteStatus(String ageRange, Gender gender, long count) {
}
