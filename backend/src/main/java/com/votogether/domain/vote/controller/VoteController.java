package com.votogether.domain.vote.controller;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.vote.service.VoteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name = "투표", description = "투표 API")
@RequiredArgsConstructor
public class VoteController {

    private final VoteService voteService;

    @Operation(summary = "투표하기", description = "게시글의 선택지에 투표를 한다.")
    @ApiResponse(responseCode = "201", description = "투표 성공")
    @PostMapping("/posts/{postId}/options/{optionId}")
    public ResponseEntity<Void> vote(
            @PathVariable final Long postId,
            @PathVariable("optionId") final Long postOptionId,
            final Member member
    ) {
        voteService.vote(member, postId, postOptionId);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }


    @Operation(summary = "투표 수정하기", description = "게시글의 선택지의 투표를 수정한다.")
    @ApiResponse(responseCode = "200", description = "투표 수정 성공")
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
