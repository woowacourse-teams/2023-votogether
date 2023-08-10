package com.votogether.domain.post.service;

import static com.votogether.fixtures.MemberFixtures.FEMALE_10;
import static com.votogether.fixtures.MemberFixtures.FEMALE_70;
import static com.votogether.fixtures.MemberFixtures.FEMALE_80;
import static com.votogether.fixtures.MemberFixtures.MALE_10;
import static com.votogether.fixtures.MemberFixtures.MALE_20;
import static com.votogether.fixtures.MemberFixtures.MALE_30;
import static com.votogether.fixtures.MemberFixtures.MALE_60;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.votogether.ServiceTest;
import com.votogether.domain.category.entity.Category;
import com.votogether.domain.category.repository.CategoryRepository;
import com.votogether.domain.member.entity.Gender;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.SocialType;
import com.votogether.domain.member.repository.MemberCategoryRepository;
import com.votogether.domain.member.repository.MemberRepository;
import com.votogether.domain.post.dto.request.PostCreateRequest;
import com.votogether.domain.post.dto.request.PostOptionCreateRequest;
import com.votogether.domain.post.dto.response.CategoryResponse;
import com.votogether.domain.post.dto.response.PostResponse;
import com.votogether.domain.post.dto.response.WriterResponse;
import com.votogether.domain.post.dto.response.detail.PostDetailResponse;
import com.votogether.domain.post.dto.response.detail.PostOptionDetailResponse;
import com.votogether.domain.post.dto.response.detail.VoteDetailResponse;
import com.votogether.domain.post.dto.response.vote.VoteOptionStatisticsResponse;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostBody;
import com.votogether.domain.post.entity.PostClosingType;
import com.votogether.domain.post.entity.PostOption;
import com.votogether.domain.post.entity.PostSortType;
import com.votogether.domain.post.exception.PostExceptionType;
import com.votogether.domain.post.repository.PostOptionRepository;
import com.votogether.domain.post.repository.PostRepository;
import com.votogether.domain.vote.entity.Vote;
import com.votogether.domain.vote.repository.VoteRepository;
import com.votogether.domain.vote.service.VoteService;
import com.votogether.exception.BadRequestException;
import com.votogether.exception.NotFoundException;
import com.votogether.fixtures.CategoryFixtures;
import com.votogether.fixtures.MemberFixtures;
import com.votogether.test.persister.MemberTestPersister;
import com.votogether.test.persister.PostOptionTestPersister;
import com.votogether.test.persister.PostTestPersister;
import com.votogether.test.persister.VoteTestPersister;
import jakarta.persistence.EntityManager;
import java.io.FileInputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

@ServiceTest
class PostServiceTest {

    @Autowired
    EntityManager entityManager;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    MemberCategoryRepository memberCategoryRepository;

    @Autowired
    PostRepository postRepository;

    @Autowired
    PostOptionRepository postOptionRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    VoteRepository voteRepository;

    @Autowired
    PostService postService;

    @Autowired
    VoteService voteService;

    @Autowired
    MemberTestPersister memberTestPersister;

    @Autowired
    PostTestPersister postTestPersister;

    @Autowired
    PostOptionTestPersister postOptionTestPersister;

    @Autowired
    VoteTestPersister voteTestPersister;

