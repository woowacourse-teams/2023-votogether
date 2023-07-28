package com.votogether.domain.post.controller;

import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.equalTo;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.willDoNothing;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.service.MemberService;
import com.votogether.domain.post.dto.request.CommentRegisterRequest;
import com.votogether.domain.post.service.PostCommentService;
import com.votogether.fixtures.MemberFixtures;
import com.votogether.global.jwt.TokenPayload;
import com.votogether.global.jwt.TokenProcessor;
import io.restassured.module.mockmvc.RestAssuredMockMvc;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.NullAndEmptySource;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.context.WebApplicationContext;

@WebMvcTest(PostCommentController.class)
class PostCommentControllerTest {

    @MockBean
    PostCommentService postCommentService;

    @MockBean
    MemberService memberService;

    @MockBean
    TokenProcessor tokenProcessor;

    @BeforeEach
    void setUp(WebApplicationContext webApplicationContext) {
        RestAssuredMockMvc.standaloneSetup(new PostCommentController(postCommentService));
        RestAssuredMockMvc.webAppContextSetup(webApplicationContext);
    }

    @Nested
    @DisplayName("게시글 댓글 등록 시 ")
    class CreateComment {

        @ParameterizedTest
        @ValueSource(strings = {"@", "a", "가"})
        @DisplayName("ID로 변환할 수 없는 타입이라면 400을 응답한다.")
        void invalidIDType(String id) throws Exception {
            // given
            TokenPayload tokenPayload = new TokenPayload(1L, 1L, 1L);
            given(tokenProcessor.resolveToken(anyString())).willReturn("token");
            given(tokenProcessor.parseToken(anyString())).willReturn(tokenPayload);
            given(memberService.findById(anyLong())).willReturn(MemberFixtures.MALE_20.get());

            // when, then
            RestAssuredMockMvc.given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, "Bearer token")
                    .when().post("/posts/{postId}/comments", id)
                    .then().log().all()
                    .status(HttpStatus.BAD_REQUEST)
                    .body("code", equalTo(-9998))
                    .body("message", equalTo("postId는 Long 타입이 필요합니다."));
        }

        @ParameterizedTest
        @NullAndEmptySource
        @DisplayName("댓글 내용이 존재하지 않으면 400을 응답한다.")
        void emptyContent(String content) throws Exception {
            // given
            TokenPayload tokenPayload = new TokenPayload(1L, 1L, 1L);
            given(tokenProcessor.resolveToken(anyString())).willReturn("token");
            given(tokenProcessor.parseToken(anyString())).willReturn(tokenPayload);
            given(memberService.findById(anyLong())).willReturn(MemberFixtures.MALE_20.get());

            CommentRegisterRequest commentRegisterRequest = new CommentRegisterRequest(content);

            // when, then
            RestAssuredMockMvc.given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, "Bearer token")
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(commentRegisterRequest)
                    .when().post("/posts/{postId}/comments", 1)
                    .then().log().all()
                    .status(HttpStatus.BAD_REQUEST)
                    .body("code", equalTo(-9997))
                    .body("message", containsString("댓글 내용은 존재해야 합니다."));
        }

        @Test
        @DisplayName("댓글을 정상적으로 등록하면 201을 응답한다.")
        void createComment() throws Exception {
            // given
            TokenPayload tokenPayload = new TokenPayload(1L, 1L, 1L);
            given(tokenProcessor.resolveToken(anyString())).willReturn("token");
            given(tokenProcessor.parseToken(anyString())).willReturn(tokenPayload);
            given(memberService.findById(anyLong())).willReturn(MemberFixtures.MALE_20.get());

            CommentRegisterRequest commentRegisterRequest = new CommentRegisterRequest("댓글입니다.");
            willDoNothing().given(postCommentService)
                    .createComment(any(Member.class), anyLong(), any(CommentRegisterRequest.class));

            // when, then
            RestAssuredMockMvc.given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, "Bearer token")
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(commentRegisterRequest)
                    .when().post("/posts/{postId}/comments", 1)
                    .then().log().all()
                    .status(HttpStatus.CREATED);
        }

    }

    @Nested
    @DisplayName("게시글 댓글 삭제")
    class DeleteComment {

        @ParameterizedTest
        @ValueSource(strings = {"@", "a", "가"})
        @DisplayName("게시글 ID가 Long 타입으로 변환할 수 없는 값이라면 400을 응답한다.")
        void invalidPostIDType(String postId) throws Exception {
            // given
            TokenPayload tokenPayload = new TokenPayload(1L, 1L, 1L);
            given(tokenProcessor.resolveToken(anyString())).willReturn("token");
            given(tokenProcessor.parseToken(anyString())).willReturn(tokenPayload);
            given(memberService.findById(anyLong())).willReturn(MemberFixtures.MALE_20.get());

            // when, then
            RestAssuredMockMvc.given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, "Bearer token")
                    .when().delete("/posts/{postId}/comments/{commentId}", postId, 1L)
                    .then().log().all()
                    .status(HttpStatus.BAD_REQUEST)
                    .body("code", equalTo(-9998))
                    .body("message", containsString("postId는 Long 타입이 필요합니다."));
        }

        @ParameterizedTest
        @ValueSource(strings = {"@", "a", "가"})
        @DisplayName("댓글 ID가 Long 타입으로 변환할 수 없는 값이라면 400을 응답한다.")
        void invalidCommentIDType(String commentId) throws Exception {
            // given
            TokenPayload tokenPayload = new TokenPayload(1L, 1L, 1L);
            given(tokenProcessor.resolveToken(anyString())).willReturn("token");
            given(tokenProcessor.parseToken(anyString())).willReturn(tokenPayload);
            given(memberService.findById(anyLong())).willReturn(MemberFixtures.MALE_20.get());

            // when, then
            RestAssuredMockMvc.given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, "Bearer token")
                    .when().delete("/posts/{postId}/comments/{commentId}", 1L, commentId)
                    .then().log().all()
                    .status(HttpStatus.BAD_REQUEST)
                    .body("code", equalTo(-9998))
                    .body("message", containsString("commentId는 Long 타입이 필요합니다."));
        }

        @Test
        @DisplayName("댓글을 정상적으로 삭제하면 204를 응답한다.")
        void deleteComment() throws Exception {
            // given
            TokenPayload tokenPayload = new TokenPayload(1L, 1L, 1L);
            given(tokenProcessor.resolveToken(anyString())).willReturn("token");
            given(tokenProcessor.parseToken(anyString())).willReturn(tokenPayload);
            given(memberService.findById(anyLong())).willReturn(MemberFixtures.MALE_20.get());

            willDoNothing().given(postCommentService).deleteComment(any(Member.class), anyLong(), anyLong());

            // when, then
            RestAssuredMockMvc.given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, "Bearer token")
                    .when().delete("/posts/{postId}/comments/{commentId}", 1L, 1L)
                    .then().log().all()
                    .status(HttpStatus.NO_CONTENT);
        }

    }

}
