package com.votogether.domain.ranking.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.ranking.dto.response.RankingResponse;
import com.votogether.domain.ranking.service.RankingService;
import com.votogether.global.jwt.TokenPayload;
import com.votogether.test.ControllerTest;
import com.votogether.test.fixtures.MemberFixtures;
import io.restassured.common.mapper.TypeRef;
import io.restassured.module.mockmvc.RestAssuredMockMvc;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.context.WebApplicationContext;

@WebMvcTest(RankingController.class)
class RankingControllerTest extends ControllerTest {

    @MockBean
    RankingService rankingService;

    @BeforeEach
    void setUp(final WebApplicationContext webApplicationContext) {
        RestAssuredMockMvc.standaloneSetup(new RankingController(rankingService));
    }

    @Test
    @DisplayName("회원의 랭킹 순위를 가져온다.")
    void getRanking() throws Exception {
        // given
        Member member = MemberFixtures.MALE_20.get();
        RankingResponse response = new RankingResponse(3, "익명의손님1", 1, 1, 6);

        TokenPayload tokenPayload = new TokenPayload(1L, 1L, 1L);
        given(tokenProcessor.resolveToken(anyString())).willReturn("token");
        given(tokenProcessor.parseToken(anyString())).willReturn(tokenPayload);
        given(memberService.findById(anyLong())).willReturn(member);

        given(rankingService.getPassionRanking(member)).willReturn(response);

        // when, then
        RankingResponse result = RestAssuredMockMvc
                .given().log().all()
                .headers(HttpHeaders.AUTHORIZATION, "Bearer token")
                .contentType(MediaType.APPLICATION_JSON)
                .when().get("/members/me/ranking/passion")
                .then().log().all()
                .statusCode(HttpStatus.OK.value())
                .extract()
                .as(RankingResponse.class);

        assertThat(result).isEqualTo(response);
    }

    @Test
    @DisplayName("상위 10명의 랭킹을 조회한다.")
    void getPassionRankingTop10() {
        // given
        Member memberA = MemberFixtures.MALE_20.get();
        Member memberB = MemberFixtures.MALE_30.get();
        Member memberC = MemberFixtures.MALE_40.get();
        Member memberD = MemberFixtures.MALE_50.get();
        Member memberE = MemberFixtures.MALE_60.get();
        Member memberF = MemberFixtures.FEMALE_20.get();
        Member memberG = MemberFixtures.FEMALE_30.get();
        Member memberH = MemberFixtures.FEMALE_30.get();
        Member memberI = MemberFixtures.FEMALE_30.get();
        Member memberJ = MemberFixtures.FEMALE_30.get();

        List<Member> members = List.of(
                memberA, memberB, memberC, memberD, memberE,
                memberF, memberG, memberH, memberI, memberJ
        );
        List<RankingResponse> response = new ArrayList<>();
        for (Member member : members) {
            response.add(new RankingResponse(1, member.getNickname(), 0, 0, 0));
        }

        given(rankingService.getPassionRanking()).willReturn(response);

        // when
        List<RankingResponse> responses = RestAssuredMockMvc
                .given().log().all()
                .contentType(MediaType.APPLICATION_JSON)
                .when().get("/members/ranking/passion/guest")
                .then().log().all()
                .statusCode(HttpStatus.OK.value())
                .extract()
                .as(new TypeRef<>() {
                });

        // then
        assertThat(responses).usingRecursiveComparison().isEqualTo(response);
    }

}
