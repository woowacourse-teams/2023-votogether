package com.votogether.domain.vote.controller;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.vote.service.VoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

    @PatchMapping("/posts/{postId}/options")
    public ResponseEntity<Void> changeVote(
            @PathVariable final Long postId,
            @RequestParam("source") final Long originPostOptionId,
            @RequestParam("target") final Long newPostOptionId,
            final Member member
    ) {
        voteService.changeVote(member, postId, originPostOptionId, newPostOptionId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
