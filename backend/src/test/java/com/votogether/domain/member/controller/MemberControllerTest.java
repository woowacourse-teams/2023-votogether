package com.votogether.domain.member.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

import com.votogether.domain.member.dto.MemberInfoResponse;
import com.votogether.domain.member.entity.Gender;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.SocialType;
import com.votogether.domain.member.service.MemberService;
import com.votogether.global.jwt.TokenProcessor;
import io.restassured.module.mockmvc.RestAssuredMockMvc;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpHeaders;

@Import(TokenProcessor.class)
@WebMvcTest(MemberController.class)
class MemberControllerTest {

    @MockBean
    MemberService memberService;

    @Autowired
    TokenProcessor tokenProcessor;

    @BeforeEach
    void setUp() {
        RestAssuredMockMvc.standaloneSetup(new MemberController(memberService));
    }

    @Test
    @DisplayName("회원 정보를 조회한다.")
    void findMemberInfo() {
        // given
        Member member = Member.builder()
                .nickname("저문")
                .gender(Gender.MALE)
                .ageRange("20~29")
                .birthday("0101")
                .socialType(SocialType.KAKAO)
                .socialId("123123")
                .point(1234)
                .build();

        MemberInfoResponse memberInfoResponse = new MemberInfoResponse(
                "저문",
                1234,
                0,
                0
        );

        given(memberService.register(member)).willReturn(member);
        Member registeredMember = memberService.register(member);
        String token = tokenProcessor.generateToken(registeredMember);

        given(memberService.findMemberInfo(any(Member.class))).willReturn(memberInfoResponse);

        // when
        MemberInfoResponse response = RestAssuredMockMvc
                .given().log().all()
                .headers(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                .when().get("/members/me")
                .then().log().all()
                .extract()
                .as(MemberInfoResponse.class);

        // then
        assertAll(
                () -> assertThat(response.nickname()).isEqualTo("저문"),
                () -> assertThat(response.point()).isEqualTo(1234),
                () -> assertThat(response.postCount()).isEqualTo(0),
                () -> assertThat(response.voteCount()).isEqualTo(0)
        );
    }

}
