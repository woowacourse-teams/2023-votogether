package com.votogether.domain.post.controller;

import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.equalTo;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.willDoNothing;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.dto.request.post.PostCreateRequest;
import com.votogether.domain.post.dto.request.post.PostUpdateRequest;
import com.votogether.domain.post.service.PostCommandService;
import com.votogether.global.exception.GlobalExceptionHandler;
import com.votogether.test.ControllerTest;
import io.restassured.http.ContentType;
import io.restassured.module.mockmvc.RestAssuredMockMvc;
import java.io.File;
import java.time.LocalDateTime;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

@WebMvcTest(PostCommandController.class)
class PostCommandControllerTest extends ControllerTest {

    @MockBean
    PostCommandService postCommandService;

    @BeforeEach
    void setUp(WebApplicationContext webApplicationContext) {
        RestAssuredMockMvc.standaloneSetup(
                MockMvcBuilders
                        .standaloneSetup(new PostCommandController(postCommandService))
                        .setControllerAdvice(GlobalExceptionHandler.class)
        );
        RestAssuredMockMvc.webAppContextSetup(webApplicationContext);
    }

    @Nested
    @DisplayName("게시글 작성")
    class CreatePost {

        @Test
        @DisplayName("게시글 작성에 성공하면 201 응답을 반환한다.")
        void return201success() throws Exception {
            // given
            mockingAuthArgumentResolver();
            given(postCommandService.createPost(any(PostCreateRequest.class), any(Member.class))).willReturn(1L);
            String filePath = "src/test/resources/images/";
            String fileName = "testImage1.PNG";
            File file = new File(filePath + fileName);

            // when, then
            RestAssuredMockMvc.given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, BEARER_TOKEN)
                    .contentType(ContentType.MULTIPART)
                    .param("categoryIds", List.of(1L, 2L))
                    .param("title", "title")
                    .param("content", "content")
                    .multiPart("contentImage", file)
                    .param("postOptions[0].content", "Option Content")
                    .multiPart("postOptions[0].optionImage", file)
                    .param("deadline", LocalDateTime.now().toString())
                    .when().post("/posts")
                    .then().log().all()
                    .status(HttpStatus.CREATED)
                    .header("Location", "/posts/1");
        }

