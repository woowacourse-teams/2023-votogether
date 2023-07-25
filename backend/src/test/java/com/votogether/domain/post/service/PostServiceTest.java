package com.votogether.domain.post.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.votogether.ServiceTest;
import com.votogether.domain.category.entity.Category;
import com.votogether.domain.category.repository.CategoryRepository;
import com.votogether.domain.member.entity.Gender;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.SocialType;
import com.votogether.domain.member.repository.MemberRepository;
import com.votogether.domain.post.dto.request.PostCreateRequest;
import com.votogether.domain.post.dto.response.VoteOptionStatisticsResponse;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostBody;
import com.votogether.domain.post.entity.PostOption;
import com.votogether.domain.post.repository.PostOptionRepository;
import com.votogether.domain.post.repository.PostRepository;
import com.votogether.domain.vote.entity.Vote;
import com.votogether.domain.vote.repository.VoteRepository;
import com.votogether.exception.BadRequestException;
import com.votogether.exception.NotFoundException;
import com.votogether.fixtures.CategoryFixtures;
import com.votogether.fixtures.MemberFixtures;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.transaction.annotation.Transactional;

@ServiceTest
class PostServiceTest {

    @Autowired
    PostService postService;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    PostRepository postRepository;

    @Autowired
    PostOptionRepository postOptionRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    VoteRepository voteRepository;

    @Test
    @DisplayName("게시글을 등록한다")
    void save() throws IOException {
        // given
        Category category1 = categoryRepository.save(CategoryFixtures.DEVELOP.get());
        Category category2 = categoryRepository.save(CategoryFixtures.FOOD.get());
        Member member = memberRepository.save(MemberFixtures.MALE_20.get());

        MockMultipartFile file1 = new MockMultipartFile(
                "image1",
                "test.png",
                "image/png",
                new FileInputStream(new File("src/test/resources/images/testImage1.PNG"))
        );
        MockMultipartFile file2 = new MockMultipartFile(
                "image1",
                "test.png",
                "image/png",
                new FileInputStream(new File("src/test/resources/images/testImage2.PNG"))
        );

        PostCreateRequest postCreateRequest = PostCreateRequest.builder()
                .categoryIds(List.of(category1.getId(), category2.getId()))
                .title("title")
                .content("content")
                .postOptionContents(List.of("피자", "치킨"))
                .deadline(LocalDateTime.of(2100, 7, 12, 0, 0))
                .build();

        // when
        Long savedPostId = postService.save(postCreateRequest, member, List.of(file1, file2));

        // then
        assertThat(savedPostId).isNotNull();
    }

    @Nested
    @DisplayName("게시글에 대한 투표 통계 조회 시 ")
    class GetVoteStatistics {

        @Test
        @DisplayName("게시글이 존재하지 않으면 예외를 던진다.")
        void throwExceptionNonExistPost() {
            // given, when, then
            assertThatThrownBy(() -> postService.getVoteStatistics(-1L, MemberFixtures.MALE_20.get()))
                    .isInstanceOf(NotFoundException.class)
                    .hasMessage("해당 게시글이 존재하지 않습니다.");
        }

        @Test
        @DisplayName("게시글 작성자가 아니라면 예외를 던진다.")
        void throwExceptionNotWriter() {
            // given
            Member writer = memberRepository.save(MemberFixtures.MALE_20.get());
            Member reader = memberRepository.save(MemberFixtures.FEMALE_20.get());
            Post post = postRepository.save(
                    Post.builder()
                            .member(writer)
                            .postBody(PostBody.builder().title("title").content("content").build())
                            .deadline(LocalDateTime.of(2100, 7, 12, 0, 0))
                            .build()
            );

            // when, then
            assertThatThrownBy(() -> postService.getVoteStatistics(post.getId(), reader))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("해당 게시글 작성자가 아닙니다.");
        }