    @Test
    @DisplayName("게시글을 등록한다")
    void save() throws IOException {
        // given
        Category category1 = categoryRepository.save(CategoryFixtures.DEVELOP.get());
        Category category2 = categoryRepository.save(CategoryFixtures.FOOD.get());
        Member member = memberRepository.save(MemberFixtures.MALE_20.get());

        MockMultipartFile file1 = new MockMultipartFile(
                "image1",
                "test1.png",
                "image/png",
                new FileInputStream("src/test/resources/images/testImage1.PNG")
        );
        MockMultipartFile file2 = new MockMultipartFile(
                "image2",
                "test2.png",
                "image/png",
                new FileInputStream("src/test/resources/images/testImage2.PNG")
        );

        MockMultipartFile file3 = new MockMultipartFile(
                "image3",
                "test3.png",
                "image/png",
                new FileInputStream("src/test/resources/images/testImage3.PNG")
        );

        PostCreateRequest postCreateRequest = PostCreateRequest.builder()
                .categoryIds(List.of(category1.getId(), category2.getId()))
                .title("title")
                .content("content")
                .postOptions(List.of(
                        PostOptionCreateRequest.builder()
                                .content("option1")
                                .build(),
                        PostOptionCreateRequest.builder()
                                .content("option2")
                                .build()
                ))
                .deadline(LocalDateTime.now().plusDays(2))
                .build();

        // when
        Long savedPostId = postService.save(postCreateRequest, member, List.of(file3), List.of(file1, file2));

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
                            .writer(writer)
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
            Member femaleEarly10 = memberRepository.save(MemberFixtures.FEMALE_10.get());
            Member male10 = memberRepository.save(MemberFixtures.MALE_10.get());
            Member male60 = memberRepository.save(MemberFixtures.MALE_60.get());
            Member female70 = memberRepository.save(MemberFixtures.FEMALE_70.get());
            Member female80 = memberRepository.save(MemberFixtures.FEMALE_80.get());
            Member writer = memberRepository.save(MemberFixtures.MALE_20.get());

            Post post = postRepository.save(
                    Post.builder()
                            .writer(writer)
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
            voteRepository.save(Vote.builder().member(male10).postOption(postOptionB).build());
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
                            .writer(writer)
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
                            .writer(writer)
                            .postBody(PostBody.builder().title("title").content("content").build())
                            .deadline(LocalDateTime.of(2100, 7, 12, 0, 0))
                            .build()
            );
            Post post2 = postRepository.save(
                    Post.builder()
                            .writer(writer)
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
                            .writer(writer)
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
            Member female10 = memberRepository.save(FEMALE_10.get());
            Member male10 = memberRepository.save(MALE_10.get());
            Member male60 = memberRepository.save(MALE_60.get());
            Member female70 = memberRepository.save(FEMALE_70.get());
            Member female80 = memberRepository.save(FEMALE_80.get());
            Member writer = memberRepository.save(MALE_20.get());

            Post post = postRepository.save(
                    Post.builder()
                            .writer(writer)
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

            voteRepository.save(Vote.builder().member(female10).postOption(postOption).build());
            voteRepository.save(Vote.builder().member(male10).postOption(postOption).build());
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
    @DisplayName("해당 게시글을 조기 마감 합니다")
    void postClosedEarlyById() {
        // given
        Member writer = memberRepository.save(MemberFixtures.MALE_30.get());
        LocalDateTime oldDeadline = LocalDateTime.now().plus(100, ChronoUnit.MILLIS);
        Post post = postRepository.save(
                Post.builder()
                        .writer(writer)
                        .postBody(PostBody.builder().title("title").content("content").build())
                        .deadline(oldDeadline)
                        .build()
        );

        Post foundPost = postRepository.findById(post.getId()).get();

        // when
        postService.closePostEarlyById(post.getId(), writer);

        // then
        assertAll(
                () -> assertThat(foundPost.getId()).isEqualTo(post.getId()),
                () -> assertThat(foundPost.getDeadline()).isBefore(oldDeadline)
        );
    }

    @Test
    @DisplayName("해당 게시글을 조기 마감할 시, 작성자가 아니면 예외를 던진다.")
    void throwExceptionNotWriterPostClosedEarly() {
        // given
        Member writer = memberRepository.save(MemberFixtures.MALE_30.get());
        LocalDateTime oldDeadline = LocalDateTime.of(2100, 7, 12, 0, 0);
        Post post = postRepository.save(
                Post.builder()
                        .writer(writer)
                        .postBody(PostBody.builder().title("title").content("content").build())
                        .deadline(oldDeadline)
                        .build()
        );

        Post foundPost = postRepository.findById(post.getId()).get();

        // when, then
        assertThatThrownBy(() -> postService.closePostEarlyById(foundPost.getId(), MemberFixtures.MALE_30.get()))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("해당 게시글 작성자가 아닙니다.");
    }

    @Test
    @DisplayName("해당 게시글을 조기 마감할 시, 마감이 된 게시글이면 예외를 던진다.")
    void throwExceptionDeadLinePostClosedEarly() {
        // given
        Member writer = memberRepository.save(MemberFixtures.MALE_30.get());
        LocalDateTime oldDeadline = LocalDateTime.of(2000, 7, 12, 0, 0);
        Post post = postRepository.save(
                Post.builder()
                        .writer(writer)
                        .postBody(PostBody.builder().title("title").content("content").build())
                        .deadline(oldDeadline)
                        .build()
        );

        Post foundPost = postRepository.findById(post.getId()).get();

        // when, then
        assertThatThrownBy(() -> postService.closePostEarlyById(foundPost.getId(), writer))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("게시글이 이미 마감되었습니다.");
    }

    @Test
    @DisplayName("정렬 유형 및 마감 유형별로 모든 게시물 가져온다")
    void getAllPostBySortTypeAndClosingType() {
        // given
        Member writer = MALE_30.get();
        memberRepository.save(writer);

        Member memberToAllPostVote = MALE_20.get();
        memberRepository.save(memberToAllPostVote);

        Category ca1 = Category.builder()
                .name("ca1")
                .build();
        Category ca2 = Category.builder()
                .name("ca2")
                .build();
        Category ca3 = Category.builder()
                .name("ca3")
                .build();

        categoryRepository.saveAll(List.of(ca1, ca2, ca3));

        MockMultipartFile file1 = new MockMultipartFile(
                "file1",
                "hello1.txt",
                "text/plain",
                "Hello, World!11".getBytes()
        );

        MockMultipartFile file2 = new MockMultipartFile(
                "file2",
                "hello2.txt",
                "text/plain",
                "Hello, World!22".getBytes()
        );

        MockMultipartFile file3 = new MockMultipartFile(
                "file3",
                "hello3.txt",
                "text/plain",
                "Hello, World!33".getBytes()
        );

        for (int postSequence = 30; postSequence > 0; postSequence--) {
            List<PostOptionCreateRequest> options = new ArrayList<>() {
                {
                    add(
                            PostOptionCreateRequest.builder()
                                    .content("option1")
                                    .build()
                    );
                    add(
                            PostOptionCreateRequest.builder()
                                    .content("option2")
                                    .build()
                    );
                }
            };

            List<MultipartFile> optionImages = new ArrayList<>() {
                {
                    add(file1);
                    add(file2);
                }
            };

            List<MultipartFile> contentImages = new ArrayList<>() {
                {
                    add(file3);
                }
            };

            if (postSequence % 2 == 0) {
                MockMultipartFile file4 = new MockMultipartFile(
                        "file4",
                        "hello4.txt",
                        "text/plain",
                        "Hello, World!44".getBytes()
                );

                optionImages.add(file4);
                options.add(
                        PostOptionCreateRequest.builder()
                                .content("option3")
                                .build()
                );
            }

            PostCreateRequest postCreateRequest = PostCreateRequest.builder()
                    .categoryIds(List.of(0L, 2L))
                    .title("title" + postSequence)
                    .content("content" + postSequence)
                    .postOptions(options)
                    .deadline(LocalDateTime.now().plusDays(2))
                    .build();

            Long savedPostId = postService.save(postCreateRequest, writer, contentImages, optionImages);
            Post post = postRepository.findById(savedPostId).get();

            List<PostOption> postOptions = post.getPostOptions().getPostOptions();
            Long postOptionId = postOptions.get(0).getId();
            voteService.vote(memberToAllPostVote, post.getId(), postOptionId);

            for (int voteCount = 0; voteCount <= postSequence; voteCount++) {
                Member memberToVote = Member.builder()
                        .nickname("Abel" + postSequence + voteCount)
                        .gender(Gender.MALE)
                        .birthYear(2000)
                        .socialType(SocialType.KAKAO)
                        .socialId("Abel" + postSequence + voteCount)
                        .build();

                memberRepository.save(memberToVote);

                PostOption perPostOption = postOptions.get(voteCount % postOptions.size());
                voteService.vote(memberToVote, savedPostId, perPostOption.getId());
            }
        }

        entityManager.clear();

        // when
        List<PostResponse> responses = postService.getAllPostBySortTypeAndClosingType(
                memberToAllPostVote,
                0,
                PostClosingType.PROGRESS,
                PostSortType.HOT
        );

        // then
        PostResponse firstResponse = responses.get(0);
        PostResponse secondResponse = responses.get(1);
        assertAll(
                () -> assertThat(firstResponse.voteInfo().options()).hasSize(3),
                () -> assertThat(firstResponse.voteInfo().totalVoteCount()).isEqualTo(32),
                () -> assertThat(secondResponse.voteInfo().options()).hasSize(2),
                () -> assertThat(secondResponse.voteInfo().totalVoteCount()).isEqualTo(31)
        );
    }

    @Test
    @DisplayName("비회원 게시글 목록 조회 시 마감된 게시글은 결과를 확인할 수 있고, 진행중인 게시글은 결과를 확인할 수 없다.")
    void getPostsGuest() {
        // given
        List<Member> voters = new ArrayList<>();
        Member writer = memberTestPersister.builder().save();

        for (int i = 0; i < 5; i++) {
            voters.add(memberTestPersister.builder().save());
        }

        Post closedPost = postTestPersister.builder()
                .writer(writer)
                .deadline(LocalDateTime.of(2022, 12, 25, 0, 0))
                .save();

        for (int j = 0; j < 2; j++) {
            PostOption postOption = postOptionTestPersister.builder().post(closedPost).save();
            for (int k = 0; k < 4; k++) {
                voteTestPersister.builder().member(voters.get(k)).postOption(postOption).save();
            }
        }

        Post notClosedPost = postTestPersister.builder()
                .writer(writer)
                .deadline(LocalDateTime.of(3022, 12, 25, 0, 0))
                .save();

        for (int j = 0; j < 2; j++) {
            PostOption postOption = postOptionTestPersister.builder().post(notClosedPost).save();
            for (int k = 0; k < 4; k++) {
                voteTestPersister.builder().member(voters.get(k)).postOption(postOption).save();
            }
        }

        entityManager.flush();
        entityManager.clear();

        // when
        List<PostResponse> result = postService.getPostsGuest(0, PostClosingType.ALL, PostSortType.LATEST, null);

        // then
        assertAll(
                () -> assertThat(result).hasSize(2),
                () -> assertThat(result.get(0).voteInfo().totalVoteCount()).isEqualTo(-1),
                () -> assertThat(result.get(0).voteInfo().options().get(0).voteCount()).isEqualTo(-1),
                () -> assertThat(result.get(0).voteInfo().options().get(1).voteCount()).isEqualTo(-1),
                () -> assertThat(result.get(1).voteInfo().totalVoteCount()).isEqualTo(8),
                () -> assertThat(result.get(1).voteInfo().options().get(0).voteCount()).isEqualTo(4),
                () -> assertThat(result.get(1).voteInfo().options().get(1).voteCount()).isEqualTo(4)
        );
    }

    @Test
    @DisplayName("한 게시글의 상세를 조회한다.")
    void getPost() throws IOException {
        Category category1 = categoryRepository.save(CategoryFixtures.DEVELOP.get());
        Category category2 = categoryRepository.save(CategoryFixtures.FOOD.get());
        Member member = memberRepository.save(MemberFixtures.MALE_20.get());

        MockMultipartFile file1 = new MockMultipartFile(
                "image1",
                "test1.png",
                "image/png",
                new FileInputStream("src/test/resources/images/testImage1.PNG")
        );
        MockMultipartFile file2 = new MockMultipartFile(
                "image1",
                "test2.png",
                "image/png",
                new FileInputStream("src/test/resources/images/testImage2.PNG")
        );

        LocalDateTime deadline = LocalDateTime.now().plusDays(3);

        PostOptionCreateRequest option1 = PostOptionCreateRequest.builder()
                .content("option1")
                .build();

        PostOptionCreateRequest option2 = PostOptionCreateRequest.builder()
                .content("option2")
                .build();

        PostCreateRequest postCreateRequest = PostCreateRequest.builder()
                .categoryIds(List.of(category1.getId(), category2.getId()))
                .title("title")
                .content("content")
                .postOptions(List.of(option1, option2))
                .deadline(deadline)
                .build();

        Long savedPostId = postService.save(postCreateRequest, member, List.of(), List.of(file1, file2));

        // when
        PostDetailResponse response = postService.getPostById(savedPostId, member);

        // then
        List<CategoryResponse> categories = response.categories();
        WriterResponse writer = response.writer();
        VoteDetailResponse voteDetailResponse = response.voteInfo();
        List<PostOptionDetailResponse> options = voteDetailResponse.options();

        assertAll(
                () -> assertThat(response.postId()).isEqualTo(savedPostId),
                () -> assertThat(response.title()).isEqualTo("title"),
                () -> assertThat(response.content()).isEqualTo("content"),
                () -> assertThat(response.deadline()).isEqualTo(deadline),
                () -> assertThat(categories).hasSize(2),
                () -> assertThat(categories.get(0).name()).isEqualTo("개발"),
                () -> assertThat(writer.id()).isEqualTo(member.getId()),
                () -> assertThat(writer.nickname()).isEqualTo("user7"),
                () -> assertThat(voteDetailResponse.totalVoteCount()).isZero(),
                () -> assertThat(options).hasSize(2),
                () -> assertThat(options.get(0).imageUrl()).contains("test1.png")
        );
    }

    @Test
    @DisplayName("존재하지 않은 게시글을 가져오려 할 시, 예외를 던진다.")
    void throwExceptionNotFoundPost() {
        // given
        Member member = memberRepository.save(MemberFixtures.MALE_20.get());

        // when, then
        assertThatThrownBy(() -> postService.getPostById(1L, member))
                .isInstanceOf(NotFoundException.class)
                .hasMessage(PostExceptionType.POST_NOT_FOUND.getMessage());
    }

}
