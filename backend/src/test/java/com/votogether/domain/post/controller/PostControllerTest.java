package com.votogether.domain.post.controller;

import static com.votogether.fixtures.MemberFixtures.MALE_30;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.startsWith;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.votogether.domain.post.dto.request.CreatePostRequest;
import com.votogether.domain.post.dto.response.GetAllPostResponse;
import com.votogether.domain.post.dto.response.VoteCountForAgeGroupResponse;
import com.votogether.domain.post.dto.response.VoteOptionStatisticsResponse;
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
        CreatePostRequest createPostRequest = CreatePostRequest.builder().build();

        String fileName1 = "testImage1.PNG";
        String resultFileName1 = "testResultImage1.PNG";
        String filePath1 = "src/test/resources/images/" + fileName1;
        File file1 = new File(filePath1);

        String fileName2 = "testImage2.PNG";
        String resultFileName2 = "testResultImage2.PNG";
        String filePath2 = "src/test/resources/images/" + fileName2;
        File file2 = new File(filePath2);

        ObjectMapper objectMapper = new ObjectMapper();
        final String postRequestJson = objectMapper.writeValueAsString(createPostRequest);

        long savedPostId = 1L;
        given(postService.save(any(), any(), anyList())).willReturn(savedPostId);

        // when, then
        String locationStartsWith = "/posts/";
        ExtractableResponse<MockMvcResponse> response = RestAssuredMockMvc.given().log().all()
                .contentType(ContentType.MULTIPART)
                .multiPart("request", postRequestJson, "application/json")
                .multiPart("images", resultFileName1, new FileInputStream(file1), "image/png")
                .multiPart("images", resultFileName2, new FileInputStream(file2), "image/png")
                .when().post("/posts")
                .then().log().all()
                .status(HttpStatus.CREATED)
                .header("Location", startsWith(locationStartsWith))
                .extract();

        String postId = response.header("Location").substring(locationStartsWith.length());
        assertThat(Long.parseLong(postId)).isEqualTo(savedPostId);
    }

    @Test
    @DisplayName("게시글을 조회한다")
    void getAllPost() throws JsonProcessingException {
        // given
        int firstPage = 0;

        PostBody postBody = PostBody.builder()
                .title("title")
                .content("content")
                .build();

        Post post = Post.builder()
                .member(MALE_30)
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

    @Test
    @DisplayName("게시글 투표 옵션에 대한 투표 통계를 조회한다.")
    void getVoteOptionStatistics() {
        // given
        VoteOptionStatisticsResponse response = new VoteOptionStatisticsResponse(
                17,
                10,
                7,
                List.of(
                        new VoteCountForAgeGroupResponse("10대 미만", 2, 1, 1),
                        new VoteCountForAgeGroupResponse("10대", 3, 1, 2),
                        new VoteCountForAgeGroupResponse("20대", 2, 2, 0),
                        new VoteCountForAgeGroupResponse("30대", 5, 3, 2),
                        new VoteCountForAgeGroupResponse("40대", 1, 1, 0),
                        new VoteCountForAgeGroupResponse("50대", 0, 0, 0),
                        new VoteCountForAgeGroupResponse("60대 이상", 4, 2, 2)
                )
        );
        given(postService.getVoteOptionStatistics(anyLong(), anyLong())).willReturn(response);

        // when
        VoteOptionStatisticsResponse result = RestAssuredMockMvc.given().log().all()
                .when().get("/posts/{postId}/options/{optionId}", 1, 1)
                .then().log().all()
                .status(HttpStatus.OK)
                .extract()
                .as(VoteOptionStatisticsResponse.class);

        // then
        assertThat(result).usingRecursiveComparison().isEqualTo(response);
    }

}
