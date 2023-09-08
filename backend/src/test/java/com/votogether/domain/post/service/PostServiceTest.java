package com.votogether.domain.post.service;

import static com.votogether.test.fixtures.MemberFixtures.MALE_30;
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
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostBody;
import com.votogether.domain.post.entity.PostCategory;
import com.votogether.domain.post.entity.PostContentImage;
import com.votogether.domain.post.entity.PostOption;
import com.votogether.domain.post.entity.comment.Comment;
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
import com.votogether.test.annotation.ServiceTest;
import com.votogether.test.fixtures.CategoryFixtures;
import com.votogether.test.fixtures.MemberFixtures;
import com.votogether.test.persister.MemberTestPersister;
import com.votogether.test.persister.PostTestPersister;
import com.votogether.test.persister.VoteTestPersister;
import jakarta.persistence.EntityManager;
import java.io.FileInputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mock.web.MockMultipartFile;

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

    @Test
    @DisplayName("해당 게시글을 조기 마감 합니다")
    void postClosedEarlyById() {
        // given
        Member writer = memberRepository.save(MemberFixtures.MALE_30.get());
        LocalDateTime oldDeadline = LocalDateTime.now().plusDays(2);
        Post post = postRepository.save(
                Post.builder()
                        .writer(writer)
                        .title("title")
                        .content("content")
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
                        .title("title")
                        .content("content")
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
                        .title("title")
                        .content("content")
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

}
