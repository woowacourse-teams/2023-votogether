package com.votogether.domain.post.service;

import static com.votogether.test.fixtures.MemberFixtures.FEMALE_10;
import static com.votogether.test.fixtures.MemberFixtures.FEMALE_70;
import static com.votogether.test.fixtures.MemberFixtures.FEMALE_80;
import static com.votogether.test.fixtures.MemberFixtures.MALE_10;
import static com.votogether.test.fixtures.MemberFixtures.MALE_20;
import static com.votogether.test.fixtures.MemberFixtures.MALE_30;
import static com.votogether.test.fixtures.MemberFixtures.MALE_60;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatNoException;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.votogether.domain.category.entity.Category;
import com.votogether.domain.category.repository.CategoryRepository;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.vo.Gender;
import com.votogether.domain.member.entity.vo.SocialType;
import com.votogether.domain.member.repository.MemberCategoryRepository;
import com.votogether.domain.member.repository.MemberRepository;
import com.votogether.domain.post.dto.request.comment.CommentCreateRequest;
import com.votogether.domain.post.dto.request.post.PostCreateRequest;
import com.votogether.domain.post.dto.request.post.PostOptionCreateRequest;
import com.votogether.domain.post.dto.request.post.PostOptionUpdateRequest;
import com.votogether.domain.post.dto.request.post.PostUpdateRequest;
import com.votogether.domain.post.dto.response.post.CategoryResponse;
import com.votogether.domain.post.dto.response.post.PostDetailResponse;
import com.votogether.domain.post.dto.response.post.PostOptionDetailResponse;
import com.votogether.domain.post.dto.response.post.PostResponse;
import com.votogether.domain.post.dto.response.post.WriterResponse;
import com.votogether.domain.post.dto.response.vote.VoteDetailResponse;
import com.votogether.domain.post.dto.response.vote.VoteOptionStatisticsResponse;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostBody;
import com.votogether.domain.post.entity.PostCategory;
import com.votogether.domain.post.entity.PostContentImage;
import com.votogether.domain.post.entity.PostOption;
import com.votogether.domain.post.entity.PostOptions;
import com.votogether.domain.post.entity.comment.Comment;
import com.votogether.domain.post.entity.vo.PostClosingType;
import com.votogether.domain.post.entity.vo.PostSortType;
import com.votogether.domain.post.exception.PostExceptionType;
import com.votogether.domain.post.repository.CommentRepository;
import com.votogether.domain.post.repository.PostCategoryRepository;
import com.votogether.domain.post.repository.PostContentImageRepository;
import com.votogether.domain.post.repository.PostOptionRepository;
import com.votogether.domain.post.repository.PostRepository;
import com.votogether.domain.vote.entity.Vote;
import com.votogether.domain.vote.repository.VoteRepository;
import com.votogether.domain.vote.service.VoteService;
import com.votogether.global.exception.BadRequestException;
import com.votogether.global.exception.NotFoundException;
import com.votogether.test.annotation.ServiceTest;
import com.votogether.test.fixtures.CategoryFixtures;
import com.votogether.test.fixtures.MemberFixtures;
import com.votogether.test.persister.MemberTestPersister;
import com.votogether.test.persister.PostOptionTestPersister;
import com.votogether.test.persister.PostTestPersister;
import com.votogether.test.persister.VoteTestPersister;
import jakarta.persistence.EntityManager;
import java.io.FileInputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
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

    @Autowired
    PostCategoryRepository postCategoryRepository;

    @Autowired
    PostContentImageRepository postContentImageRepository;

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    PostCommentService postCommentService;

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
                    .hasMessage("게시글이 존재하지 않습니다.");
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
                    .hasMessage("게시글 작성자가 아닙니다.");
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
                    .hasMessage("게시글이 존재하지 않습니다.");
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
                    .hasMessage("게시글 투표 옵션이 존재하지 않습니다.");
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
                    .hasMessage("게시글의 투표 옵션이 아닙니다.");
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
                    .hasMessage("게시글 작성자가 아닙니다.");
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
        LocalDateTime oldDeadline = LocalDateTime.now().plusDays(2);
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
                .hasMessage("게시글 작성자가 아닙니다.");
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
                .hasMessage("게시글이 마감되었습니다.");
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
        List<PostResponse> responses = postService.getAllPostBySortTypeAndClosingTypeAndCategoryId(
                0,
                PostClosingType.PROGRESS,
                PostSortType.HOT,
                null,
                memberToAllPostVote
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
            PostOption postOption = postOptionTestPersister.builder().sequence(j + 1).post(closedPost).save();
            for (int k = 0; k < 4; k++) {
                voteTestPersister.builder().member(voters.get(k)).postOption(postOption).save();
            }
        }

        Post notClosedPost = postTestPersister.builder()
                .writer(writer)
                .deadline(LocalDateTime.of(3022, 12, 25, 0, 0))
                .save();

        for (int j = 0; j < 2; j++) {
            PostOption postOption = postOptionTestPersister.builder().sequence(j + 1).post(notClosedPost).save();
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
    @DisplayName("한 게시글의 상세를 조회할 시, 작성자면 투표 결과를 알 수 있다.")
    void getPostByWriter() throws IOException {
        Category category1 = categoryRepository.save(CategoryFixtures.DEVELOP.get());
        Category category2 = categoryRepository.save(CategoryFixtures.FOOD.get());
        Member writer = memberRepository.save(MemberFixtures.MALE_20.get());

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

        Long savedPostId = postService.save(postCreateRequest, writer, List.of(), List.of(file1, file2));

        // when
        PostDetailResponse response = postService.getPostById(savedPostId, writer);

        // then
        List<CategoryResponse> categories = response.categories();
        WriterResponse writerResponse = response.writer();
        VoteDetailResponse voteDetailResponse = response.voteInfo();
        List<PostOptionDetailResponse> options = voteDetailResponse.options();

        assertAll(
                () -> assertThat(response.postId()).isEqualTo(savedPostId),
                () -> assertThat(response.title()).isEqualTo("title"),
                () -> assertThat(response.content()).isEqualTo("content"),
                () -> assertThat(categories).hasSize(2),
                () -> assertThat(categories.get(0).name()).isEqualTo("개발"),
                () -> assertThat(writerResponse.id()).isEqualTo(writer.getId()),
                () -> assertThat(writerResponse.nickname()).isEqualTo("user7"),
                () -> assertThat(voteDetailResponse.totalVoteCount()).isZero(),
                () -> assertThat(options).hasSize(2),
                () -> assertThat(options.get(0).imageUrl()).contains("test1.png")
        );
    }

    @Test
    @DisplayName("한 게시글의 상세를 조회할 시, 해당 게시글의 투표자면 결과를 알 수 있다.")
    void getPostByVoter() throws IOException {
        Category category1 = categoryRepository.save(CategoryFixtures.DEVELOP.get());
        Category category2 = categoryRepository.save(CategoryFixtures.FOOD.get());
        Member voter = memberRepository.save(MemberFixtures.MALE_20.get());
        Member writer = memberRepository.save(MemberFixtures.FEMALE_30.get());

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

        Long savedPostId = postService.save(postCreateRequest, writer, List.of(), List.of(file1, file2));
        Post post = postRepository.findById(savedPostId).get();
        PostOptions postOptions = post.getPostOptions();
        PostOption postOption = postOptions.getPostOptions().get(0);
        voteService.vote(voter, savedPostId, postOption.getId());

        entityManager.clear();

        // when
        PostDetailResponse response = postService.getPostById(savedPostId, voter);

        // then
        List<CategoryResponse> categories = response.categories();
        WriterResponse writerResponse = response.writer();
        VoteDetailResponse voteDetailResponse = response.voteInfo();
        List<PostOptionDetailResponse> options = voteDetailResponse.options();

        assertAll(
                () -> assertThat(response.postId()).isEqualTo(savedPostId),
                () -> assertThat(response.title()).isEqualTo("title"),
                () -> assertThat(response.content()).isEqualTo("content"),
                () -> assertThat(categories).hasSize(2),
                () -> assertThat(categories.get(0).name()).isEqualTo("개발"),
                () -> assertThat(writerResponse.id()).isEqualTo(writer.getId()),
                () -> assertThat(writerResponse.nickname()).isEqualTo("user10"),
                () -> assertThat(voteDetailResponse.totalVoteCount()).isOne(),
                () -> assertThat(options).hasSize(2),
                () -> assertThat(options.get(0).imageUrl()).contains("test1.png")
        );
    }

    @Test
    @DisplayName("한 게시글의 상세를 조회할 시, 마감된 게시글이면 투표 결과를 알 수 있다.")
    void getClosedPost() throws IOException {
        Category category1 = categoryRepository.save(CategoryFixtures.DEVELOP.get());
        Category category2 = categoryRepository.save(CategoryFixtures.FOOD.get());
        Member member = memberRepository.save(MemberFixtures.FEMALE_10.get());
        Member writer = memberRepository.save(MemberFixtures.MALE_20.get());

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

        LocalDateTime deadline = LocalDateTime.now();

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

        Long savedPostId = postService.save(postCreateRequest, writer, List.of(), List.of(file1, file2));

        // when
        PostDetailResponse response = postService.getPostById(savedPostId, member);

        // then
        List<CategoryResponse> categories = response.categories();
        WriterResponse writerResponse = response.writer();
        VoteDetailResponse voteDetailResponse = response.voteInfo();
        List<PostOptionDetailResponse> options = voteDetailResponse.options();

        assertAll(
                () -> assertThat(response.postId()).isEqualTo(savedPostId),
                () -> assertThat(response.title()).isEqualTo("title"),
                () -> assertThat(response.content()).isEqualTo("content"),
                () -> assertThat(categories).hasSize(2),
                () -> assertThat(categories.get(0).name()).isEqualTo("개발"),
                () -> assertThat(writerResponse.id()).isEqualTo(writer.getId()),
                () -> assertThat(writerResponse.nickname()).isEqualTo("user7"),
                () -> assertThat(voteDetailResponse.totalVoteCount()).isZero(),
                () -> assertThat(options).hasSize(2),
                () -> assertThat(options.get(0).imageUrl()).contains("test1.png")
        );
    }

    @Test
    @DisplayName("한 게시글의 상세를 조회할 시, 작성자, 투표자, 마감된 게시글이 전부 아니면 투표 결과를 알 수 없다.")
    void getPostInvisibleResult() throws IOException {
        Category category1 = categoryRepository.save(CategoryFixtures.DEVELOP.get());
        Category category2 = categoryRepository.save(CategoryFixtures.FOOD.get());
        Member member = memberRepository.save(MemberFixtures.FEMALE_10.get());
        Member writer = memberRepository.save(MemberFixtures.MALE_20.get());

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

        Long savedPostId = postService.save(postCreateRequest, writer, List.of(), List.of(file1, file2));

        // when
        PostDetailResponse response = postService.getPostById(savedPostId, member);

        // then
        List<CategoryResponse> categories = response.categories();
        WriterResponse writerResponse = response.writer();
        VoteDetailResponse voteDetailResponse = response.voteInfo();
        List<PostOptionDetailResponse> options = voteDetailResponse.options();

        assertAll(
                () -> assertThat(response.postId()).isEqualTo(savedPostId),
                () -> assertThat(response.title()).isEqualTo("title"),
                () -> assertThat(response.content()).isEqualTo("content"),
                () -> assertThat(categories).hasSize(2),
                () -> assertThat(categories.get(0).name()).isEqualTo("개발"),
                () -> assertThat(writerResponse.id()).isEqualTo(writer.getId()),
                () -> assertThat(writerResponse.nickname()).isEqualTo("user7"),
                () -> assertThat(voteDetailResponse.totalVoteCount()).isEqualTo(-1),
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

    @Test
    void delete() throws IOException {
        // given
        Category category1 = categoryRepository.save(CategoryFixtures.DEVELOP.get());
        Category category2 = categoryRepository.save(CategoryFixtures.FOOD.get());
        Member writer = memberRepository.save(MemberFixtures.MALE_20.get());

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

        Long savedPostId = postService.save(postCreateRequest, writer, List.of(file3), List.of(file1, file2));
        final Post post = postRepository.findById(savedPostId).get();
        final List<PostOption> postOptions = post.getPostOptions().getPostOptions();

        Member voter = MALE_30.get();
        memberRepository.save(voter);
        PostOption perPostOption = postOptions.get(0);
        voteService.vote(voter, savedPostId, perPostOption.getId());

        CommentCreateRequest commentCreateRequest = new CommentCreateRequest("hello");
        postCommentService.createComment(post.getId(), commentCreateRequest, voter);
        entityManager.flush();
        entityManager.clear();

        final List<PostCategory> postCategories = post.getPostCategories().getPostCategories();
        final PostBody postBody = post.getPostBody();
        final PostContentImage postContentImage = postBody.getPostContentImages().getContentImages().get(0);
        final List<Vote> votes = postOptions.stream()
                .map(PostOption::getVotes)
                .flatMap(Collection::stream)
                .toList();
        final List<Comment> comments = post.getComments();

        // when, then
        assertAll(
                () -> assertThatNoException().isThrownBy(() -> postService.delete(savedPostId)),
                () -> assertThat(postCategoryRepository.findById(postCategories.get(0).getId())).isNotPresent(),
                () -> assertThat(postContentImageRepository.findById(postContentImage.getId())).isNotPresent(),
                () -> assertThat(postOptionRepository.findById(postOptions.get(0).getId())).isNotPresent(),
                () -> assertThat(voteRepository.findById(votes.get(0).getId())).isNotPresent(),
                () -> assertThat(commentRepository.findById(comments.get(0).getId())).isNotPresent()
        );
    }

    @Test
    @DisplayName("게시글을 삭제할 시, 투표가 20개 이상 진행된 게시글이면 예외를 던진다.")
    void throwExceptionDeleteVoteOverTwenty() throws IOException {
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

        Long savedPostId = postService.save(postCreateRequest, member, List.of(file3), List.of(file1, file2));
        final Post post = postRepository.findById(savedPostId).get();

        for (int voteCount = 0; voteCount < 20; voteCount++) {
            Member memberToVote = Member.builder()
                    .nickname("Abel" + voteCount)
                    .gender(Gender.MALE)
                    .birthYear(2000)
                    .socialType(SocialType.KAKAO)
                    .socialId("Abel" + voteCount)
                    .build();

            memberRepository.save(memberToVote);

            final List<PostOption> postOptions = post.getPostOptions().getPostOptions();
            PostOption perPostOption = postOptions.get(voteCount % postOptions.size());
            voteService.vote(memberToVote, savedPostId, perPostOption.getId());
        }

        entityManager.clear();

        // when, then
        assertThatThrownBy(() -> postService.delete(savedPostId))
                .isInstanceOf(BadRequestException.class)
                .hasMessage(PostExceptionType.FAIL_DELETE_EXCEED_TWENTY_VOTE_COUNT.getMessage());
    }

    @Test
    @DisplayName("게시글을 수정한다")
    void update() throws IOException {
        // given
        Category category1 = categoryRepository.save(CategoryFixtures.DEVELOP.get());
        Member writer = memberRepository.save(MemberFixtures.MALE_20.get());

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
                .categoryIds(List.of(category1.getId()))
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

        Long savedPostId = postService.save(postCreateRequest, writer, List.of(file3), List.of(file1, file2));

        Category category2 = categoryRepository.save(CategoryFixtures.FOOD.get());
        MockMultipartFile file4 = new MockMultipartFile(
                "image4",
                "test4.png",
                "image/png",
                new FileInputStream("src/test/resources/images/testImage1.PNG")
        );
        MockMultipartFile file5 = new MockMultipartFile(
                "image5",
                "test5.png",
                "image/png",
                new FileInputStream("src/test/resources/images/testImage2.PNG")
        );

        MockMultipartFile file6 = new MockMultipartFile(
                "image6",
                "test6.png",
                "image/png",
                new FileInputStream("src/test/resources/images/testImage3.PNG")
        );

        PostUpdateRequest postUpdateRequest = PostUpdateRequest.builder()
                .categoryIds(List.of(category2.getId()))
                .title("title2")
                .content("content2")
                .postOptions(List.of(
                        PostOptionUpdateRequest.builder()
                                .content("option3")
                                .build(),
                        PostOptionUpdateRequest.builder()
                                .content("option4")
                                .build()
                ))
                .deadline(LocalDateTime.now().plusDays(1))
                .build();

        // when
        postService.update(
                savedPostId,
                postUpdateRequest,
                writer,
                List.of(file4),
                List.of(file5, file6)
        );

        // then
        final PostDetailResponse postDetailResponse = postService.getPostById(savedPostId, writer);
        final List<PostOptionDetailResponse> options = postDetailResponse.voteInfo().options();
        final List<CategoryResponse> categories = postDetailResponse.categories();
        assertAll(
                () -> assertThat(postDetailResponse.title()).isEqualTo("title2"),
                () -> assertThat(postDetailResponse.content()).isEqualTo("content2"),
                () -> assertThat(postDetailResponse.imageUrl()).contains("test4.png"),
                () -> assertThat(options.get(0).content()).isEqualTo("option3"),
                () -> assertThat(options.get(1).content()).isEqualTo("option4"),
                () -> assertThat(options.get(0).imageUrl()).contains("test5.png"),
                () -> assertThat(options.get(1).imageUrl()).contains("test6.png"),
                () -> assertThat(categories.get(0).name()).isEqualTo("음식")
        );
    }

    @Test
    @DisplayName("게시글 수정 시, 작성자가 아니면 예외를 던진다.")
    void throwExceptionUpdateNotWriter() throws IOException {
        // given
        Category category1 = categoryRepository.save(CategoryFixtures.DEVELOP.get());
        Member member = memberRepository.save(MemberFixtures.MALE_30.get());
        Member writer = memberRepository.save(MemberFixtures.MALE_20.get());

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
                .categoryIds(List.of(category1.getId()))
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

        Long savedPostId = postService.save(postCreateRequest, writer, List.of(file3), List.of(file1, file2));

        Category category2 = categoryRepository.save(CategoryFixtures.FOOD.get());
        MockMultipartFile file4 = new MockMultipartFile(
                "image4",
                "test4.png",
                "image/png",
                new FileInputStream("src/test/resources/images/testImage1.PNG")
        );
        MockMultipartFile file5 = new MockMultipartFile(
                "image5",
                "test5.png",
                "image/png",
                new FileInputStream("src/test/resources/images/testImage2.PNG")
        );

        MockMultipartFile file6 = new MockMultipartFile(
                "image6",
                "test6.png",
                "image/png",
                new FileInputStream("src/test/resources/images/testImage3.PNG")
        );

        PostUpdateRequest postUpdateRequest = PostUpdateRequest.builder()
                .categoryIds(List.of(category2.getId()))
                .title("title2")
                .content("content2")
                .postOptions(List.of(
                        PostOptionUpdateRequest.builder()
                                .content("option3")
                                .build(),
                        PostOptionUpdateRequest.builder()
                                .content("option4")
                                .build()
                ))
                .deadline(LocalDateTime.now().plusDays(1))
                .build();

        // when, then
        assertThatThrownBy(() -> postService.update(
                savedPostId,
                postUpdateRequest,
                member,
                List.of(file4),
                List.of(file5, file6)
        ))
                .isInstanceOf(BadRequestException.class)
                .hasMessage(PostExceptionType.POST_NOT_WRITER.getMessage());
    }

    @Test
    @DisplayName("게시글 수정 시, 마감된 게시글이면 예외를 던진다.")
    void throwExceptionUpdateClosedPost() throws IOException {
        // given
        Category category1 = categoryRepository.save(CategoryFixtures.DEVELOP.get());
        Member writer = memberRepository.save(MemberFixtures.MALE_20.get());

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
                .categoryIds(List.of(category1.getId()))
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
                .deadline(LocalDateTime.now())
                .build();

        Long savedPostId = postService.save(postCreateRequest, writer, List.of(file3), List.of(file1, file2));

        Category category2 = categoryRepository.save(CategoryFixtures.FOOD.get());
        MockMultipartFile file4 = new MockMultipartFile(
                "image4",
                "test4.png",
                "image/png",
                new FileInputStream("src/test/resources/images/testImage1.PNG")
        );
        MockMultipartFile file5 = new MockMultipartFile(
                "image5",
                "test5.png",
                "image/png",
                new FileInputStream("src/test/resources/images/testImage2.PNG")
        );

        MockMultipartFile file6 = new MockMultipartFile(
                "image6",
                "test6.png",
                "image/png",
                new FileInputStream("src/test/resources/images/testImage3.PNG")
        );

        PostUpdateRequest postUpdateRequest = PostUpdateRequest.builder()
                .categoryIds(List.of(category2.getId()))
                .title("title2")
                .content("content2")
                .postOptions(List.of(
                        PostOptionUpdateRequest.builder()
                                .content("option3")
                                .build(),
                        PostOptionUpdateRequest.builder()
                                .content("option4")
                                .build()
                ))
                .deadline(LocalDateTime.now().plusDays(1))
                .build();

        // when, then
        assertThatThrownBy(() -> postService.update(
                savedPostId,
                postUpdateRequest,
                writer,
                List.of(file4),
                List.of(file5, file6)
        ))
                .isInstanceOf(BadRequestException.class)
                .hasMessage(PostExceptionType.POST_CLOSED.getMessage());
    }

    @Test
    @DisplayName("게시글 수정 시, 수정할 마감 기한이 생성 날짜보다 3일 초과면 예외를 던진다.")
    void throwExceptionUpdateDeadlineOver() throws IOException {
        // given
        Category category1 = categoryRepository.save(CategoryFixtures.DEVELOP.get());
        Member writer = memberRepository.save(MemberFixtures.MALE_20.get());

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
                .categoryIds(List.of(category1.getId()))
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
                .deadline(LocalDateTime.now().plusDays(3))
                .build();

        Long savedPostId = postService.save(postCreateRequest, writer, List.of(file3), List.of(file1, file2));

        Category category2 = categoryRepository.save(CategoryFixtures.FOOD.get());
        MockMultipartFile file4 = new MockMultipartFile(
                "image4",
                "test4.png",
                "image/png",
                new FileInputStream("src/test/resources/images/testImage1.PNG")
        );
        MockMultipartFile file5 = new MockMultipartFile(
                "image5",
                "test5.png",
                "image/png",
                new FileInputStream("src/test/resources/images/testImage2.PNG")
        );

        MockMultipartFile file6 = new MockMultipartFile(
                "image6",
                "test6.png",
                "image/png",
                new FileInputStream("src/test/resources/images/testImage3.PNG")
        );

        PostUpdateRequest postUpdateRequest = PostUpdateRequest.builder()
                .categoryIds(List.of(category2.getId()))
                .title("title2")
                .content("content2")
                .postOptions(List.of(
                        PostOptionUpdateRequest.builder()
                                .content("option3")
                                .build(),
                        PostOptionUpdateRequest.builder()
                                .content("option4")
                                .build()
                ))
                .deadline(LocalDateTime.now().plusDays(4))
                .build();

        // when, then
        assertThatThrownBy(() -> postService.update(
                savedPostId,
                postUpdateRequest,
                writer,
                List.of(file4),
                List.of(file5, file6)
        ))
                .isInstanceOf(BadRequestException.class)
                .hasMessage(PostExceptionType.DEADLINE_EXCEED_THREE_DAYS.getMessage());
    }

    @Test
    @DisplayName("게시글을 수정할 시, 해당 게시글이 투표가 되어있으면 예외를 던진다.")
    void throwExceptionUpdateVotingProgress() throws IOException {
        // given
        Category category1 = categoryRepository.save(CategoryFixtures.DEVELOP.get());
        Member writer = memberRepository.save(MemberFixtures.MALE_20.get());

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
                .categoryIds(List.of(category1.getId()))
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

        Long savedPostId = postService.save(postCreateRequest, writer, List.of(file3), List.of(file1, file2));

        Member memberToVote = Member.builder()
                .nickname("Abel")
                .gender(Gender.MALE)
                .birthYear(2000)
                .socialType(SocialType.KAKAO)
                .socialId("Abel")
                .build();

        memberRepository.save(memberToVote);

        final Post post = postRepository.findById(savedPostId).get();
        final List<PostOption> postOptions = post.getPostOptions().getPostOptions();
        PostOption perPostOption = postOptions.get(0);
        voteService.vote(memberToVote, savedPostId, perPostOption.getId());
        entityManager.clear();

        Category category2 = categoryRepository.save(CategoryFixtures.FOOD.get());
        MockMultipartFile file4 = new MockMultipartFile(
                "image4",
                "test4.png",
                "image/png",
                new FileInputStream("src/test/resources/images/testImage1.PNG")
        );
        MockMultipartFile file5 = new MockMultipartFile(
                "image5",
                "test5.png",
                "image/png",
                new FileInputStream("src/test/resources/images/testImage2.PNG")
        );

        MockMultipartFile file6 = new MockMultipartFile(
                "image6",
                "test6.png",
                "image/png",
                new FileInputStream("src/test/resources/images/testImage3.PNG")
        );

        PostUpdateRequest postUpdateRequest = PostUpdateRequest.builder()
                .categoryIds(List.of(category2.getId()))
                .title("title2")
                .content("content2")
                .postOptions(List.of(
                        PostOptionUpdateRequest.builder()
                                .content("option3")
                                .build(),
                        PostOptionUpdateRequest.builder()
                                .content("option4")
                                .build()
                ))
                .deadline(LocalDateTime.now().plusDays(1))
                .build();

        // when, then
        assertThatThrownBy(() -> postService.update(
                savedPostId,
                postUpdateRequest,
                writer,
                List.of(file4),
                List.of(file5, file6)
        ))
                .isInstanceOf(BadRequestException.class)
                .hasMessage(PostExceptionType.FAIL_UPDATE_VOTED_POST.getMessage());
    }

    @Test
    @DisplayName("회원 본인이 작성한 게시글 목록을 가져온다.")
    void getPostsByWriter() {
        // given
        Member writer = memberTestPersister.builder().save();
        Post post = postTestPersister.builder().writer(writer).save();
        PostOption postOption = postOptionTestPersister.builder().post(post).sequence(1).save();
        PostOption postOption1 = postOptionTestPersister.builder().post(post).sequence(2).save();
        voteTestPersister.builder().postOption(postOption).save();
        voteTestPersister.builder().postOption(postOption).save();
        voteTestPersister.builder().postOption(postOption1).save();

        entityManager.flush();
        entityManager.clear();

        // when
        List<PostResponse> responses =
                postService.getPostsByWriter(0, PostClosingType.ALL, PostSortType.LATEST, null, writer);

        // then
        assertAll(
                () -> assertThat(responses).hasSize(1),
                () -> assertThat(responses.get(0).postId()).isEqualTo(post.getId()),
                () -> assertThat(responses.get(0).writer().id()).isEqualTo(writer.getId()),
                () -> assertThat(responses.get(0).voteInfo().totalVoteCount()).isEqualTo(3L)
        );
    }

    @Test
    @DisplayName("회원으로 키워드를 통해 게시글 목록을 검색한다.")
    void getPostsByKeyword() {
        Member member = memberRepository.save(MemberFixtures.MALE_20.get());
        Member member1 = memberRepository.save(MemberFixtures.MALE_30.get());

        Post openPost = postTestPersister.builder()
                .postBody(PostBody.builder().title("제목").content("키워요").build())
                .deadline(LocalDateTime.now().plusDays(3L))
                .save();
        Post openPost1 = postTestPersister.builder()
                .postBody(PostBody.builder().title("키워드").content("안녕").build())
                .deadline(LocalDateTime.now().plusDays(3L))
                .save();

        PostOption postOption = postOptionTestPersister.builder().post(openPost).save();
        PostOption postOption1 = postOptionTestPersister.builder().post(openPost1).save();
        voteTestPersister.builder().member(member).postOption(postOption).save();
        voteTestPersister.builder().member(member1).postOption(postOption1).save();

        entityManager.flush();
        entityManager.clear();

        // when
        List<PostResponse> responses = postService.searchPostsWithKeyword(
                "키워",
                0,
                PostClosingType.ALL,
                PostSortType.LATEST,
                null,
                member);

        // then
        assertAll(
                () -> assertThat(responses).hasSize(2),
                () -> assertThat(responses.get(0).postId()).isEqualTo(openPost1.getId()),
                () -> assertThat(responses.get(1).postId()).isEqualTo(openPost.getId()),
                () -> assertThat(hasKeywordInPostResponse(responses.get(0), "키워")).isTrue(),
                () -> assertThat(hasKeywordInPostResponse(responses.get(1), "키워")).isTrue(),
                () -> assertThat(responses.get(0).voteInfo().totalVoteCount()).isEqualTo(-1L),
                () -> assertThat(responses.get(1).voteInfo().totalVoteCount()).isEqualTo(1L)
        );
    }

    private boolean hasKeywordInPostResponse(PostResponse postResponse, String keyword) {
        return postResponse.title().contains(keyword) || postResponse.content().contains(keyword);
    }

    @Test
    @DisplayName("비회원으로 키워드를 통해 게시글 목록을 검색한다.")
    void getPostsByKeywordForGuest() {
        Member member = memberRepository.save(MemberFixtures.MALE_20.get());

        Post closedPost = postTestPersister.builder()
                .postBody(PostBody.builder().title("제목").content("키워요").build())
                .deadline(LocalDateTime.now().minusDays(3L))
                .save();
        Post openPost1 = postTestPersister.builder()
                .postBody(PostBody.builder().title("키워드").content("안녕").build())
                .deadline(LocalDateTime.now().plusDays(3L))
                .save();

        PostOption postOption = postOptionTestPersister.builder().post(closedPost).save();
        PostOption postOption1 = postOptionTestPersister.builder().post(openPost1).save();
        voteTestPersister.builder().member(member).postOption(postOption).save();
        voteTestPersister.builder().member(member).postOption(postOption1).save();

        entityManager.flush();
        entityManager.clear();

        // when
        List<PostResponse> responses = postService.searchPostsWithKeywordForGuest(
                "키워",
                0,
                PostClosingType.ALL,
                PostSortType.LATEST,
                null
        );

        // then
        assertAll(
                () -> assertThat(responses).hasSize(2),
                () -> assertThat(responses.get(0).postId()).isEqualTo(openPost1.getId()),
                () -> assertThat(responses.get(1).postId()).isEqualTo(closedPost.getId()),
                () -> assertThat(hasKeywordInPostResponse(responses.get(0), "키워")).isTrue(),
                () -> assertThat(hasKeywordInPostResponse(responses.get(1), "키워")).isTrue(),
                () -> assertThat(responses.get(0).voteInfo().totalVoteCount()).isEqualTo(-1L),
                () -> assertThat(responses.get(1).voteInfo().totalVoteCount()).isEqualTo(1L)
        );
    }

}
