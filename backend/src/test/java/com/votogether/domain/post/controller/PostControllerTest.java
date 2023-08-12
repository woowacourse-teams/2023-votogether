package com.votogether.domain.post.controller;

import static com.votogether.fixtures.MemberFixtures.MALE_30;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.startsWith;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.ArgumentMatchers.isNull;
import static org.mockito.BDDMockito.given;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.service.MemberService;
import com.votogether.domain.post.dto.request.PostCreateRequest;
import com.votogether.domain.post.dto.request.PostOptionCreateRequest;
import com.votogether.domain.post.dto.request.PostOptionUpdateRequest;
import com.votogether.domain.post.dto.request.PostUpdateRequest;
import com.votogether.domain.post.dto.response.PostResponse;
import com.votogether.domain.post.dto.response.WriterResponse;
import com.votogether.domain.post.dto.response.detail.PostDetailResponse;
import com.votogether.domain.post.dto.response.detail.VoteDetailResponse;
import com.votogether.domain.post.dto.response.vote.VoteCountForAgeGroupResponse;
import com.votogether.domain.post.dto.response.vote.VoteOptionStatisticsResponse;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostBody;
import com.votogether.domain.post.entity.PostClosingType;
import com.votogether.domain.post.entity.PostSortType;
import com.votogether.domain.post.service.PostService;
import com.votogether.exception.GlobalExceptionHandler;
import com.votogether.fixtures.MemberFixtures;
import com.votogether.global.jwt.TokenPayload;
import com.votogether.global.jwt.TokenProcessor;
import io.restassured.http.ContentType;
import io.restassured.module.mockmvc.RestAssuredMockMvc;
import io.restassured.module.mockmvc.response.MockMvcResponse;
import io.restassured.response.ExtractableResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.core.ParameterizedTypeReference;
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

    @Nested
    @DisplayName("전체 게시글 목록 조회에서")
    class GetAllPost {

        @Test
        @DisplayName("page에 숫자가 아닌 다른 값이 들어온 경우 400을 반환한다.")
        void invalidPage() throws Exception {
            // given
            TokenPayload tokenPayload = new TokenPayload(1L, 1L, 1L);
            given(tokenProcessor.resolveToken(anyString())).willReturn("token");
            given(tokenProcessor.parseToken(anyString())).willReturn(tokenPayload);
            given(memberService.findById(anyLong())).willReturn(MemberFixtures.FEMALE_20.get());

            // when, then
            RestAssuredMockMvc
                    .given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, "Bearer token")
                    .param("page", "abc")
                    .param("postClosingType", PostClosingType.CLOSED)
                    .param("postSortType", PostSortType.LATEST)
                    .when().get("/posts")
                    .then().log().all()
                    .status(HttpStatus.BAD_REQUEST);
        }

        @Test
        @DisplayName("PageClosingType이 아닌 다른 값이 들어온 경우 400을 반환한다.")
        void invalidPostClosingType() throws Exception {
            // given
            TokenPayload tokenPayload = new TokenPayload(1L, 1L, 1L);
            given(tokenProcessor.resolveToken(anyString())).willReturn("token");
            given(tokenProcessor.parseToken(anyString())).willReturn(tokenPayload);
            given(memberService.findById(anyLong())).willReturn(MemberFixtures.FEMALE_20.get());

            // when, then
            RestAssuredMockMvc
                    .given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, "Bearer token")
                    .param("page", 0)
                    .param("postClosingType", "abc")
                    .param("postSortType", PostSortType.LATEST)
                    .when().get("/posts")
                    .then().log().all()
                    .status(HttpStatus.BAD_REQUEST);
        }

        @Test
        @DisplayName("PostSortType이 아닌 다른 값이 들어온 경우 400을 반환한다.")
        void invalidPostSortType() throws Exception {
            // given
            TokenPayload tokenPayload = new TokenPayload(1L, 1L, 1L);
            given(tokenProcessor.resolveToken(anyString())).willReturn("token");
            given(tokenProcessor.parseToken(anyString())).willReturn(tokenPayload);
            given(memberService.findById(anyLong())).willReturn(MemberFixtures.FEMALE_20.get());

            // when, then
            RestAssuredMockMvc
                    .given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, "Bearer token")
                    .param("page", 0)
                    .param("postClosingType", PostClosingType.CLOSED)
                    .param("postSortType", "abc")
                    .when().get("/posts")
                    .then().log().all()
                    .status(HttpStatus.BAD_REQUEST);
        }

        @Test
        @DisplayName("정렬 유형, 마감 유형, 카테고리로 모든 게시물 조회한다")
        void getAllPostBySortTypeAndClosingTypeAndCategoryId() throws Exception {
            // given
            PostBody postBody = PostBody.builder()
                    .title("title")
                    .content("content")
                    .build();

            Post post = Post.builder()
                    .writer(MALE_30.get())
                    .postBody(postBody)
                    .deadline(LocalDateTime.now().plusDays(3L))
                    .build();

            TokenPayload tokenPayload = new TokenPayload(1L, 1L, 1L);
            given(tokenProcessor.resolveToken(anyString())).willReturn("token");
            given(tokenProcessor.parseToken(anyString())).willReturn(tokenPayload);
            given(memberService.findById(anyLong())).willReturn(MemberFixtures.FEMALE_20.get());

            given(postService.getAllPostBySortTypeAndClosingTypeAndCategoryId(
                            eq(0),
                            eq(PostClosingType.PROGRESS),
                            eq(PostSortType.LATEST),
                            anyLong(),
                            any(Member.class)
                    )
            ).willReturn(List.of(PostResponse.of(post, MALE_30.get())));

            // when
            List<PostResponse> responses = RestAssuredMockMvc
                    .given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, "Bearer token")
                    .param("page", 0)
                    .param("postClosingType", PostClosingType.PROGRESS)
                    .param("postSortType", PostSortType.LATEST)
                    .param("category", 1L)
                    .when().get("/posts")
                    .then().log().all()
                    .contentType(ContentType.JSON)
                    .status(HttpStatus.OK)
                    .extract()
                    .as(new ParameterizedTypeReference<List<PostResponse>>() {
                    }.getType());

            // then
            assertAll(
                    () -> assertThat(responses).isNotEmpty(),
                    () -> assertThat(responses).hasSize(1)
            );
        }

    }


    @Nested
    @DisplayName("비회원 게시글 목록 조회")
    class GetPostsGuest {

        @Test
        @DisplayName("마감 시간 타입으로 변환할 수 없으면 400 상태를 응답한다.")
        void invalidPostClosingType() {
            RestAssuredMockMvc.given().log().all()
                    .param("page", 0)
                    .param("postClosingType", "hello")
                    .param("postSortType", PostSortType.LATEST)
                    .when().get("/posts/guest")
                    .then().log().all()
                    .contentType(ContentType.JSON)
                    .status(HttpStatus.BAD_REQUEST);
        }

        @Test
        @DisplayName("정렬 타입으로 변환할 수 없으면 400 상태를 반환한다.")
        void invalidPostSortType() {
            RestAssuredMockMvc.given().log().all()
                    .param("page", 0)
                    .param("postClosingType", PostClosingType.ALL)
                    .param("postSortType", "hello")
                    .when().get("/posts/guest")
                    .then().log().all()
                    .contentType(ContentType.JSON)
                    .status(HttpStatus.BAD_REQUEST);
        }

        @Test
        @DisplayName("카테고리가 없는 올바른 조회 요청이라면 게시글 목록 응답과 200 상태를 반환한다.")
        void getPostsGuestWithoutCategory() {
            PostBody postBody = PostBody.builder()
                    .title("title")
                    .content("content")
                    .build();

            Post post = Post.builder()
                    .writer(MALE_30.get())
                    .postBody(postBody)
                    .deadline(LocalDateTime.now().plusDays(3L))
                    .build();

            given(postService.getPostsGuest(anyInt(), any(PostClosingType.class), any(PostSortType.class), isNull()))
                    .willReturn(List.of(PostResponse.forGuest(post)));

            RestAssuredMockMvc.given().log().all()
                    .param("page", 0)
                    .param("postClosingType", PostClosingType.ALL)
                    .param("postSortType", PostSortType.LATEST)
                    .when().get("/posts/guest")
                    .then().log().all()
                    .contentType(ContentType.JSON)
                    .status(HttpStatus.OK);
        }

        @Test
        @DisplayName("카테고리가 있는 올바른 조회 요청이라면 게시글 목록 응답과 200 상태를 반환한다.")
        void getPostsGuestWithCategory() {
            PostBody postBody = PostBody.builder()
                    .title("title")
                    .content("content")
                    .build();

            Post post = Post.builder()
                    .writer(MALE_30.get())
                    .postBody(postBody)
                    .deadline(LocalDateTime.now().plusDays(3L))
                    .build();

            given(postService.getPostsGuest(anyInt(), any(PostClosingType.class), any(PostSortType.class), anyLong()))
                    .willReturn(List.of(PostResponse.forGuest(post)));

            RestAssuredMockMvc.given().log().all()
                    .param("page", 0)
                    .param("postClosingType", PostClosingType.ALL)
                    .param("postSortType", PostSortType.LATEST)
                    .param("category", 1L)
                    .when().get("/posts/guest")
                    .then().log().all()
                    .contentType(ContentType.JSON)
                    .status(HttpStatus.OK);
        }

    }

    @Test
    @DisplayName("한 게시글의 상세를 조회한다.")
    void getPost() throws JsonProcessingException {
        // given
        long postId = 0L;
        Member writer = MALE_30.get();
        LocalDateTime deadline = LocalDateTime.now().plusDays(3L);

        PostBody postBody = PostBody.builder()
                .title("title")
                .content("content")
                .build();

        Post post = Post.builder()
                .writer(writer)
                .postBody(postBody)
                .deadline(deadline)
                .build();

        Member member = MemberFixtures.MALE_20.get();
        given(postService.getPostById(postId, member)).willReturn(PostDetailResponse.of(post, member));

        TokenPayload tokenPayload = new TokenPayload(1L, 1L, 1L);
        given(tokenProcessor.resolveToken(anyString())).willReturn("token");
        given(tokenProcessor.parseToken(anyString())).willReturn(tokenPayload);
        given(memberService.findById(anyLong())).willReturn(MemberFixtures.FEMALE_20.get());

        // when
        String responseBody = RestAssuredMockMvc.given().log().all()
                .headers(HttpHeaders.AUTHORIZATION, "Bearer token")
                .when().get("/posts/{postId}", postId)
                .then().log().all()
                .contentType(ContentType.JSON)
                .status(HttpStatus.OK)
                .extract().asString();

        PostDetailResponse response = mapper.readValue(responseBody, new TypeReference<>() {
        });

        // then
        WriterResponse writerResponse = response.writer();
        VoteDetailResponse voteDetailResponse = response.voteInfo();

        assertAll(
                () -> assertThat(response.title()).isEqualTo("title"),
                () -> assertThat(response.content()).isEqualTo("content"),
                () -> assertThat(response.deadline()).isEqualTo(deadline.truncatedTo(ChronoUnit.MINUTES)),
                () -> assertThat(writerResponse.id()).isEqualTo(member.getId()),
                () -> assertThat(writerResponse.nickname()).isEqualTo("user9"),
                () -> assertThat(voteDetailResponse.totalVoteCount()).isZero()
        );
    }

    @Test
    @DisplayName("비회원이 한 게시글을 상세 조회한다.")
    void getPostByGuest() {
        // given
        long postId = 0L;
        Member writer = MALE_30.get();
        LocalDateTime deadline = LocalDateTime.now().plusDays(3L);

        PostBody postBody = PostBody.builder()
                .title("title")
                .content("content")
                .build();

        Post post = Post.builder()
                .writer(writer)
                .postBody(postBody)
                .deadline(deadline)
                .build();

        given(postService.getPostById(postId, null)).willReturn(PostDetailResponse.of(post, null));

        // when
        PostDetailResponse response = RestAssuredMockMvc.given().log().all()
                .when().get("/posts/{postId}/guest", postId)
                .then().log().all()
                .contentType(ContentType.JSON)
                .status(HttpStatus.OK)
                .extract()
                .as(PostDetailResponse.class);

        // then
        WriterResponse writerResponse = response.writer();
        VoteDetailResponse voteDetailResponse = response.voteInfo();

        assertAll(
                () -> assertThat(response.title()).isEqualTo("title"),
                () -> assertThat(response.content()).isEqualTo("content"),
                () -> assertThat(response.deadline()).isEqualTo(deadline.truncatedTo(ChronoUnit.MINUTES)),
                () -> assertThat(writerResponse.nickname()).isEqualTo("user9"),
                () -> assertThat(voteDetailResponse.totalVoteCount()).isEqualTo(-1)
        );
    }

    @Test
    @DisplayName("게시글에 대한 전체 투표 통계를 조회한다.")
    void getVoteStatistics() throws Exception {
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
        given(postService.getVoteStatistics(anyLong(), any(Member.class))).willReturn(response);

        TokenPayload tokenPayload = new TokenPayload(1L, 1L, 1L);
        given(tokenProcessor.resolveToken(anyString())).willReturn("token");
        given(tokenProcessor.parseToken(anyString())).willReturn(tokenPayload);
        given(memberService.findById(anyLong())).willReturn(MemberFixtures.FEMALE_20.get());

        // when
        VoteOptionStatisticsResponse result = RestAssuredMockMvc.given().log().all()
                .headers(HttpHeaders.AUTHORIZATION, "Bearer token")
                .when().get("/posts/{postId}/options", 1)
                .then().log().all()
                .status(HttpStatus.OK)
                .extract()
                .as(VoteOptionStatisticsResponse.class);

        // then
        assertThat(result).usingRecursiveComparison().isEqualTo(response);
    }

    @Test
    @DisplayName("게시글 투표 옵션에 대한 투표 통계를 조회한다.")
    void getVoteOptionStatistics() throws Exception {
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
        given(postService.getVoteOptionStatistics(anyLong(), anyLong(), any(Member.class))).willReturn(response);

        TokenPayload tokenPayload = new TokenPayload(1L, 1L, 1L);
        given(tokenProcessor.resolveToken(anyString())).willReturn("token");
        given(tokenProcessor.parseToken(anyString())).willReturn(tokenPayload);
        given(memberService.findById(anyLong())).willReturn(MemberFixtures.FEMALE_20.get());

        // when
        VoteOptionStatisticsResponse result = RestAssuredMockMvc.given().log().all()
                .headers(HttpHeaders.AUTHORIZATION, "Bearer token")
                .when().get("/posts/{postId}/options/{optionId}", 1, 1)
                .then().log().all()
                .status(HttpStatus.OK)
                .extract()
                .as(VoteOptionStatisticsResponse.class);

        // then
        assertThat(result).usingRecursiveComparison().isEqualTo(response);
    }

    @Test
    @DisplayName("회원본인이 투표한 게시글 목록을 조회한다.")
    void getPostsVotedByMember() throws Exception {
        // given
        PostBody postBody = PostBody.builder()
                .title("title")
                .content("content")
                .build();

        Post post = Post.builder()
                .writer(MALE_30.get())
                .postBody(postBody)
                .deadline(LocalDateTime.now().plusDays(3L).truncatedTo(ChronoUnit.MINUTES))
                .build();

        PostResponse postResponse = PostResponse.of(post, MALE_30.get());

        given(postService.getPostsVotedByMember(anyInt(), any(), any(), any(Member.class)))
                .willReturn(List.of(postResponse));

        TokenPayload tokenPayload = new TokenPayload(1L, 1L, 1L);
        given(tokenProcessor.resolveToken(anyString())).willReturn("token");
        given(tokenProcessor.parseToken(anyString())).willReturn(tokenPayload);
        given(memberService.findById(anyLong())).willReturn(MemberFixtures.FEMALE_20.get());

        // when
        List<PostResponse> result = RestAssuredMockMvc.given().log().all()
                .headers(HttpHeaders.AUTHORIZATION, "Bearer token")
                .param("page", 0)
                .param("postClosingType", PostClosingType.PROGRESS)
                .param("postSortType", PostSortType.LATEST)
                .when().get("/posts/votes/me")
                .then().log().all()
                .status(HttpStatus.OK)
                .extract()
                .as(new ParameterizedTypeReference<List<PostResponse>>() {
                }.getType());

        // then
        assertThat(result.get(0)).usingRecursiveComparison().isEqualTo(postResponse);
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

    @Test
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
