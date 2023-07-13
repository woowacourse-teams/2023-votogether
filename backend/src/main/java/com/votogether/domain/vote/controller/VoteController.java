package com.votogether.domain.vote.controller;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.vote.service.VoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class VoteController {

    private final VoteService voteService;

    @PostMapping("/posts/{postId}/options/{optionId}")
    public ResponseEntity<Void> vote(
            @PathVariable final Long postId,
            @PathVariable("optionId") final Long postOptionId,
            final Member member
    ) {
        voteService.vote(member, postId, postOptionId);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }


}
