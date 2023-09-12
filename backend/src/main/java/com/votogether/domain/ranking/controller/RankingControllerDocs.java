package com.votogether.domain.ranking.controller;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.ranking.dto.response.RankingResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import org.springframework.http.ResponseEntity;

@Tag(name = "랭킹", description = "랭킹 API")
public interface RankingControllerDocs {

    @Operation(summary = "나의 열정 랭킹 조회", description = "나의 열정 랭킹 정보를 조회한다.")
    @ApiResponse(responseCode = "200", description = "나의 열정 랭킹 정보 조회 성공")
    ResponseEntity<RankingResponse> getRanking(final Member member);

    @Operation(summary = "상위 10명의 열정 랭킹 조회", description = "상위 10명의 열정 랭킹 정보를 조회한다.")
    @ApiResponse(responseCode = "200", description = "상위 10명의 열정 랭킹 조회 성공")
    ResponseEntity<List<RankingResponse>> getPassionRankings();

}
