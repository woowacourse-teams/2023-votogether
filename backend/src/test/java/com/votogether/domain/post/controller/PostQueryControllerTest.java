package com.votogether.domain.post.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.equalTo;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.dto.response.post.CategoryResponse;
import com.votogether.domain.post.dto.response.post.PostOptionVoteResultResponse;
import com.votogether.domain.post.dto.response.post.PostResponse;
import com.votogether.domain.post.dto.response.post.PostVoteResultResponse;
import com.votogether.domain.post.dto.response.post.PostWriterResponse;
import com.votogether.domain.post.dto.response.vote.VoteCountForAgeGroupResponse;
import com.votogether.domain.post.dto.response.vote.VoteOptionStatisticsResponse;
import com.votogether.domain.post.entity.vo.PostClosingType;
import com.votogether.domain.post.entity.vo.PostSortType;
import com.votogether.domain.post.service.PostQueryService;
import com.votogether.test.ControllerTest;
import io.restassured.common.mapper.TypeRef;
import io.restassured.module.mockmvc.RestAssuredMockMvc;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(PostQueryController.class)
class PostQueryControllerTest extends ControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    PostQueryService postQueryService;

    @BeforeEach
    void setUp() {
        RestAssuredMockMvc.mockMvc(mockMvc);
    }

    @Nested
    @DisplayName("게시글 목록 조회")
    class GetPosts {

        @Test
        @DisplayName("게시글 목록 조회에 성공하면 200 응답을 반환한다.")
        void return200success() throws Exception {
            // given
            mockingAuthArgumentResolver();
            List<PostResponse> response = List.of(mockingPostResponse());
            given(postQueryService.getPosts(
                    anyInt(),
                    any(PostClosingType.class),
                    any(PostSortType.class),
                    any(),
                    any(Member.class))
            ).willReturn(response);

            // when
            List<PostResponse> result = RestAssuredMockMvc.given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, "Bearer token")
                    .param("page", 0)
                    .param("postClosingType", PostClosingType.ALL)
                    .param("postSortType", PostSortType.LATEST)
                    .when().get("/posts")
                    .then().log().all()
                    .status(HttpStatus.OK)
                    .extract()
                    .as(new TypeRef<>() {
                    });

            // then
            assertThat(result).usingRecursiveComparison().isEqualTo(response);
        }

        @Test
        @DisplayName("페이지가 음수라면 400 응답을 반환한다.")
        void return400pageNegative() throws Exception {
            // given
            mockingAuthArgumentResolver();

            //  when, then
            RestAssuredMockMvc.given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, "Bearer token")
                    .param("page", -1)
                    .param("postClosingType", PostClosingType.ALL)
                    .param("postSortType", PostSortType.LATEST)
                    .when().get("/posts")
                    .then().log().all()
                    .status(HttpStatus.BAD_REQUEST)
                    .body("code", equalTo(201))
                    .body("message", containsString("페이지는 0이상 정수만 가능합니다."));
        }

    }

    @Nested
    @DisplayName("게시글 상세 조회")
    class GetPost {

        @Test
        @DisplayName("게시글 상세 조회에 성공하면 200 응답을 반환한다.")
        void return200success() throws Exception {
            // given
            mockingAuthArgumentResolver();
            PostResponse response = mockingPostResponse();
            given(postQueryService.getPost(anyLong(), any(Member.class))).willReturn(response);

            // when
            PostResponse result = RestAssuredMockMvc.given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, "Bearer token")
                    .when().get("/posts/{postId}", 1)
                    .then().log().all()
                    .status(HttpStatus.OK)
                    .extract()
                    .as(PostResponse.class);

            // then
            assertThat(result).usingRecursiveComparison().isEqualTo(response);
        }

        @ParameterizedTest
        @ValueSource(longs = {-1, 0})
        @DisplayName("게시글 ID가 양의 정수가 아니라면 400 응답을 반환한다.")
        void return400postIdNegative(Long postId) throws Exception {
            // given
            mockingAuthArgumentResolver();

            // when, then
            RestAssuredMockMvc.given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, "Bearer token")
                    .when().get("/posts/{postId}", postId)
                    .then().log().all()
                    .status(HttpStatus.BAD_REQUEST)
                    .body("code", equalTo(201))
                    .body("message", containsString("게시글 ID는 양의 정수만 가능합니다."));
        }

    }

    @Nested
    @DisplayName("게시글 검색")
    class SearchPosts {

        @Test
        @DisplayName("게시글 검색에 성공하면 200 응답을 반환한다.")
        void return200success() throws Exception {
            // given
            mockingAuthArgumentResolver();
            List<PostResponse> response = List.of(mockingPostResponse());
            given(postQueryService.searchPosts(
                    anyString(),
                    anyInt(),
                    any(PostClosingType.class),
                    any(PostSortType.class),
                    any(Member.class)
            )).willReturn(response);

            // when
            List<PostResponse> result = RestAssuredMockMvc.given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, "Bearer token")
                    .param("keyword", "hello")
                    .param("page", 0)
                    .param("postClosingType", PostClosingType.ALL)
                    .param("postSortType", PostSortType.LATEST)
                    .when().get("/posts/search")
                    .then().log().all()
                    .status(HttpStatus.OK)
                    .extract()
                    .as(new TypeRef<>() {
                    });

            // then
            assertThat(result).usingRecursiveComparison().isEqualTo(response);
        }

        @Test
        @DisplayName("페이지가 음수라면 400 응답을 반환한다.")
        void return400pageNegative() throws Exception {
            // given
            mockingAuthArgumentResolver();

            // when, then
            RestAssuredMockMvc.given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, "Bearer token")
                    .param("keyword", "hello")
                    .param("page", -1)
                    .param("postClosingType", PostClosingType.ALL)
                    .param("postSortType", PostSortType.LATEST)
                    .when().get("/posts/search")
                    .then().log().all()
                    .status(HttpStatus.BAD_REQUEST)
                    .body("code", equalTo(201))
                    .body("message", containsString("페이지는 0이상 정수만 가능합니다."));
        }

    }

    @Nested
    @DisplayName("내가 쓴 게시글 조회")
    class GetPostsWrittenByMe {

        @Test
        @DisplayName("내가 쓴 게시글 조회에 성공하면 200 응답을 반환한다.")
        void return200success() throws Exception {
            // given
            mockingAuthArgumentResolver();
            List<PostResponse> response = List.of(mockingPostResponse());
            given(postQueryService.getPostsWrittenByMe(
                    anyInt(),
                    any(PostClosingType.class),
                    any(PostSortType.class),
                    any(Member.class)
            )).willReturn(response);

            // when
            List<PostResponse> result = RestAssuredMockMvc.given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, "Bearer token")
                    .param("page", 0)
                    .param("postClosingType", PostClosingType.ALL)
                    .param("postSortType", PostSortType.LATEST)
                    .when().get("/posts/me")
                    .then().log().all()
                    .status(HttpStatus.OK)
                    .extract()
                    .as(new TypeRef<>() {
                    });

            // then
            assertThat(result).usingRecursiveComparison().isEqualTo(response);
        }

        @Test
        @DisplayName("페이지가 음수라면 400 응답을 반환한다.")
        void return400pageNegative() throws Exception {
            // given
            mockingAuthArgumentResolver();

            // when, then
            RestAssuredMockMvc.given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, "Bearer token")
                    .param("page", -1)
                    .param("postClosingType", PostClosingType.ALL)
                    .param("postSortType", PostSortType.LATEST)
                    .when().get("/posts/me")
                    .then().log().all()
                    .status(HttpStatus.BAD_REQUEST)
                    .body("code", equalTo(201))
                    .body("message", containsString("페이지는 0이상 정수만 가능합니다."));
        }

    }

    @Nested
    @DisplayName("내가 투표한 게시글 조회")
    class GetPostsVotedByMe {

        @Test
        @DisplayName("내가 투표한 게시글 조회에 성공하면 200 응답을 반환한다.")
        void return200success() throws Exception {
            // given
            mockingAuthArgumentResolver();
            List<PostResponse> response = List.of(mockingPostResponse());
            given(postQueryService.getPostsVotedByMe(
                    anyInt(),
                    any(PostClosingType.class),
                    any(PostSortType.class),
                    any(Member.class)
            )).willReturn(response);

            // when
            List<PostResponse> result = RestAssuredMockMvc.given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, "Bearer token")
                    .param("page", 0)
                    .param("postClosingType", PostClosingType.ALL)
                    .param("postSortType", PostSortType.LATEST)
                    .when().get("/posts/votes/me")
                    .then().log().all()
                    .status(HttpStatus.OK)
                    .extract()
                    .as(new TypeRef<>() {
                    });

            // then
            assertThat(result).usingRecursiveComparison().isEqualTo(response);
        }

        @Test
        @DisplayName("페이지가 음수라면 400 응답을 반환한다.")
        void return400pageNegative() throws Exception {
            // given
            mockingAuthArgumentResolver();

            // when, then
            RestAssuredMockMvc.given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, "Bearer token")
                    .param("page", -1)
                    .param("postClosingType", PostClosingType.ALL)
                    .param("postSortType", PostSortType.LATEST)
                    .when().get("/posts/votes/me")
                    .then().log().all()
                    .status(HttpStatus.BAD_REQUEST)
                    .body("code", equalTo(201))
                    .body("message", containsString("페이지는 0이상 정수만 가능합니다."));
        }

    }

    @Nested
    @DisplayName("게시글 투표 통계 조회")
    class GetPostVoteStatistics {

        @Test
        @DisplayName("게시글 투표 통계 조회에 성공하면 200 응답을 반환한다.")
        void return200success() throws Exception {
            // given
            mockingAuthArgumentResolver();
            VoteOptionStatisticsResponse response = mockingVoteOptionStatisticsResponse();
            given(postQueryService.getVoteStatistics(anyLong(), any(Member.class))).willReturn(response);

            // when
            VoteOptionStatisticsResponse result = RestAssuredMockMvc.given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, "Bearer token")
                    .when().get("/posts/{postId}/options", 1L)
                    .then().log().all()
                    .status(HttpStatus.OK)
                    .extract()
                    .as(VoteOptionStatisticsResponse.class);

            // then
            assertThat(result).usingRecursiveComparison().isEqualTo(response);
        }

        @ParameterizedTest
        @ValueSource(longs = {-1, 0})
        @DisplayName("게시글 ID가 양의 정수가 아니라면 400 응답을 반환한다.")
        void return400postIdNegative(Long postId) throws Exception {
            // given
            mockingAuthArgumentResolver();

            // when, then
            RestAssuredMockMvc.given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, "Bearer token")
                    .when().get("/posts/{postId}/options", postId)
                    .then().log().all()
                    .status(HttpStatus.BAD_REQUEST)
                    .body("code", equalTo(201))
                    .body("message", containsString("게시글 ID는 양의 정수만 가능합니다."));
        }

    }

    @Nested
    @DisplayName("게시글 투표 옵션 통계 조회")
    class GetPostOptionVoteStatistics {

        @Test
        @DisplayName("게시글 투표 옵션 통계 조회에 성공하면 200 응답을 반환한다.")
        void return200success() throws Exception {
            // given
            mockingAuthArgumentResolver();
            VoteOptionStatisticsResponse response = mockingVoteOptionStatisticsResponse();
            given(postQueryService.getVoteOptionStatistics(
                    anyLong(),
                    anyLong(),
                    any(Member.class)
            )).willReturn(response);

            // when
            VoteOptionStatisticsResponse result = RestAssuredMockMvc.given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, "Bearer token")
                    .when().get("/posts/{postId}/options/{optionId}", 1L, 1L)
                    .then().log().all()
                    .status(HttpStatus.OK)
                    .extract()
                    .as(VoteOptionStatisticsResponse.class);

            // then
            assertThat(result).usingRecursiveComparison().isEqualTo(response);
        }

        @ParameterizedTest
        @ValueSource(longs = {-1, 0})
        @DisplayName("게시글 ID가 양의 정수가 아니라면 400 응답을 반환한다.")
        void return400postIdNegative(Long postId) throws Exception {
            // given
            mockingAuthArgumentResolver();

            // when, then
            RestAssuredMockMvc.given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, "Bearer token")
                    .when().get("/posts/{postId}/options/{optionId}", postId, 1L)
                    .then().log().all()
                    .status(HttpStatus.BAD_REQUEST)
                    .body("code", equalTo(201))
                    .body("message", containsString("게시글 ID는 양의 정수만 가능합니다."));
        }

        @ParameterizedTest
        @ValueSource(longs = {-1, 0})
        @DisplayName("게시글 투표 옵션 ID가 양의 정수가 아니라면 400 응답을 반환한다.")
        void return400postOptionIdNegative(Long postOptionId) throws Exception {
            // given
            mockingAuthArgumentResolver();

            // when, then
            RestAssuredMockMvc.given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, "Bearer token")
                    .when().get("/posts/{postId}/options/{optionId}", 1L, postOptionId)
                    .then().log().all()
                    .status(HttpStatus.BAD_REQUEST)
                    .body("code", equalTo(201))
                    .body("message", containsString("게시글 옵션 ID는 양의 정수만 가능합니다."));
        }

    }

    private PostResponse mockingPostResponse() {
        return new PostResponse(
                1L,
                new PostWriterResponse(1L, "votogether"),
                "title",
                "content",
                "https://votogether.com/static/images/image.png",
                List.of(
                        new CategoryResponse(1L, "develop")
                ),
                LocalDateTime.now().truncatedTo(ChronoUnit.MINUTES),
                LocalDateTime.now().truncatedTo(ChronoUnit.MINUTES),
                3,
                15,
                new PostVoteResultResponse(
                        0L,
                        -1,
                        List.of(
                                new PostOptionVoteResultResponse(
                                        1L,
                                        "content",
                                        "image.png",
                                        -1,
                                        0
                                )
                        )
                )
        );
    }

    private VoteOptionStatisticsResponse mockingVoteOptionStatisticsResponse() {
        return new VoteOptionStatisticsResponse(
                10,
                5,
                5,
                List.of(
                        new VoteCountForAgeGroupResponse(
                                "10대",
                                2,
                                1,
                                1
                        ),
                        new VoteCountForAgeGroupResponse(
                                "20대",
                                3,
                                1,
                                2
                        )
                )
        );
    }

}
