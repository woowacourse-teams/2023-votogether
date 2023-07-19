package com.votogether.domain.vote.repository;

import com.votogether.domain.vote.dto.VoteStatus;
import java.util.List;

public interface VoteCustomRepository {

    List<VoteStatus> findVoteCountByPostOptionIdGroupByAgeRangeAndGender(final Long postOptionId);

}
