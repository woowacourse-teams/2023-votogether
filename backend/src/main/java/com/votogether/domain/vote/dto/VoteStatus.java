package com.votogether.domain.vote.dto;

import com.votogether.domain.member.entity.Gender;

public record VoteStatus(Integer birthYear, Gender gender, long count) {
}