        @Test
        @DisplayName("전체 투표 통계를 조회한다.")
        void getVoteStatistics() {
            // given
            Member femaleEarly10 = memberRepository.save(MemberFixtures.FEMALE_EARLY_10.get());
            Member maleLate10 = memberRepository.save(MemberFixtures.MALE_LATE_10.get());
            Member male60 = memberRepository.save(MemberFixtures.MALE_60.get());
            Member female70 = memberRepository.save(MemberFixtures.FEMALE_70.get());
            Member female80 = memberRepository.save(MemberFixtures.FEMALE_80.get());
            Member writer = memberRepository.save(MemberFixtures.MALE_20.get());

            Post post = postRepository.save(
                    Post.builder()
                            .member(writer)
                            .postBody(PostBody.builder().title("title").content("content").build())
                            .deadline(LocalDateTime.of(2100, 7, 12, 0, 0))
                            .build()
            );
            PostOption postOptionA = postOptionRepository.save(
                    PostOption.builder()
                            .post(post)
                            .sequence(1)
                            .content("치킨")
                            .build()
            );
            PostOption postOptionB = postOptionRepository.save(
                    PostOption.builder()
                            .post(post)
                            .sequence(2)
                            .content("피자")
                            .build()
            );

            voteRepository.save(Vote.builder().member(femaleEarly10).postOption(postOptionA).build());
            voteRepository.save(Vote.builder().member(maleLate10).postOption(postOptionB).build());
            voteRepository.save(Vote.builder().member(male60).postOption(postOptionA).build());
            voteRepository.save(Vote.builder().member(female70).postOption(postOptionB).build());
            voteRepository.save(Vote.builder().member(female80).postOption(postOptionA).build());

            // when
            VoteOptionStatisticsResponse response = postService.getVoteStatistics(post.getId(), writer);

            // then
            assertAll(
                    () -> assertThat(response.totalVoteCount()).isEqualTo(5),
                    () -> assertThat(response.totalMaleCount()).isEqualTo(2),
                    () -> assertThat(response.totalFemaleCount()).isEqualTo(3),
                    () -> assertThat(response.ageGroup()).hasSize(7),
                    () -> assertThat(response.ageGroup().get(1).ageGroup()).isEqualTo("10대"),
                    () -> assertThat(response.ageGroup().get(1).voteCount()).isEqualTo(2),
                    () -> assertThat(response.ageGroup().get(1).maleCount()).isEqualTo(1),
                    () -> assertThat(response.ageGroup().get(1).femaleCount()).isEqualTo(1)
            );
        }

    }

    @Nested
    @DisplayName("게시글 투표 옵션에 대한 투표 통계 조회 시 ")
    class GetVoteOptionStatistics {

        @Test
        @DisplayName("게시글이 존재하지 않으면 예외를 던진다.")
        void throwExceptionNonExistPost() {
            // given, when, then
            assertThatThrownBy(() -> postService.getVoteOptionStatistics(-1L, 1L, MemberFixtures.MALE_20.get()))
                    .isInstanceOf(NotFoundException.class)
                    .hasMessage("해당 게시글이 존재하지 않습니다.");
        }

        @Test
        @DisplayName("게시글 투표 옵션이 존재하지 않으면 예외를 던진다.")
        void throwExceptionNonExistOption() {
            // given
            Member writer = memberRepository.save(MemberFixtures.MALE_20.get());

            Post post = postRepository.save(
                    Post.builder()
                            .member(writer)
                            .postBody(PostBody.builder().title("title").content("content").build())
                            .deadline(LocalDateTime.of(2100, 7, 12, 0, 0))
                            .build()
            );

            // when, then
            assertThatThrownBy(() -> postService.getVoteOptionStatistics(post.getId(), -1L, writer))
                    .isInstanceOf(NotFoundException.class)
                    .hasMessage("해당 게시글 투표 옵션이 존재하지 않습니다.");
        }

        @Test
        @DisplayName("게시글 투표 옵션이 게시글에 속하지 않으면 예외를 던진다.")
        void throwExceptionNotBelongToPost() {
            // given
            Member writer = memberRepository.save(MemberFixtures.MALE_20.get());

            Post post1 = postRepository.save(
                    Post.builder()
                            .member(writer)
                            .postBody(PostBody.builder().title("title").content("content").build())
                            .deadline(LocalDateTime.of(2100, 7, 12, 0, 0))
                            .build()
            );
            Post post2 = postRepository.save(
                    Post.builder()
                            .member(writer)
                            .postBody(PostBody.builder().title("title").content("content").build())
                            .deadline(LocalDateTime.of(2100, 7, 12, 0, 0))
                            .build()
            );
            PostOption postOption = postOptionRepository.save(
                    PostOption.builder()
                            .post(post2)
                            .sequence(1)
                            .content("치킨")
                            .build()
            );

            // when, then
            assertThatThrownBy(() -> postService.getVoteOptionStatistics(post1.getId(), postOption.getId(), writer))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("게시글 투표 옵션이 게시글과 연관되어 있지 않습니다.");
        }

