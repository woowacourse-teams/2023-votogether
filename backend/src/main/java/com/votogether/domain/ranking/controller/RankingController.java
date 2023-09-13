package com.votogether.domain.ranking.controller;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.ranking.dto.response.RankingResponse;
import com.votogether.domain.ranking.service.RankingService;
import com.votogether.global.jwt.Auth;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class RankingController implements RankingControllerDocs {

    private final RankingService rankingService;

    @GetMapping("/members/me/ranking/passion")
    public ResponseEntity<RankingResponse> getRanking(@Auth final Member member) {
        final RankingResponse response = rankingService.getPassionRanking(member);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/members/ranking/passion/guest")
    public ResponseEntity<List<RankingResponse>> getPassionRankings() {
        final List<RankingResponse> response = rankingService.getPassionRanking();
        return ResponseEntity.ok(response);
    }

}
