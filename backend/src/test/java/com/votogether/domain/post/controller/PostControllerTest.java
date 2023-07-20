package com.votogether.domain.post.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.startsWith;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.votogether.domain.category.entity.Category;
import com.votogether.domain.member.service.MemberService;
import com.votogether.domain.post.dto.request.CreatePostRequest;
import com.votogether.domain.post.dto.request.UpdatePostRequest;
import com.votogether.domain.post.dto.response.VoteCountForAgeGroupResponse;
import com.votogether.domain.post.dto.response.VoteOptionStatisticsResponse;
import com.votogether.domain.post.service.PostService;
import com.votogether.fixtures.CategoryFixtures;
import com.votogether.global.jwt.TokenProcessor;
import io.restassured.http.ContentType;
import io.restassured.module.mockmvc.RestAssuredMockMvc;
import io.restassured.module.mockmvc.response.MockMvcResponse;
import io.restassured.response.ExtractableResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.time.LocalDateTime;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;

@WebMvcTest(PostController.class)
class PostControllerTest {

    @MockBean
    PostService postService;

    @MockBean
    MemberService memberService;

    @MockBean
    TokenProcessor tokenProcessor;

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
        String postRequestJson = objectMapper.writeValueAsString(createPostRequest);

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
    @DisplayName("게시글을 수정한다")
    void update() throws IOException {
        // given
        final UpdatePostRequest request = new UpdatePostRequest(
                List.of(1L, 2L),
                "title2",
                "content2",
                List.of("option1", "option2"),
                LocalDateTime.of(1900, 7, 12, 0, 0)
        );

        File file1 = new File("src/test/resources/images/testImage1.PNG");
        File file2 = new File("src/test/resources/images/testImage2.PNG");
        byte[] file1Content = Files.readAllBytes(file1.toPath());
        byte[] file2Content = Files.readAllBytes(file2.toPath());

        // when, then
        RestAssuredMockMvc.given().log().all()
                .contentType(MediaType.MULTIPART_FORM_DATA_VALUE)
                .multiPart("request", request, "application/json")
                .multiPart("images", file1.getName(), file1Content, "image/png")
                .multiPart("images", file2.getName(), file2Content, "image/png")
                .when().put("/posts/1")
                .then().log().all()
                .assertThat()
                .status(HttpStatus.OK);
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
