package com.votogether.domain.post.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.startsWith;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.votogether.domain.member.service.MemberService;
import com.votogether.domain.post.dto.request.post.PostCreateRequest;
import com.votogether.domain.post.dto.request.post.PostOptionCreateRequest;
import com.votogether.domain.post.dto.request.post.PostOptionUpdateRequest;
import com.votogether.domain.post.dto.request.post.PostUpdateRequest;
import com.votogether.domain.post.service.PostService;
import com.votogether.global.exception.GlobalExceptionHandler;
import com.votogether.global.jwt.TokenPayload;
import com.votogether.global.jwt.TokenProcessor;
import com.votogether.test.fixtures.MemberFixtures;
import io.restassured.http.ContentType;
import io.restassured.module.mockmvc.RestAssuredMockMvc;
import io.restassured.module.mockmvc.response.MockMvcResponse;
import io.restassured.response.ExtractableResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

@WebMvcTest(PostController.class)
class PostControllerTest {

    @Autowired
    ObjectMapper mapper;

    @MockBean
    TokenProcessor tokenProcessor;

    @MockBean
    MemberService memberService;

    @MockBean
    PostService postService;

    @BeforeEach
    void setUp(final WebApplicationContext webApplicationContext) {
        RestAssuredMockMvc.standaloneSetup(
                MockMvcBuilders
                        .standaloneSetup(new PostController(postService))
                        .setControllerAdvice(GlobalExceptionHandler.class)
        );
        RestAssuredMockMvc.webAppContextSetup(webApplicationContext);
    }

    @Test
    @DisplayName("게시글을 작성한다")
    void save() throws IOException {
        // given
        PostOptionCreateRequest postOptionCreateRequest1 = PostOptionCreateRequest.builder()
                .content("optionContent1")
                .build();

        PostOptionCreateRequest postOptionCreateRequest2 = PostOptionCreateRequest.builder()
                .content("optionContent2")
                .build();

        PostCreateRequest postCreateRequest = PostCreateRequest.builder()
                .categoryIds(List.of(0L))
                .title("title")
                .content("content")
                .deadline(LocalDateTime.now().plusDays(2))
                .postOptions(List.of(postOptionCreateRequest1, postOptionCreateRequest2))
                .build();

        String fileName1 = "testImage1.PNG";
        String resultFileName1 = "testResultImage1.PNG";
        String filePath1 = "src/test/resources/images/" + fileName1;
        File file1 = new File(filePath1);

        String fileName2 = "testImage2.PNG";
        String resultFileName2 = "testResultImage2.PNG";
        String filePath2 = "src/test/resources/images/" + fileName2;
        File file2 = new File(filePath2);

        String fileName3 = "testImage3.PNG";
        String resultFileName3 = "testResultImage3.PNG";
        String filePath3 = "src/test/resources/images/" + fileName3;
        File file3 = new File(filePath3);

        String postRequestJson = mapper.writeValueAsString(postCreateRequest);

        long savedPostId = 1L;
        given(postService.save(any(), any(), anyList(), anyList())).willReturn(savedPostId);

        TokenPayload tokenPayload = new TokenPayload(1L, 1L, 1L);
        given(tokenProcessor.resolveToken(anyString())).willReturn("token");
        given(tokenProcessor.parseToken(anyString())).willReturn(tokenPayload);
        given(memberService.findById(anyLong())).willReturn(MemberFixtures.FEMALE_20.get());

        // when, then
        String locationStartsWith = "/posts/";
        ExtractableResponse<MockMvcResponse> response = RestAssuredMockMvc.given().log().all()
                .headers(HttpHeaders.AUTHORIZATION, "Bearer token")
                .contentType(ContentType.MULTIPART)
                .multiPart("request", postRequestJson, "application/json")
                .multiPart("contentImages", resultFileName3, new FileInputStream(file3), "image/png")
                .multiPart("optionImages", resultFileName1, new FileInputStream(file1), "image/png")
                .multiPart("optionImages", resultFileName2, new FileInputStream(file2), "image/png")
                .when().post("/posts")
                .then().log().all()
                .status(HttpStatus.CREATED)
                .header("Location", startsWith(locationStartsWith))
                .extract();

        String postId = response.header("Location").substring(locationStartsWith.length());
        assertThat(Long.parseLong(postId)).isEqualTo(savedPostId);
    }

