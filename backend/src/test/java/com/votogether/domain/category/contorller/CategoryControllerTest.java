package com.votogether.domain.category.contorller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;

import com.votogether.domain.category.dto.response.CategoryResponse;
import com.votogether.domain.category.entity.Category;
import com.votogether.domain.category.service.CategoryService;
import io.restassured.module.mockmvc.RestAssuredMockMvc;
import java.util.List;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;

@WebMvcTest(CategoryController.class)
class CategoryControllerTest {

    @MockBean
    CategoryService categoryService;

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
        given(categoryService.getAllCategories()).willReturn(List.of(new CategoryResponse(category)));

        // when
        RestAssuredMockMvc.
                given().log().all()
                .when().get("/categories/guest")
                .then().log().all()
                .status(HttpStatus.OK)
                .body("[0].id", Matchers.nullValue())
                .body("[0].name", Matchers.equalTo("개발"))
                .body("[0].isFavorite", Matchers.equalTo(false));
    }

    @Test
    @DisplayName("선호하는 카테고리를 선호 카테고리 목록에 추가한다.")
    void addFavoriteCategory() {
        // given
        doNothing().when(categoryService).addFavoriteCategory(any(), any());

        // when & then
        RestAssuredMockMvc.
                given().log().all()
                .when().post("/categories/1/like")
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
                .when().delete("/categories/1/like")
                .then().log().all()
                .status(HttpStatus.NO_CONTENT);
    }

}