        @Test
        @DisplayName("게시글 작성자가 아니라면 예외를 던진다.")
        void throwExceptionNotWriter() {
            // given
            Member writer = memberRepository.save(MemberFixtures.MALE_20.get());
            Member reader = memberRepository.save(MemberFixtures.FEMALE_20.get());
            Post post = postRepository.save(
                    Post.builder()
                            .member(writer)
                            .postBody(PostBody.builder().title("title").content("content").build())
                            .deadline(LocalDateTime.of(2100, 7, 12, 0, 0))
                            .build()
            );
            PostOption postOption = postOptionRepository.save(
                    PostOption.builder()
                            .post(post)
                            .sequence(1)
                            .content("치킨")
                            .build()
            );

            // when, then
            assertThatThrownBy(() -> postService.getVoteOptionStatistics(post.getId(), postOption.getId(), reader))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("해당 게시글 작성자가 아닙니다.");
        }

        @Test
        @DisplayName("게시글 투표 옵션에 대한 투표 통계를 조회한다.")
        void getVoteOptionStatistics() {
            // given
            Member femaleEarly10 = memberRepository.save(MemberFixtures.FEMALE_EARLY_10.get());
            Member maleLate10 = memberRepository.save(MemberFixtures.MALE_LATE_10.get());
            Member male60 = memberRepository.save(MemberFixtures.MALE_60.get());
            Member female70 = memberRepository.save(MemberFixtures.FEMALE_70.get());
            Member female80 = memberRepository.save(MemberFixtures.FEMALE_80.get());
            Member writer = memberRepository.save(MemberFixtures.MALE_20.get());

            Post post = postRepository.save(
                    Post.builder()
                            .member(writer)
                            .postBody(PostBody.builder().title("title").content("content").build())
                            .deadline(LocalDateTime.of(2100, 7, 12, 0, 0))
                            .build()
            );
            PostOption postOption = postOptionRepository.save(
                    PostOption.builder()
                            .post(post)
                            .sequence(1)
                            .content("치킨")
                            .build()
            );

            voteRepository.save(Vote.builder().member(femaleEarly10).postOption(postOption).build());
            voteRepository.save(Vote.builder().member(maleLate10).postOption(postOption).build());
            voteRepository.save(Vote.builder().member(male60).postOption(postOption).build());
            voteRepository.save(Vote.builder().member(female70).postOption(postOption).build());
            voteRepository.save(Vote.builder().member(female80).postOption(postOption).build());

            // when
            VoteOptionStatisticsResponse response =
                    postService.getVoteOptionStatistics(post.getId(), postOption.getId(), writer);

            // then
            assertAll(
                    () -> assertThat(response.totalVoteCount()).isEqualTo(5),
                    () -> assertThat(response.totalMaleCount()).isEqualTo(2),
                    () -> assertThat(response.totalFemaleCount()).isEqualTo(3),
                    () -> assertThat(response.ageGroup()).hasSize(7),
                    () -> assertThat(response.ageGroup().get(1).ageGroup()).isEqualTo("10대"),
                    () -> assertThat(response.ageGroup().get(1).voteCount()).isEqualTo(2),
                    () -> assertThat(response.ageGroup().get(1).maleCount()).isEqualTo(1),
                    () -> assertThat(response.ageGroup().get(1).femaleCount()).isEqualTo(1)
            );
        }

    }

   @Test
   @DisplayName("회원 자신이 투표한 게시글 목록을 조회한다.")
   void getPostsVotedOn() {
       // given
       Member member = memberRepository.save(MemberFixtures.FEMALE_20.get());
       Member writer = memberRepository.save(MemberFixtures.MALE_20.get());

       Post postA = postRepository.save(
               Post.builder()
                       .member(writer)
                       .postBody(PostBody.builder().title("title").content("content").build())
                       .deadline(LocalDateTime.of(2100, 7, 12, 0, 0))
                       .build()
       );
       Post postB = postRepository.save(
               Post.builder()
                       .member(writer)
                       .postBody(PostBody.builder().title("title1").content("content2").build())
                       .deadline(LocalDateTime.of(2100, 7, 12, 0, 0))
                       .build()
       );

       PostOption postOptionOfPostA = postOptionRepository.save(
               PostOption.builder()
                       .post(postA)
                       .sequence(1)
                       .content("치킨")
                       .build()
       );
       PostOption postOptionOfPostB = postOptionRepository.save(
               PostOption.builder()
                       .post(postB)
                       .sequence(1)
                       .content("치킨")
                       .build()
       );

       voteRepository.save(Vote.builder().member(member).postOption(postOptionOfPostA).build());
       voteRepository.save(Vote.builder().member(member).postOption(postOptionOfPostB).build());

       // when
       List<Post> postsVotedOn = postService.getPostsVotedOn(member);

       // then
       assertThat(postsVotedOn).hasSize(2);
   }

}