    @Test
    @DisplayName("게시글을 등록 시, 유효성 검증에 위배되는 데이터를 전달하면 예외를 던진다.")
    void throwExceptionBlankTitle() throws IOException {
        // given
        PostOptionCreateRequest postOptionCreateRequest1 = PostOptionCreateRequest.builder()
                .content("optionContent1")
                .build();

        PostOptionCreateRequest postOptionCreateRequest2 = PostOptionCreateRequest.builder()
                .content("optionContent2")
                .build();

        PostCreateRequest postCreateRequest = PostCreateRequest.builder()
                .categoryIds(List.of(0L))
                .content("c".repeat(1001))
                .deadline(LocalDateTime.now().plusDays(2))
                .postOptions(List.of(postOptionCreateRequest1, postOptionCreateRequest2))
                .build();

        String fileName1 = "testImage1.PNG";
        String resultFileName1 = "testResultImage1.PNG";
        String filePath1 = "src/test/resources/images/" + fileName1;
        File file1 = new File(filePath1);

        String fileName2 = "testImage2.PNG";
        String resultFileName2 = "testResultImage2.PNG";
        String filePath2 = "src/test/resources/images/" + fileName2;
        File file2 = new File(filePath2);

        String fileName3 = "testImage3.PNG";
        String resultFileName3 = "testResultImage3.PNG";
        String filePath3 = "src/test/resources/images/" + fileName3;
        File file3 = new File(filePath3);

        String postRequestJson = mapper.writeValueAsString(postCreateRequest);

        long savedPostId = 1L;
        given(postService.save(any(), any(), anyList(), anyList())).willReturn(savedPostId);

        TokenPayload tokenPayload = new TokenPayload(1L, 1L, 1L);
        given(tokenProcessor.resolveToken(anyString())).willReturn("token");
        given(tokenProcessor.parseToken(anyString())).willReturn(tokenPayload);
        given(memberService.findById(anyLong())).willReturn(MemberFixtures.FEMALE_20.get());

        // when
        ExtractableResponse<MockMvcResponse> response = RestAssuredMockMvc.given().log().all()
                .headers(HttpHeaders.AUTHORIZATION, "Bearer token")
                .contentType(ContentType.MULTIPART)
                .multiPart("request", postRequestJson, "application/json")
                .multiPart("contentImages", resultFileName3, new FileInputStream(file3), "image/png")
                .multiPart("optionImages", resultFileName1, new FileInputStream(file1), "image/png")
                .multiPart("optionImages", resultFileName2, new FileInputStream(file2), "image/png")
                .when().post("/posts")
                .then().log().all()
                .extract();

        // then
        final String message = response.body().jsonPath().get("message").toString();
        assertAll(
                () -> assertThat(message).contains("제목을 입력해주세요.", "내용은 최대 1000자까지 입력 가능합니다."),
                () -> assertThat(response.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value())
        );
    }

    @Test
    @DisplayName("게시글을 조기 마감한다.")
    void postClosedEarly() throws Exception {
        // given
        long postId = 1L;

        TokenPayload tokenPayload = new TokenPayload(1L, 1L, 1L);
        given(tokenProcessor.resolveToken(anyString())).willReturn("token");
        given(tokenProcessor.parseToken(anyString())).willReturn(tokenPayload);
        given(memberService.findById(anyLong())).willReturn(MemberFixtures.FEMALE_20.get());

        // when
        ExtractableResponse<MockMvcResponse> response = RestAssuredMockMvc.given().log().all()
                .headers(HttpHeaders.AUTHORIZATION, "Bearer token")
                .when().patch("/posts/{postId}/close", postId)
                .then().log().all()
                .extract();

        // then
        assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
    }

    @DisplayName("게시글을 삭제한다.")
    void delete() {
        // given
        long postId = 1L;

        // when, then
        RestAssuredMockMvc.given().log().all()
                .when().delete("/posts/{postId}", postId)
                .then().log().all()
                .assertThat()
                .status(HttpStatus.NO_CONTENT);
    }

    @Test
    @DisplayName("게시글을 수정한다.")
    void update() throws IOException {
        // given
        PostOptionUpdateRequest postOptionUpdateRequest1 = PostOptionUpdateRequest.builder()
                .content("optionContent1")
                .build();

        PostOptionUpdateRequest postOptionUpdateRequest2 = PostOptionUpdateRequest.builder()
                .content("optionContent2")
                .build();

        PostUpdateRequest postUpdateRequest = PostUpdateRequest.builder()
                .categoryIds(List.of(0L))
                .title("title")
                .content("content")
                .deadline(LocalDateTime.now().plusDays(2))
                .postOptions(List.of(postOptionUpdateRequest1, postOptionUpdateRequest2))
                .build();

        String fileName1 = "testImage1.PNG";
        String resultFileName1 = "testResultImage1.PNG";
        String filePath1 = "src/test/resources/images/" + fileName1;
        File file1 = new File(filePath1);

        String fileName2 = "testImage2.PNG";
        String resultFileName2 = "testResultImage2.PNG";
        String filePath2 = "src/test/resources/images/" + fileName2;
        File file2 = new File(filePath2);

        String fileName3 = "testImage3.PNG";
        String resultFileName3 = "testResultImage3.PNG";
        String filePath3 = "src/test/resources/images/" + fileName3;
        File file3 = new File(filePath3);

        String postRequestJson = mapper.writeValueAsString(postUpdateRequest);

        TokenPayload tokenPayload = new TokenPayload(1L, 1L, 1L);
        given(tokenProcessor.resolveToken(anyString())).willReturn("token");
        given(tokenProcessor.parseToken(anyString())).willReturn(tokenPayload);
        given(memberService.findById(anyLong())).willReturn(MemberFixtures.FEMALE_20.get());

        // when, then
        RestAssuredMockMvc.given().log().all()
                .headers(HttpHeaders.AUTHORIZATION, "Bearer token")
                .contentType(ContentType.MULTIPART)
                .multiPart("request", postRequestJson, "application/json")
                .multiPart("contentImages", resultFileName3, new FileInputStream(file3), "image/png")
                .multiPart("optionImages", resultFileName1, new FileInputStream(file1), "image/png")
                .multiPart("optionImages", resultFileName2, new FileInputStream(file2), "image/png")
                .when().put("/posts/1", 1)
                .then().log().all()
                .status(HttpStatus.OK);
    }

}
