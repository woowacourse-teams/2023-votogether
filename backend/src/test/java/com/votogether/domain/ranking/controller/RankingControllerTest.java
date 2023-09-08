package com.votogether.domain.ranking.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.service.MemberService;
import com.votogether.domain.ranking.dto.response.RankingResponse;
import com.votogether.domain.ranking.service.RankingService;
import com.votogether.global.jwt.TokenPayload;
import com.votogether.global.jwt.TokenProcessor;
import com.votogether.test.fixtures.MemberFixtures;
import io.restassured.module.mockmvc.RestAssuredMockMvc;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.context.WebApplicationContext;

@WebMvcTest(RankingController.class)
class RankingControllerTest {

    @MockBean
    RankingService rankingService;

    @MockBean
    MemberService memberService;

    @MockBean
    TokenProcessor tokenProcessor;

    @BeforeEach
    void setUp(final WebApplicationContext webApplicationContext) {
        RestAssuredMockMvc.standaloneSetup(new RankingController(rankingService));
        RestAssuredMockMvc.webAppContextSetup(webApplicationContext);
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

        given(rankingService.getRanking(member)).willReturn(response);

        // when, then
        RankingResponse result = RestAssuredMockMvc
                .given().log().all()
                .headers(HttpHeaders.AUTHORIZATION, "Bearer token")
                .when().get("/members/me/ranking")
                .then().log().all()
                .statusCode(HttpStatus.OK.value())
                .extract()
                .as(RankingResponse.class);

        assertThat(result).isEqualTo(response);
    }

}
