package com.votogether.domain.post.controller;

import static org.hamcrest.Matchers.startsWith;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.votogether.domain.post.dto.request.PostCreateRequest;
import com.votogether.domain.post.integrated.IntegrationTest;
import com.votogether.fixtures.MemberFixtures;
import com.votogether.global.jwt.TokenProcessor;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

class PostControllerIntegratedTest extends IntegrationTest {

    @Autowired
    TokenProcessor tokenProcessor;

    @Test
    @DisplayName("게시글을 등록한다")
    void save() throws IOException {
        // given
        String token = tokenProcessor.generateToken(MemberFixtures.MALE_30.get());

        List<String> postOptionRequests = List.of("option1", "option2");

        PostCreateRequest postCreateRequest = PostCreateRequest.builder()
                .title("title")
                .content("content")
                .postOptionContents(postOptionRequests)
                .categoryIds(List.of(0L, 3L))
                .deadline(LocalDateTime.now())
                .build();

        String fileName1 = "testImage1.PNG";
        String resultFileName1 = "testResultImage1.PNG";
        String filePath1 = "src/test/resources/images/" + fileName1;
        File file1 = new File(filePath1);

        String fileName2 = "testImage2.PNG";
        String resultFileName2 = "testResultImage2.PNG";
        String filePath2 = "src/test/resources/images/" + fileName2;
        File file2 = new File(filePath2);

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

        // when, then
        RestAssured.given().log().all()
                .contentType(ContentType.MULTIPART)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                .multiPart("request", postCreateRequest, "application/json")
                .multiPart("images", resultFileName1, new FileInputStream(file1), "image/png")
                .multiPart("images", resultFileName2, new FileInputStream(file2), "image/png")
                .when().post("/posts")
                .then().log().all()
                .statusCode(HttpStatus.CREATED.value())
                .header("Location", startsWith("/posts/"));
    }

}
