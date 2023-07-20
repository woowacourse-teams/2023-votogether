package com.votogether.domain.post.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.startsWith;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.BDDMockito.given;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.votogether.domain.member.entity.Gender;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.SocialType;
import com.votogether.domain.post.dto.request.CreatePostRequest;
import com.votogether.domain.post.dto.response.GetAllPostResponse;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostBody;
import com.votogether.domain.post.entity.PostClosingType;
import com.votogether.domain.post.entity.PostSortType;
import com.votogether.domain.post.service.PostService;
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
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;

@WebMvcTest(PostController.class)
class PostControllerTest {

    @MockBean
    private PostService postService;

    @BeforeEach
    void setUp() {
        RestAssuredMockMvc.standaloneSetup(new PostController(postService));
    }

    @Test
    @DisplayName("게시글을 등록한다")
    void save() throws IOException {
        // given
        final CreatePostRequest createPostRequest = CreatePostRequest.builder().build();

        final String fileName1 = "testImage1.PNG";
        final String resultFileName1 = "testResultImage1.PNG";
        final String filePath1 = "src/test/resources/images/" + fileName1;
        File file1 = new File(filePath1);

        final String fileName2 = "testImage2.PNG";
        final String resultFileName2 = "testResultImage2.PNG";
        final String filePath2 = "src/test/resources/images/" + fileName2;
        File file2 = new File(filePath2);

        final ObjectMapper objectMapper = new ObjectMapper();
        final String postRequestJson = objectMapper.writeValueAsString(createPostRequest);

        final long savedPostId = 1L;
        given(postService.save(any(), any(), anyList())).willReturn(savedPostId);

        // when, then
        final String locationStartsWith = "/posts/";
        final ExtractableResponse<MockMvcResponse> response = RestAssuredMockMvc.given().log().all()
                .contentType(ContentType.MULTIPART)
                .multiPart("request", postRequestJson, "application/json")
                .multiPart("images", resultFileName1, new FileInputStream(file1), "image/png")
                .multiPart("images", resultFileName2, new FileInputStream(file2), "image/png")
                .when().post("/posts")
                .then().log().all()
                .status(HttpStatus.CREATED)
                .header("Location", startsWith(locationStartsWith))
                .extract();

        final String postId = response.header("Location").substring(locationStartsWith.length());
        assertThat(Long.parseLong(postId)).isEqualTo(savedPostId);
    }

    @Test
    @DisplayName("게시글을 조회한다")
    void getAllPost() throws JsonProcessingException {
        // given
        int firstPage = 0;

        Member member = Member.builder()
                .socialType(SocialType.GOOGLE)
                .socialId("tjdtls690")
                .nickname("Abel")
                .gender(Gender.MALE)
                .point(100)
                .birthDate(LocalDateTime.now())
                .build();

        PostBody postBody = PostBody.builder()
                .title("title")
                .content("content")
                .build();

        Post post = Post.builder()
                .member(member)
                .postBody(postBody)
                .deadline(LocalDateTime.now().plusDays(3L))
                .build();

        given(postService.getAllPostBySortTypeAndClosingType(firstPage, PostClosingType.PROGRESS, PostSortType.LATEST))
                .willReturn(List.of(new GetAllPostResponse(post)));

        // when
        String responseBody = RestAssuredMockMvc.given().log().all()
                .param("page", firstPage)
                .param("postClosingType", PostClosingType.PROGRESS)
                .param("postSortType", PostSortType.LATEST)
                .when().get("/posts")
                .then().log().all()
                .contentType(ContentType.JSON)
                .status(HttpStatus.OK)
                .extract().asString();

        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());
        List<GetAllPostResponse> responses = mapper.readValue(responseBody, new TypeReference<>() {
        });

        // then
        assertAll(
                () -> assertThat(responses).isNotEmpty(),
                () -> assertThat(responses).hasSize(1)
        );
    }

}
