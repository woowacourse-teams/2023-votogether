package com.votogether.domain.post.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.equalTo;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;

import com.votogether.domain.post.dto.response.post.CategoryResponse;
import com.votogether.domain.post.dto.response.post.PostOptionVoteResultResponse;
import com.votogether.domain.post.dto.response.post.PostRankingResponse;
import com.votogether.domain.post.dto.response.post.PostResponse;
import com.votogether.domain.post.dto.response.post.PostSummaryResponse;
import com.votogether.domain.post.dto.response.post.PostVoteResultResponse;
import com.votogether.domain.post.dto.response.post.PostWriterResponse;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.vo.PostClosingType;
import com.votogether.domain.post.entity.vo.PostSortType;
import com.votogether.domain.post.service.PostGuestService;
import com.votogether.global.exception.GlobalExceptionHandler;
import com.votogether.test.ControllerTest;
import com.votogether.test.fixtures.MemberFixtures;
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
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

@WebMvcTest(PostGuestController.class)
class PostGuestControllerTest extends ControllerTest {

    @MockBean
    PostGuestService postGuestService;

    @BeforeEach
    void setUp(WebApplicationContext webApplicationContext) {
        RestAssuredMockMvc.standaloneSetup(
                MockMvcBuilders
                        .standaloneSetup(new PostGuestController(postGuestService))
                        .setControllerAdvice(GlobalExceptionHandler.class)
        );
        RestAssuredMockMvc.webAppContextSetup(webApplicationContext);
    }

    @Nested
    @DisplayName("비회원 게시글 목록 조회")
    class GuestGetPosts {

        @Test
        @DisplayName("게시글 목록 조회에 성공하면 200 응답을 반환한다.")
        void return200success() {
            // given
            List<PostResponse> response = List.of(mockingPostResponse());
            given(postGuestService.getPosts(anyInt(), any(PostClosingType.class), any(PostSortType.class), any()))
                    .willReturn(response);

            // when
            List<PostResponse> result = RestAssuredMockMvc.given().log().all()
                    .param("page", 0)
                    .param("postClosingType", PostClosingType.ALL)
                    .param("postSortType", PostSortType.LATEST)
                    .when().get("/posts/guest")
                    .then().log().all()
                    .status(HttpStatus.OK)
                    .extract()
                    .as(new TypeRef<>() {
                    });

            // then
            assertThat(result).usingRecursiveComparison().isEqualTo(response);
        }

        @Test
        @DisplayName("페이지가 음의 정수라면 400 응답을 반환한다.")
        void return400pageIsNegative() {
            // given, when, then
            RestAssuredMockMvc.given().log().all()
                    .param("page", -1)
                    .param("postClosingType", PostClosingType.ALL)
                    .param("postSortType", PostSortType.LATEST)
                    .when().get("/posts/guest")
                    .then().log().all()
                    .status(HttpStatus.BAD_REQUEST)
                    .body("code", equalTo(201))
                    .body("message", containsString("페이지는 0이상 정수만 가능합니다."));
        }

    }

    @Nested
    @DisplayName("비회원 게시글 상세 조회")
    class GuestGetPost {

        @Test
        @DisplayName("게시글 상세 조회에 성공하면 200 응답을 반환한다.")
        void return200success() {
            // given
            PostResponse response = mockingPostResponse();
            given(postGuestService.getPost(anyLong())).willReturn(response);

            // when
            PostResponse result = RestAssuredMockMvc.given().log().all()
                    .when().get("/posts/{postId}/guest", 1L)
                    .then().log().all()
                    .status(HttpStatus.OK)
                    .extract()
                    .as(new TypeRef<>() {
                    });

            // then
            assertThat(result).usingRecursiveComparison().isEqualTo(response);
        }

        @ParameterizedTest
        @ValueSource(longs = {-1, 0})
        @DisplayName("게시글 ID가 양의 정수가 아니라면 400 응답을 반환한다.")
        void return400postIdIsNegativeOrZero(Long postId) {
            // given, when, then
            RestAssuredMockMvc.given().log().all()
                    .when().get("/posts/{postId}/guest", postId)
                    .then().log().all()
                    .status(HttpStatus.BAD_REQUEST)
                    .body("code", equalTo(201))
                    .body("message", containsString("게시글 ID는 양의 정수만 가능합니다."));
        }

    }

    @Nested
    @DisplayName("비회원 게시글 목록 검색")
    class GuestSearchPosts {

        @Test
        @DisplayName("게시글 목록 검색에 성공하면 200 응답을 반환한다.")
        void return200success() {
            // given
            List<PostResponse> response = List.of(mockingPostResponse());
            given(postGuestService.searchPosts(
                    anyString(),
                    anyInt(),
                    any(PostClosingType.class),
                    any(PostSortType.class)
            )).willReturn(response);

            // when
            List<PostResponse> result = RestAssuredMockMvc.given().log().all()
                    .param("keyword", "votogether")
                    .param("page", 0)
                    .param("postClosingType", PostClosingType.ALL)
                    .param("postSortType", PostSortType.LATEST)
                    .when().get("/posts/search/guest")
                    .then().log().all()
                    .status(HttpStatus.OK)
                    .extract()
                    .as(new TypeRef<>() {
                    });

            // then
            assertThat(result).usingRecursiveComparison().isEqualTo(response);
        }

        @Test
        @DisplayName("페이지가 음의 정수라면 400 응답을 반환한다.")
        void return400pageIsNegative() {
            // given, when, then
            RestAssuredMockMvc.given().log().all()
                    .param("keyword", "votogether")
                    .param("page", -1)
                    .param("postClosingType", PostClosingType.ALL)
                    .param("postSortType", PostSortType.LATEST)
                    .when().get("/posts/search/guest")
                    .then().log().all()
                    .status(HttpStatus.BAD_REQUEST)
                    .body("code", equalTo(201))
                    .body("message", containsString("페이지는 0이상 정수만 가능합니다."));
        }

    }

    @Test
    @DisplayName("인기 게시물 랭킹을 불러온다.")
    void getRanking() {
        // given
        Post post = Post.builder()
                .title("제목")
                .content("내용")
                .writer(MemberFixtures.MALE_10.get())
                .deadline(LocalDateTime.now().plusDays(3))
                .build();
        ReflectionTestUtils.setField(post, "id", 1L);
        PostRankingResponse postRankingResponse = new PostRankingResponse(1, PostSummaryResponse.from(post));
        given(postGuestService.getRanking()).willReturn(List.of(postRankingResponse));

        // when, then
        List<PostRankingResponse> result = RestAssuredMockMvc.given().log().all()
                .when().get("/posts/ranking/popular/guest")
                .then().log().all()
                .status(HttpStatus.OK)
                .extract()
                .as(new TypeRef<List<PostRankingResponse>>() {
                }.getType());

        assertThat(result).isEqualTo(List.of(postRankingResponse));
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

}
