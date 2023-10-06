package com.votogether.domain.post.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.equalTo;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.willDoNothing;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.dto.request.comment.CommentCreateRequest;
import com.votogether.domain.post.dto.request.comment.CommentUpdateRequest;
import com.votogether.domain.post.dto.response.comment.CommentResponse;
import com.votogether.domain.post.dto.response.comment.CommentWriterResponse;
import com.votogether.domain.post.service.PostCommentService;
import com.votogether.test.ControllerTest;
import io.restassured.common.mapper.TypeRef;
import io.restassured.module.mockmvc.RestAssuredMockMvc;
import java.time.LocalDateTime;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.NullAndEmptySource;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(PostCommentController.class)
class PostCommentControllerTest extends ControllerTest {

    @MockBean
    PostCommentService postCommentService;

    @Autowired
    MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        RestAssuredMockMvc.mockMvc(mockMvc);
    }

    @Nested
    @DisplayName("게시글 댓글 목록 조회")
    class GetComments {

        @Test
        @DisplayName("정상적인 요청이라면 게시글 댓글 목록과 200 응답을 반환한다.")
        void getComments() {
            // given
            List<CommentResponse> response = List.of(
                    new CommentResponse(
                            1L,
                            new CommentWriterResponse(1L, "votogetherA"),
                            "helloA",
                            LocalDateTime.now(),
                            LocalDateTime.now()
                    ),
                    new CommentResponse(
                            2L,
                            new CommentWriterResponse(2L, "votogetherB"),
                            "helloB",
                            LocalDateTime.now(),
                            LocalDateTime.now()
                    )
            );
            given(postCommentService.getComments(anyLong())).willReturn(response);

            // when
            List<CommentResponse> result = RestAssuredMockMvc.given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, BEARER_TOKEN)
                    .when().get("/posts/{postId}/comments", 1L)
                    .then().log().all()
                    .status(HttpStatus.OK)
                    .extract()
                    .as(new TypeRef<>() {
                    });

            // then
            assertThat(result).usingRecursiveComparison()
                    .ignoringFieldsOfTypes(LocalDateTime.class)
                    .isEqualTo(response);
        }

        @ParameterizedTest
        @ValueSource(strings = {"@", "a", "가"})
        @DisplayName("게시글 ID가 Long 타입으로 변환할 수 없는 값이라면 400 응답을 반환한다.")
        void invalidPostIDType(String postId) {
            // given, when, then
            RestAssuredMockMvc.given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, BEARER_TOKEN)
                    .when().get("/posts/{postId}/comments", postId)
                    .then().log().all()
                    .status(HttpStatus.BAD_REQUEST)
                    .body("code", equalTo(202))
                    .body("message", containsString("Long 타입으로 변환할 수 없는 요청입니다."));
        }

        @ParameterizedTest
        @ValueSource(longs = {-1L, 0})
        @DisplayName("게시글 ID가 양의 정수가 아니라면 400 응답을 반환한다.")
        void notPositivePostId(Long postId) {
            // given, when, then
            RestAssuredMockMvc.given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, BEARER_TOKEN)
                    .when().get("/posts/{postId}/comments", postId)
                    .then().log().all()
                    .status(HttpStatus.BAD_REQUEST)
                    .body("code", equalTo(201))
                    .body("message", containsString("게시글 ID는 양의 정수만 가능합니다."));
        }

    }

    @Nested
    @DisplayName("게시글 댓글 등록 시 ")
    class CreateComment {

        @Test
        @DisplayName("정상적인 요청이라면 댓글을 등록하고 201 응답을 반환한다.")
        void createComment() throws Exception {
            // given
            mockingAuthArgumentResolver();
            CommentCreateRequest commentCreateRequest = new CommentCreateRequest("댓글입니다.");
            willDoNothing().given(postCommentService)
                    .createComment(anyLong(), any(CommentCreateRequest.class), any(Member.class));

            // when, then
            RestAssuredMockMvc.given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, BEARER_TOKEN)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(commentCreateRequest)
                    .when().post("/posts/{postId}/comments", 1)
                    .then().log().all()
                    .status(HttpStatus.CREATED);
        }

        @ParameterizedTest
        @ValueSource(strings = {"@", "a", "가"})
        @DisplayName("게시글 ID가 Long 타입으로 변환할 수 없는 값이라면 400 응답을 반환한다.")
        void invalidIDType(String postId) throws Exception {
            // given
            mockingAuthArgumentResolver();
            CommentCreateRequest commentCreateRequest = new CommentCreateRequest("hello");

            // when, then
            RestAssuredMockMvc.given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, BEARER_TOKEN)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(commentCreateRequest)
                    .when().post("/posts/{postId}/comments", postId)
                    .then().log().all()
                    .status(HttpStatus.BAD_REQUEST)
                    .body("code", equalTo(202))
                    .body("message", containsString("Long 타입으로 변환할 수 없는 요청입니다."));
        }

        @ParameterizedTest
        @ValueSource(longs = {-1L, 0})
        @DisplayName("게시글 ID가 양의 정수가 아니라면 400 응답을 반환한다.")
        void notPositivePostId(Long postId) throws Exception {
            // given
            mockingAuthArgumentResolver();
            CommentCreateRequest commentCreateRequest = new CommentCreateRequest("hello");

            // when, then
            RestAssuredMockMvc.given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, BEARER_TOKEN)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(commentCreateRequest)
                    .when().post("/posts/{postId}/comments", postId)
                    .then().log().all()
                    .status(HttpStatus.BAD_REQUEST)
                    .body("code", equalTo(201))
                    .body("message", containsString("게시글 ID는 양의 정수만 가능합니다."));
        }

        @ParameterizedTest
        @NullAndEmptySource
        @DisplayName("댓글 내용이 존재하지 않으면 400 응답을 반환한다.")
        void emptyContent(String content) throws Exception {
            // given
            mockingAuthArgumentResolver();
            CommentCreateRequest commentCreateRequest = new CommentCreateRequest(content);

            // when, then
            RestAssuredMockMvc.given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, BEARER_TOKEN)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(commentCreateRequest)
                    .when().post("/posts/{postId}/comments", 1)
                    .then().log().all()
                    .status(HttpStatus.BAD_REQUEST)
                    .body("code", equalTo(200))
                    .body("message", containsString("댓글 내용은 존재해야 합니다."));
        }

    }

    @Nested
    @DisplayName("게시글 댓글 수정")
    class UpdateComment {

        @Test
        @DisplayName("정상적인 요청이라면 댓글을 수정하고 200 응답을 반환한다.")
        void updateComment() throws Exception {
            // given
            mockingAuthArgumentResolver();
            CommentUpdateRequest request = new CommentUpdateRequest("hello");
            willDoNothing().given(postCommentService)
                    .updateComment(anyLong(), anyLong(), any(CommentUpdateRequest.class), any(Member.class));

            // when, then
            RestAssuredMockMvc.given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, BEARER_TOKEN)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(request)
                    .when().put("/posts/{postId}/comments/{commentId}", 1L, 1L)
                    .then().log().all()
                    .status(HttpStatus.OK);
        }

        @ParameterizedTest
        @ValueSource(strings = {"@", "a", "가"})
        @DisplayName("게시글 ID가 Long 타입으로 변환할 수 없는 값이라면 400 응답을 반환한다.")
        void invalidPostIDType(String postId) throws Exception {
            // given
            mockingAuthArgumentResolver();
            CommentUpdateRequest request = new CommentUpdateRequest("hello");

            // when, then
            RestAssuredMockMvc.given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, BEARER_TOKEN)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(request)
                    .when().put("/posts/{postId}/comments/{commentId}", postId, 1L)
                    .then().log().all()
                    .status(HttpStatus.BAD_REQUEST)
                    .body("code", equalTo(202))
                    .body("message", containsString("Long 타입으로 변환할 수 없는 요청입니다."));
        }

        @ParameterizedTest
        @ValueSource(strings = {"@", "a", "가"})
        @DisplayName("댓글 ID가 Long 타입으로 변환할 수 없는 값이라면 400 응답을 반환한다.")
        void invalidCommentIDType(String commentId) throws Exception {
            // given
            mockingAuthArgumentResolver();
            CommentUpdateRequest request = new CommentUpdateRequest("hello");

            // when, then
            RestAssuredMockMvc.given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, BEARER_TOKEN)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(request)
                    .when().put("/posts/{postId}/comments/{commentId}", 1L, commentId)
                    .then().log().all()
                    .status(HttpStatus.BAD_REQUEST)
                    .body("code", equalTo(202))
                    .body("message", containsString("Long 타입으로 변환할 수 없는 요청입니다."));
        }

        @ParameterizedTest
        @ValueSource(longs = {-1L, 0})
        @DisplayName("게시글 ID가 양의 정수가 아니라면 400 응답을 반환한다.")
        void notPositivePostId(Long postId) throws Exception {
            // given
            mockingAuthArgumentResolver();
            CommentUpdateRequest commentCreateRequest = new CommentUpdateRequest("hello");

            // when, then
            RestAssuredMockMvc.given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, BEARER_TOKEN)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(commentCreateRequest)
                    .when().put("/posts/{postId}/comments/{commentId}", postId, 1L)
                    .then().log().all()
                    .status(HttpStatus.BAD_REQUEST)
                    .body("code", equalTo(201))
                    .body("message", containsString("게시글 ID는 양의 정수만 가능합니다."));
        }

        @ParameterizedTest
        @ValueSource(longs = {-1L, 0})
        @DisplayName("댓글 ID가 양의 정수가 아니라면 400 응답을 반환한다.")
        void notPositiveCommentId(Long commentId) throws Exception {
            // given
            mockingAuthArgumentResolver();
            CommentUpdateRequest commentCreateRequest = new CommentUpdateRequest("hello");

            // when, then
            RestAssuredMockMvc.given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, BEARER_TOKEN)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(commentCreateRequest)
                    .when().put("/posts/{postId}/comments/{commentId}", 1L, commentId)
                    .then().log().all()
                    .status(HttpStatus.BAD_REQUEST)
                    .body("code", equalTo(201))
                    .body("message", containsString("댓글 ID는 양의 정수만 가능합니다."));
        }

        @ParameterizedTest
        @NullAndEmptySource
        @DisplayName("수정할 댓글 내용이 비어있거나 존재하지 않으면 400 응답을 반환한다.")
        void nullAndEmptyCommentContent(String content) throws Exception {
            // given
            mockingAuthArgumentResolver();
            CommentUpdateRequest request = new CommentUpdateRequest(content);

            // when, then
            RestAssuredMockMvc.given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, BEARER_TOKEN)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(request)
                    .when().put("/posts/{postId}/comments/{commentId}", 1L, 1L)
                    .then().log().all()
                    .status(HttpStatus.BAD_REQUEST)
                    .body("code", equalTo(200))
                    .body("message", containsString("댓글 내용은 존재해야 합니다."));
        }

    }

    @Nested
    @DisplayName("게시글 댓글 삭제")
    class DeleteComment {

        @Test
        @DisplayName("정상적인 요청이라면 댓글을 삭제하고 204응답을 반환한다.")
        void deleteComment() throws Exception {
            // given
            mockingAuthArgumentResolver();
            willDoNothing().given(postCommentService).deleteComment(anyLong(), anyLong(), any(Member.class));

            // when, then
            RestAssuredMockMvc.given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, BEARER_TOKEN)
                    .when().delete("/posts/{postId}/comments/{commentId}", 1L, 1L)
                    .then().log().all()
                    .status(HttpStatus.NO_CONTENT);
        }

        @ParameterizedTest
        @ValueSource(strings = {"@", "a", "가"})
        @DisplayName("게시글 ID가 Long 타입으로 변환할 수 없는 값이라면 400 응답을 반환한다.")
        void invalidPostIDType(String postId) throws Exception {
            // given
            mockingAuthArgumentResolver();

            // when, then
            RestAssuredMockMvc.given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, BEARER_TOKEN)
                    .when().delete("/posts/{postId}/comments/{commentId}", postId, 1L)
                    .then().log().all()
                    .status(HttpStatus.BAD_REQUEST)
                    .body("code", equalTo(202))
                    .body("message", containsString("Long 타입으로 변환할 수 없는 요청입니다."));
        }

        @ParameterizedTest
        @ValueSource(strings = {"@", "a", "가"})
        @DisplayName("댓글 ID가 Long 타입으로 변환할 수 없는 값이라면 400 응답을 반환한다.")
        void invalidCommentIDType(String commentId) throws Exception {
            // given
            mockingAuthArgumentResolver();

            // when, then
            RestAssuredMockMvc.given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, BEARER_TOKEN)
                    .when().delete("/posts/{postId}/comments/{commentId}", 1L, commentId)
                    .then().log().all()
                    .status(HttpStatus.BAD_REQUEST)
                    .body("code", equalTo(202))
                    .body("message", containsString("Long 타입으로 변환할 수 없는 요청입니다."));
        }

        @ParameterizedTest
        @ValueSource(longs = {-1L, 0})
        @DisplayName("게시글 ID가 양의 정수가 아니라면 400 응답을 반환한다.")
        void notPositivePostId(Long postId) throws Exception {
            // given
            mockingAuthArgumentResolver();

            // when, then
            RestAssuredMockMvc.given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, BEARER_TOKEN)
                    .when().delete("/posts/{postId}/comments/{commentId}", postId, 1L)
                    .then().log().all()
                    .status(HttpStatus.BAD_REQUEST)
                    .body("code", equalTo(201))
                    .body("message", containsString("게시글 ID는 양의 정수만 가능합니다."));
        }

        @ParameterizedTest
        @ValueSource(longs = {-1L, 0})
        @DisplayName("댓글 ID가 양의 정수가 아니라면 400 응답을 반환한다.")
        void notPositiveCommentId(Long commentId) throws Exception {
            // given
            mockingAuthArgumentResolver();

            // when, then
            RestAssuredMockMvc.given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, BEARER_TOKEN)
                    .when().delete("/posts/{postId}/comments/{commentId}", 1L, commentId)
                    .then().log().all()
                    .status(HttpStatus.BAD_REQUEST)
                    .body("code", equalTo(201))
                    .body("message", containsString("댓글 ID는 양의 정수만 가능합니다."));
        }

    }

}