        @Test
        @DisplayName("카테고리 ID가 존재하지 않으면 400 응답을 반환한다.")
        void return400nullCategory() throws Exception {
            // given
            mockingAuthArgumentResolver();

            // when, then
            RestAssuredMockMvc.given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, BEARER_TOKEN)
                    .contentType(ContentType.MULTIPART)
                    .param("title", "title")
                    .param("content", "content")
                    .param("postOptions[0].content", "Option Content")
                    .param("deadline", LocalDateTime.now().toString())
                    .when().post("/posts")
                    .then().log().all()
                    .status(HttpStatus.BAD_REQUEST)
                    .body("code", equalTo(200))
                    .body("message", containsString("게시글 카테고리 ID가 등록되지 않았습니다."));
        }

        @ParameterizedTest
        @ValueSource(strings = {"", " "})
        @DisplayName("게시글 제목이 존재하지 않거나 공백이라면 400 응답을 반환한다.")
        void emptyTitle(String title) throws Exception {
            // given
            mockingAuthArgumentResolver();

            // when, then
            RestAssuredMockMvc.given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, BEARER_TOKEN)
                    .contentType(ContentType.MULTIPART)
                    .param("categoryIds", List.of(1L))
                    .param("title", title)
                    .param("content", "content")
                    .param("postOptions[0].content", "Option Content")
                    .param("deadline", LocalDateTime.now().toString())
                    .when().post("/posts")
                    .then().log().all()
                    .status(HttpStatus.BAD_REQUEST)
                    .body("code", equalTo(200))
                    .body("message", containsString("게시글 제목이 존재하지 않거나 공백만 존재합니다."));
        }

        @ParameterizedTest
        @ValueSource(strings = {"", " "})
        @DisplayName("게시글 내용이 존재하지 않거나 공백이라면 400 응답을 반환한다.")
        void emptyContent(String content) throws Exception {
            // given
            mockingAuthArgumentResolver();

            // when, then
            RestAssuredMockMvc.given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, BEARER_TOKEN)
                    .contentType(ContentType.MULTIPART)
                    .param("categoryIds", List.of(1L))
                    .param("title", "title")
                    .param("content", content)
                    .param("postOptions[0].content", "Option Content")
                    .param("deadline", LocalDateTime.now().toString())
                    .when().post("/posts")
                    .then().log().all()
                    .status(HttpStatus.BAD_REQUEST)
                    .body("code", equalTo(200))
                    .body("message", containsString("게시글 내용이 존재하지 않거나 공백만 존재합니다."));
        }

        @Test
        @DisplayName("게시글 마감 시간이 등록되지 않았으면 400 응답을 반환한다.")
        void emptyDeadline() throws Exception {
            // given
            mockingAuthArgumentResolver();

            // when, then
            RestAssuredMockMvc.given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, BEARER_TOKEN)
                    .contentType(ContentType.MULTIPART)
                    .param("categoryIds", List.of(1L))
                    .param("title", "title")
                    .param("content", "content")
                    .param("postOptions[0].content", "Option Content")
                    .when().post("/posts")
                    .then().log().all()
                    .status(HttpStatus.BAD_REQUEST)
                    .body("code", equalTo(200))
                    .body("message", containsString("게시글 마감시간을 등록하지 않았습니다."));
        }

        @ParameterizedTest
        @ValueSource(strings = {"", " "})
        @DisplayName("게시글 옵션 내용이 존재하지 않거나 공백이라면 400 응답을 반환한다.")
        void emptyOptionContent(String optionContent) throws Exception {
            // given
            mockingAuthArgumentResolver();

            // when, then
            RestAssuredMockMvc.given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, BEARER_TOKEN)
                    .contentType(ContentType.MULTIPART)
                    .param("categoryIds", List.of(1L))
                    .param("title", "title")
                    .param("content", "content")
                    .param("postOptions[0].content", optionContent)
                    .param("deadline", LocalDateTime.now().toString())
                    .when().post("/posts")
                    .then().log().all()
                    .status(HttpStatus.BAD_REQUEST)
                    .body("code", equalTo(200))
                    .body("message", containsString("게시글 옵션 내용이 존재하지 않거나 공백만 존재합니다."));
        }

    }

    @Nested
    @DisplayName("게시글 수정")
    class UpdatePost {

        @Test
        @DisplayName("게시글 수정에 성공하면 200 응답을 반환한다.")
        void return200success() throws Exception {
            // given
            mockingAuthArgumentResolver();
            willDoNothing().given(postCommandService)
                    .updatePost(anyLong(), any(PostUpdateRequest.class), any(Member.class));
            String filePath = "src/test/resources/images/";
            String fileName = "testImage1.PNG";
            File file = new File(filePath + fileName);

            // when, then
            RestAssuredMockMvc.given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, BEARER_TOKEN)
                    .contentType(MediaType.MULTIPART_FORM_DATA)
                    .param("categoryIds", List.of(1L, 2L))
                    .param("title", "title")
                    .param("content", "content")
                    .multiPart("contentImage", file)
                    .param("postOptions[0].content", "Option Content")
                    .multiPart("postOptions[0].optionImage", file)
                    .param("deadline", LocalDateTime.now().toString())
                    .when().put("/posts/1")
                    .then().log().all()
                    .status(HttpStatus.OK);
        }

        @Test
        @DisplayName("게시글 ID가 양의 정수가 아니라면 400 응답을 반환한다.")
        void return400postIdNegative() throws Exception {
            // given
            mockingAuthArgumentResolver();

            // when, then
            RestAssuredMockMvc.given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, BEARER_TOKEN)
                    .contentType(MediaType.MULTIPART_FORM_DATA)
                    .param("categoryIds", List.of(1L, 2L))
                    .param("title", "title")
                    .param("content", "content")
                    .param("postOptions[0].content", "Option Content")
                    .param("deadline", LocalDateTime.now().toString())
                    .when().put("/posts/-1")
                    .then().log().all()
                    .status(HttpStatus.BAD_REQUEST)
                    .body("code", equalTo(201))
                    .body("message", containsString("게시글 ID는 양의 정수만 가능합니다."));
        }

        @Test
        @DisplayName("카테고리 ID가 존재하지 않으면 400 응답을 반환한다.")
        void return400EmptyCategory() throws Exception {
            // given
            mockingAuthArgumentResolver();

            // when, then
            RestAssuredMockMvc.given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, BEARER_TOKEN)
                    .contentType(MediaType.MULTIPART_FORM_DATA)
                    .param("title", "title")
                    .param("content", "content")
                    .param("postOptions[0].content", "Option Content")
                    .param("deadline", LocalDateTime.now().toString())
                    .when().put("/posts/1")
                    .then().log().all()
                    .status(HttpStatus.BAD_REQUEST)
                    .body("code", equalTo(200))
                    .body("message", containsString("게시글 카테고리 ID가 등록되지 않았습니다."));
        }

        @ParameterizedTest
        @ValueSource(strings = {"", " "})
        @DisplayName("게시글 제목이 존재하지 않거나 공백이라면 400 응답을 반환한다.")
        void emptyTitle(String title) throws Exception {
            // given
            mockingAuthArgumentResolver();

            // when, then
            RestAssuredMockMvc.given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, BEARER_TOKEN)
                    .contentType(MediaType.MULTIPART_FORM_DATA)
                    .param("categoryIds", List.of(1L, 2L))
                    .param("title", title)
                    .param("content", "content")
                    .param("postOptions[0].content", "Option Content")
                    .param("deadline", LocalDateTime.now().toString())
                    .when().put("/posts/1")
                    .then().log().all()
                    .status(HttpStatus.BAD_REQUEST)
                    .body("code", equalTo(200))
                    .body("message", containsString("게시글 제목이 존재하지 않거나 공백만 존재합니다."));
        }

        @ParameterizedTest
        @ValueSource(strings = {"", " "})
        @DisplayName("게시글 내용이 존재하지 않거나 공백이라면 400 응답을 반환한다.")
        void emptyContent(String content) throws Exception {
            // given
            mockingAuthArgumentResolver();

            // when, then
            RestAssuredMockMvc.given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, BEARER_TOKEN)
                    .contentType(MediaType.MULTIPART_FORM_DATA)
                    .param("categoryIds", List.of(1L, 2L))
                    .param("title", "title")
                    .param("content", content)
                    .param("postOptions[0].content", "Option Content")
                    .param("deadline", LocalDateTime.now().toString())
                    .when().put("/posts/1")
                    .then().log().all()
                    .status(HttpStatus.BAD_REQUEST)
                    .body("code", equalTo(200))
                    .body("message", containsString("게시글 내용이 존재하지 않거나 공백만 존재합니다."));
        }

        @Test
        @DisplayName("게시글 마감 시간이 등록되지 않았으면 400 응답을 반환한다.")
        void emptyDeadline() throws Exception {
            // given
            mockingAuthArgumentResolver();

            // when, then
            RestAssuredMockMvc.given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, BEARER_TOKEN)
                    .contentType(MediaType.MULTIPART_FORM_DATA)
                    .param("categoryIds", List.of(1L, 2L))
                    .param("title", "title")
                    .param("content", "content")
                    .param("postOptions[0].content", "Option Content")
                    .when().put("/posts/1")
                    .then().log().all()
                    .status(HttpStatus.BAD_REQUEST)
                    .body("code", equalTo(200))
                    .body("message", containsString("게시글 마감시간을 등록하지 않았습니다."));
        }

        @ParameterizedTest
        @ValueSource(strings = {"", " "})
        @DisplayName("게시글 옵션 내용이 존재하지 않거나 공백이라면 400 응답을 반환한다.")
        void emptyOptionContent(String optionContent) throws Exception {
            // given
            mockingAuthArgumentResolver();

            // when, then
            RestAssuredMockMvc.given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, BEARER_TOKEN)
                    .contentType(MediaType.MULTIPART_FORM_DATA)
                    .param("categoryIds", List.of(1L, 2L))
                    .param("title", "title")
                    .param("content", "content")
                    .param("postOptions[0].content", optionContent)
                    .param("deadline", LocalDateTime.now().toString())
                    .when().put("/posts/1")
                    .then().log().all()
                    .status(HttpStatus.BAD_REQUEST)
                    .body("code", equalTo(200))
                    .body("message", containsString("게시글 옵션 내용이 존재하지 않거나 공백만 존재합니다."));
        }

    }

    @Nested
    @DisplayName("게시글 조기 마감")
    class ClosePostEarly {

        @Test
        @DisplayName("게시글 조기 마감에 성공하면 200 응답을 반환한다.")
        void return200success() throws Exception {
            // given
            mockingAuthArgumentResolver();
            willDoNothing().given(postCommandService).closePostEarly(anyLong(), any(Member.class));

            // when, then
            RestAssuredMockMvc.given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, BEARER_TOKEN)
                    .when().patch("/posts/{postId}/close", 1)
                    .then().log().all()
                    .status(HttpStatus.OK);
        }

        @Test
        @DisplayName("게시글 ID가 양의 정수가 아니라면 400 응답을 반환한다.")
        void return400postIdNegative() throws Exception {
            // given
            mockingAuthArgumentResolver();

            // when, then
            RestAssuredMockMvc.given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, BEARER_TOKEN)
                    .when().patch("/posts/{postId}/close", -1)
                    .then().log().all()
                    .status(HttpStatus.BAD_REQUEST)
                    .body("code", equalTo(201))
                    .body("message", containsString("게시글 ID는 양의 정수만 가능합니다."));
        }

    }

    @Nested
    @DisplayName("게시글 삭제")
    class DeletePost {

        @Test
        @DisplayName("게시글 삭제에 성공하면 204 응답을 반환한다.")
        void return204success() throws Exception {
            // given
            mockingAuthArgumentResolver();
            willDoNothing().given(postCommandService).deletePost(anyLong(), any(Member.class));

            // when, then
            RestAssuredMockMvc.given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, BEARER_TOKEN)
                    .when().delete("/posts/{postId}", 1)
                    .then().log().all()
                    .status(HttpStatus.NO_CONTENT);
        }

        @Test
        @DisplayName("게시글 ID가 양의 정수가 아니라면 400 응답을 반환한다.")
        void return400postIdNegative() throws Exception {
            // given
            mockingAuthArgumentResolver();

            // when, then
            RestAssuredMockMvc.given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, BEARER_TOKEN)
                    .when().delete("/posts/{postId}", -1)
                    .then().log().all()
                    .status(HttpStatus.BAD_REQUEST)
                    .body("code", equalTo(201))
                    .body("message", containsString("게시글 ID는 양의 정수만 가능합니다."));
        }

    }

}
