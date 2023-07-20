package com.votogether.domain.category.contorller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.nullValue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;

import com.votogether.domain.category.dto.response.CategoryResponse;
import com.votogether.domain.category.entity.Category;
import com.votogether.domain.category.service.CategoryService;
import com.votogether.domain.member.service.MemberService;
import com.votogether.global.jwt.TokenProcessor;
import io.restassured.module.mockmvc.RestAssuredMockMvc;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatus;

@WebMvcTest(CategoryController.class)
class CategoryControllerTest {

    @MockBean
    CategoryService categoryService;

    @MockBean
    TokenProcessor tokenProcessor;

    @MockBean
    MemberService memberService;

    @BeforeEach
    void setUp() {
        RestAssuredMockMvc.standaloneSetup(new CategoryController(categoryService));
    }

    @Test
    @DisplayName("전체 카테고리 목록을 조회한다.")
    void getAllCategories() {
        // given
        Category category = Category.builder()
                .name("개발")
                .build();
        given(categoryService.getAllCategories()).willReturn(List.of(new CategoryResponse(category, false)));

        // when
        RestAssuredMockMvc.
                given().log().all()
                .when().get("/categories/guest")
                .then().log().all()
                .status(HttpStatus.OK)
                .body("[0].id", nullValue())
                .body("[0].name", equalTo("개발"))
                .body("[0].isFavorite", equalTo(false));
    }

    @Test
    @DisplayName("회원으로 전체 카테고리 목록을 조회한다.")
    void getAllCategoriesFromMember() {
        // given
        Category category = Category.builder()
                .name("개발")
                .build();

        Category category1 = Category.builder()
                .name("음식")
                .build();

        List<CategoryResponse> categoryResponses = List.of(
                new CategoryResponse(category, false),
                new CategoryResponse(category1, true)
        );

        given(categoryService.getAllCategories(any())).willReturn(categoryResponses);

        // when
        List<CategoryResponse> results = RestAssuredMockMvc
                .given().log().all()
                .when().get("/categories")
                .then().log().all()
                .status(HttpStatus.OK)
                .extract()
                .as(new ParameterizedTypeReference<List<CategoryResponse>>() {
                }.getType());

        // then
        assertThat(results).usingRecursiveComparison().isEqualTo(categoryResponses);
    }

    @Test
    @DisplayName("선호하는 카테고리를 선호 카테고리 목록에 추가한다.")
    void addFavoriteCategory() {
        // given
        doNothing().when(categoryService).addFavoriteCategory(any(), any());

        // when & then
        RestAssuredMockMvc.
                given().log().all()
                .when().post("/categories/{categoryId}/like", 1)
                .then().log().all()
                .status(HttpStatus.CREATED);
    }

    @Test
    @DisplayName("선호 카테고리를 삭제한다.")
    void removeFavoriteCategory() {
        // given
        doNothing().when(categoryService).removeFavoriteCategory(any(), any());

        // when & then
        RestAssuredMockMvc.
                given().log().all()
                .when().delete("/categories/{categoryId}/like", 1)
                .then().log().all()
                .status(HttpStatus.NO_CONTENT);
    }

}
