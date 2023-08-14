package com.votogether.domain.post.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.votogether.domain.category.entity.Category;
import com.votogether.domain.category.repository.CategoryRepository;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.vo.Gender;
import com.votogether.domain.member.entity.vo.SocialType;
import com.votogether.domain.member.repository.MemberRepository;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostBody;
import com.votogether.domain.post.entity.PostCategory;
import com.votogether.domain.post.entity.PostOption;
import com.votogether.domain.post.entity.vo.PostClosingType;
import com.votogether.domain.post.entity.vo.PostSortType;
import com.votogether.domain.vote.entity.Vote;
import com.votogether.domain.vote.repository.VoteRepository;
import com.votogether.test.annotation.RepositoryTest;
import com.votogether.test.fixtures.MemberFixtures;
import com.votogether.test.persister.MemberTestPersister;
import com.votogether.test.persister.PostOptionTestPersister;
import com.votogether.test.persister.PostTestPersister;
import com.votogether.test.persister.VoteTestPersister;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

@RepositoryTest
class PostRepositoryTest {

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    PostRepository postRepository;

    @Autowired
    PostOptionRepository postOptionRepository;

    @Autowired
    PostCategoryRepository postCategoryRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    VoteRepository voteRepository;

    @Autowired
    MemberTestPersister memberTestPersister;

    @Autowired
    PostTestPersister postTestPersister;

    @Autowired
    PostOptionTestPersister postOptionTestPersister;

    @Autowired
    VoteTestPersister voteTestPersister;

    @Test
    @DisplayName("Post를 저장한다")
    void save() {
        // given
        final PostBody postBody = PostBody.builder()
                .title("title")
                .content("content")
                .build();

        final Member member = Member.builder()
                .gender(Gender.MALE)
                .socialType(SocialType.KAKAO)
                .nickname("user1")
                .birthYear(2000)
                .socialId("kakao@gmail.com")
                .build();

        final Post post = Post.builder()
                .writer(member)
                .postBody(postBody)
                .deadline(LocalDateTime.of(2100, 7, 12, 0, 0))
                .build();

        memberRepository.save(member);

        // when
        final Post savedPost = postRepository.save(post);

        // then
        assertThat(savedPost).isNotNull();
    }

    @Test
    @DisplayName("해당 멤버가 작성한 글의 개수를 확인한다.")
    void countByMember() {
        // given
        Member member = Member.builder()
                .nickname("user1")
                .gender(Gender.MALE)
                .birthYear(2000)
                .socialType(SocialType.KAKAO)
                .socialId("kakao@gmail.com")
                .build();

        PostBody postBody1 = PostBody.builder()
                .title("title1")
                .content("content1")
                .build();

        PostBody postBody2 = PostBody.builder()
                .title("title2")
                .content("content2")
                .build();

        Post post1 = Post.builder()
                .writer(member)
                .postBody(postBody1)
                .deadline(LocalDateTime.of(2100, 7, 12, 0, 0))
                .build();

        Post post2 = Post.builder()
                .writer(member)
                .postBody(postBody2)
                .deadline(LocalDateTime.of(2100, 7, 12, 0, 0))
                .build();

        memberRepository.save(member);
        postRepository.save(post1);
        postRepository.save(post2);

        // when
        int numberOfPosts = postRepository.countByWriter(member);

        // then
        assertThat(numberOfPosts).isEqualTo(2);
    }

    @Nested
    @DisplayName("마감 여부와 정렬 기준으로 페이징 처리하여 게시글 목록을 조회한다.")
    class FindAllByClosingTypeAndSortType {

        private List<Member> members;
        private List<Post> posts;
        private List<Category> categories;

        @BeforeEach
        void setUp() {
            members = new ArrayList<>();
            posts = new ArrayList<>();
            categories = new ArrayList<>();

            for (int i = 0; i < 11; i++) {
                members.add(memberTestPersister.builder().save());
            }

            Category categoryA = Category.builder()
                    .name("개발")
                    .build();

            Category categoryB = Category.builder()
                    .name("연애")
                    .build();

            categories.add(categoryRepository.save(categoryA));
            categories.add(categoryRepository.save(categoryB));

            for (int i = 2; i > 0; i--) {
                Post closedPost = postTestPersister.builder()
                        .writer(members.get(members.size() - 1))
                        .deadline(LocalDateTime.of(2022, 12, 25, 0, 0))
                        .save();
                Post notClosedPost = postTestPersister.builder()
                        .writer(members.get(members.size() - 1))
                        .deadline(LocalDateTime.of(3022, 12, 25, 0, 0))
                        .save();

                posts.add(closedPost);
                posts.add(notClosedPost);

                generatePostCategory(closedPost, categories.get(0));
                generatePostCategory(notClosedPost, categories.get(0));

                generatePostOptionAndVote(closedPost, i + 5);
                generatePostOptionAndVote(notClosedPost, i + 7);
            }
        }

        private void generatePostCategory(Post post, Category category) {
            PostCategory postCategory = PostCategory.builder()
                    .post(post)
                    .category(category)
                    .build();
            postCategoryRepository.save(postCategory);
        }

        private void generatePostOptionAndVote(Post post, int voteCount) {
            for (int j = 0; j < 5; j++) {
                PostOption postOption = postOptionTestPersister.builder().sequence(j + 1).post(post).save();
                for (int k = 0; k < voteCount; k++) {
                    voteTestPersister.builder().member(members.get(k)).postOption(postOption).save();
                }
            }
        }

        @Test
        @DisplayName("마감 여부와 상관없이 게시글 목록을 최신순으로 조회한다.")
        void getAllPostsOrderByLatest() {
            // given
            Pageable pageable = PageRequest.of(0, 2);

            // when
            List<Post> result = postRepository.findAllByClosingTypeAndSortTypeAndCategoryId(
                    PostClosingType.ALL,
                    PostSortType.LATEST,
                    null,
                    pageable
            );

            // then
            assertThat(result).containsExactly(posts.get(3), posts.get(2));
        }

        @Test
        @DisplayName("마감 여부와 상관없이 게시글 목록을 인기순으로 조회한다.")
        void getAllPostsOrderByHot() {
            // given
            Pageable pageable = PageRequest.of(0, 2);

            // when
            List<Post> result = postRepository.findAllByClosingTypeAndSortTypeAndCategoryId(
                    PostClosingType.ALL,
                    PostSortType.HOT,
                    null,
                    pageable
            );

            // then
            assertThat(result).containsExactly(posts.get(1), posts.get(3));
        }

        @Test
        @DisplayName("진행중인 게시글 목록을 최신순으로 조회한다.")
        void getProgressPostsOrderByLatest() {
            // given
            Pageable pageable = PageRequest.of(0, 2);

            // when
            List<Post> result = postRepository.findAllByClosingTypeAndSortTypeAndCategoryId(
                    PostClosingType.PROGRESS,
                    PostSortType.LATEST,
                    null,
                    pageable
            );

            // then
            assertThat(result).containsExactly(posts.get(3), posts.get(1));
        }

        @Test
        @DisplayName("진행중인 게시글 목록을 인기순으로 조회한다.")
        void getProgressPostsOrderByHot() {
            // given
            Pageable pageable = PageRequest.of(0, 2);

            // when
            List<Post> result = postRepository.findAllByClosingTypeAndSortTypeAndCategoryId(
                    PostClosingType.PROGRESS,
                    PostSortType.HOT,
                    null,
                    pageable
            );

            // then
            assertThat(result).containsExactly(posts.get(1), posts.get(3));
        }

        @Test
        @DisplayName("마감된 게시글 목록을 최신순으로 조회한다.")
        void getClosedPostsOrderByLatest() {
            // given
            Pageable pageable = PageRequest.of(0, 2);

            // when
            List<Post> result = postRepository.findAllByClosingTypeAndSortTypeAndCategoryId(
                    PostClosingType.CLOSED,
                    PostSortType.LATEST,
                    null,
                    pageable
            );

            // then
            assertThat(result).containsExactly(posts.get(2), posts.get(0));
        }

        @Test
        @DisplayName("마감된 게시글 목록을 인기순으로 조회한다.")
        void getClosedPostsOrderByHot() {
            // given
            Pageable pageable = PageRequest.of(0, 2);

            // when
            List<Post> result = postRepository.findAllByClosingTypeAndSortTypeAndCategoryId(
                    PostClosingType.CLOSED,
                    PostSortType.HOT,
                    null,
                    pageable
            );

            // then
            assertThat(result).containsExactly(posts.get(0), posts.get(2));
        }

        @Test
        @DisplayName("특정 카테고리의 진행중인 게시글을 인기순으로 조회한다.")
        void getClosedPostsOrderByHotWithCategory() {
            // given
            Pageable pageable = PageRequest.of(0, 5);

            // when
            List<Post> result = postRepository.findAllByClosingTypeAndSortTypeAndCategoryId(
                    PostClosingType.PROGRESS,
                    PostSortType.HOT,
                    categories.get(0).getId(),
                    pageable
            );

            // then
            assertThat(result).containsExactly(posts.get(1), posts.get(3));
        }

    }

    @Nested
    @DisplayName("회원이 투표한 게시글 목록을 조회한다.")
    class FindPostsVotedByMember {

        @Test
        @DisplayName("마감된 게시글 목록을 최신순으로 가져온다.")
        void findClosedPostsVotedByMember() {
            // given
            Member writer = memberRepository.save(MemberFixtures.MALE_20.get());
            Member member = memberRepository.save(MemberFixtures.MALE_10.get());

            Post openPost = postRepository.save(
                    Post.builder()
                            .writer(writer)
                            .postBody(PostBody.builder().title("title").content("content").build())
                            .deadline(LocalDateTime.of(3000, 7, 12, 0, 0))
                            .build()
            );
            PostOption postOption = postOptionRepository.save(
                    PostOption.builder()
                            .post(openPost)
                            .sequence(1)
                            .content("치킨")
                            .build()
            );

            Post closedPost = postRepository.save(
                    Post.builder()
                            .writer(writer)
                            .postBody(PostBody.builder().title("title").content("content").build())
                            .deadline(LocalDateTime.of(1000, 7, 12, 0, 0))
                            .build());

            PostOption postOption1 = postOptionRepository.save(
                    PostOption.builder()
                            .post(closedPost)
                            .sequence(1)
                            .content("치킨")
                            .build()
            );

            Post closedPost1 = postRepository.save(
                    Post.builder()
                            .writer(writer)
                            .postBody(PostBody.builder().title("title").content("content").build())
                            .deadline(LocalDateTime.of(1001, 7, 12, 0, 0))
                            .build()
            );
            PostOption postOption2 = postOptionRepository.save(
                    PostOption.builder()
                            .post(closedPost1)
                            .sequence(1)
                            .content("치킨")
                            .build()
            );

            voteRepository.save(Vote.builder().member(member).postOption(postOption).build());
            voteRepository.save(Vote.builder().member(member).postOption(postOption1).build());
            voteRepository.save(Vote.builder().member(member).postOption(postOption2).build());

            // when
            PageRequest pageRequest = PageRequest.of(0, 10, PostSortType.LATEST.getVoteBaseSort());
            Slice<Post> posts = postRepository.findClosedPostsVotedByMember(member, pageRequest);

            // then
            assertAll(
                    () -> assertThat(posts).hasSize(2),
                    () -> assertThat(posts.getContent().get(0)).usingRecursiveComparison().isEqualTo(closedPost1)
            );
        }

        @Test
        @DisplayName("마감되지 않은 게시글 목록을 투표순으로 가져온다.")
        void findOpenPostsVotedByMember() {
            // given
            Member writer = memberRepository.save(MemberFixtures.MALE_20.get());
            Member member = memberRepository.save(MemberFixtures.MALE_10.get());
            Member member1 = memberRepository.save(MemberFixtures.MALE_60.get());

            Post openPost = postRepository.save(
                    Post.builder()
                            .writer(writer)
                            .postBody(PostBody.builder().title("title").content("content").build())
                            .deadline(LocalDateTime.of(3000, 7, 12, 0, 0))
                            .build()
            );
            PostOption postOption = postOptionRepository.save(
                    PostOption.builder()
                            .post(openPost)
                            .sequence(1)
                            .content("치킨")
                            .build()
            );

            Post openPost1 = postRepository.save(
                    Post.builder()
                            .writer(writer)
                            .postBody(PostBody.builder().title("title").content("content").build())
                            .deadline(LocalDateTime.of(3001, 7, 12, 0, 0))
                            .build()
            );
            PostOption postOption1 = postOptionRepository.save(
                    PostOption.builder()
                            .post(openPost1)
                            .sequence(1)
                            .content("치킨")
                            .build()
            );

            Post closedPost = postRepository.save(
                    Post.builder()
                            .writer(writer)
                            .postBody(PostBody.builder().title("title").content("content").build())
                            .deadline(LocalDateTime.of(1000, 7, 12, 0, 0))
                            .build()
            );
            PostOption postOption2 = postOptionRepository.save(
                    PostOption.builder()
                            .post(closedPost)
                            .sequence(1)
                            .content("치킨")
                            .build()
            );

            voteRepository.save(Vote.builder().member(member).postOption(postOption).build());
            voteRepository.save(Vote.builder().member(member).postOption(postOption1).build());
            voteRepository.save(Vote.builder().member(member1).postOption(postOption1).build());
            voteRepository.save(Vote.builder().member(member).postOption(postOption2).build());

            // when
            PageRequest pageRequest = PageRequest.of(0, 10, PostSortType.HOT.getVoteBaseSort());
            Slice<Post> posts = postRepository.findOpenPostsVotedByMember(member, pageRequest);

            // then
            assertAll(
                    () -> assertThat(posts).hasSize(2),
                    () -> assertThat(posts.getContent().get(0)).usingRecursiveComparison().isEqualTo(openPost1)
            );
        }

        @Test
        @DisplayName("모든 게시글 목록을 가져온다.")
        void findPostsVotedByMember() {
            // given
            Member writer = memberRepository.save(MemberFixtures.MALE_20.get());
            Member member = memberRepository.save(MemberFixtures.MALE_10.get());

            Post openPost = postRepository.save(
                    Post.builder()
                            .writer(writer)
                            .postBody(PostBody.builder().title("title").content("content").build())
                            .deadline(LocalDateTime.of(3000, 7, 12, 0, 0))
                            .build()
            );
            PostOption postOption = postOptionRepository.save(
                    PostOption.builder()
                            .post(openPost)
                            .sequence(1)
                            .content("치킨")
                            .build()
            );

            Post closedPost = postRepository.save(
                    Post.builder()
                            .writer(writer)
                            .postBody(PostBody.builder().title("title").content("content").build())
                            .deadline(LocalDateTime.of(1000, 7, 12, 0, 0))
                            .build()
            );
            PostOption postOption1 = postOptionRepository.save(
                    PostOption.builder()
                            .post(closedPost)
                            .sequence(1)
                            .content("치킨")
                            .build()
            );

            voteRepository.save(Vote.builder().member(member).postOption(postOption).build());
            voteRepository.save(Vote.builder().member(member).postOption(postOption1).build());

            // when
            PageRequest pageRequest = PageRequest.of(0, 10);
            Slice<Post> posts = postRepository.findPostsVotedByMember(member, pageRequest);

            // then
            assertThat(posts).hasSize(2);
        }

    }

    @Nested
    @DisplayName("키워드 검색을 통해 게시글 목록을 조회한다.")
    class FindingPostsByKeyword {

        Category development;
        Category love;

        Post devClosedPost;
        Post devOpenPost;
        Post loveClosedPost;
        Post loveOpenPost;

        @BeforeEach
        void setUp() {
            development = categoryRepository.save(Category.builder().name("개발").build());
            love = categoryRepository.save(Category.builder().name("연애").build());

            devClosedPost = postTestPersister.builder()
                    .postBody(PostBody.builder().title("자바제목").content("자바내용").build())
                    .deadline(LocalDateTime.of(1000, 7, 12, 0, 0))
                    .save();
            postCategoryRepository.save(PostCategory.builder().post(devClosedPost).category(development).build());

            devOpenPost = postTestPersister.builder()
                    .postBody(PostBody.builder().title("자바제목1").content("자바내용1").build())
                    .deadline(LocalDateTime.of(3000, 7, 12, 0, 0))
                    .save();
            postCategoryRepository.save(PostCategory.builder().post(devOpenPost).category(development).build());

            loveClosedPost = postTestPersister.builder()
                    .postBody(PostBody.builder().title("커플제목").content("커플내용").build())
                    .deadline(LocalDateTime.of(1000, 7, 12, 0, 0))
                    .save();
            postCategoryRepository.save(PostCategory.builder().post(loveClosedPost).category(love).build());

            loveOpenPost = postTestPersister.builder()
                    .postBody(PostBody.builder().title("커플제목1").content("커플내용1").build())
                    .deadline(LocalDateTime.of(3000, 7, 12, 0, 0))
                    .save();
            postCategoryRepository.save(PostCategory.builder().post(loveOpenPost).category(love).build());

        }

        @Test
        @DisplayName("특정 카테고리에 속한 게시글 목록을 키워드를 통해 검색한다.")
        void searchPostsWithCategory() {
            // when
            List<Post> posts = postRepository.findAllWithKeyword(
                    "자바",
                    PostClosingType.ALL,
                    PostSortType.LATEST,
                    development.getId(),
                    PageRequest.of(0, 10)
            );

            //then
            assertAll(
                    () -> assertThat(posts).hasSize(2),
                    () -> assertThat(posts.get(0)).isEqualTo(devOpenPost),
                    () -> assertThat(posts.get(1)).isEqualTo(devClosedPost)
            );
        }

        @Test
        @DisplayName("게시글 목록을 키워드를 통해 검색한다.(제목)")
        void searchPostsWithKeywordInTitle() {
            // when
            List<Post> posts = postRepository.findAllWithKeyword(
                    "제목1",
                    PostClosingType.ALL,
                    PostSortType.LATEST,
                    null,
                    PageRequest.of(0, 10)
            );

            //then
            assertAll(
                    () -> assertThat(posts).hasSize(2),
                    () -> assertThat(posts.get(0)).isEqualTo(loveOpenPost),
                    () -> assertThat(posts.get(1)).isEqualTo(devOpenPost)
            );
        }

        @Test
        @DisplayName("게시글 목록을 키워드를 통해 검색한다.(내용)")
        void searchPostsWithKeywordInContent() {
            // when
            List<Post> posts = postRepository.findAllWithKeyword(
                    "내용",
                    PostClosingType.ALL,
                    PostSortType.LATEST,
                    null,
                    PageRequest.of(0, 10)
            );

            //then
            assertThat(posts).hasSize(4);
        }

        @Test
        @DisplayName("게시글 목록을 키워드를 통해 검색한다.(제목 + 내용)")
        void searchPostsWithKeywordInTitleAndContent() {
            // when
            List<Post> posts = postRepository.findAllWithKeyword(
                    "1",
                    PostClosingType.ALL,
                    PostSortType.LATEST,
                    null,
                    PageRequest.of(0, 10)
            );

            //then
            assertAll(
                    () -> assertThat(posts).hasSize(2),
                    () -> assertThat(posts.get(0)).isEqualTo(loveOpenPost),
                    () -> assertThat(posts.get(1)).isEqualTo(devOpenPost)
            );
        }

    }

    @Nested
    @DisplayName("회원이 작성한 게시글 목록을 조회한다.")
    class findPostsByWriter {

        Member writer;
        Member voter;
        Member voter1;

        Post openPost_V2;
        Post openPost1_V1;
        Post closedPost_V1;
        Post closedPost1_V0;

        @BeforeEach
        void setUp() {
            writer = memberRepository.save(MemberFixtures.MALE_20.get());
            voter = memberRepository.save(MemberFixtures.FEMALE_OVER_90.get());
            voter1 = memberRepository.save(MemberFixtures.MALE_60.get());

            openPost_V2 = postRepository.save(
                    Post.builder()
                            .writer(writer)
                            .postBody(PostBody.builder().title("title").content("content").build())
                            .deadline(LocalDateTime.of(3000, 7, 12, 0, 0))
                            .build()
            );

            PostOption postOption = postOptionRepository.save(
                    PostOption.builder()
                            .post(openPost_V2)
                            .sequence(1)
                            .content("치킨")
                            .build()
            );
            voteRepository.save(Vote.builder().member(voter).postOption(postOption).build());
            voteRepository.save(Vote.builder().member(voter1).postOption(postOption).build());

            openPost1_V1 = postRepository.save(
                    Post.builder()
                            .writer(writer)
                            .postBody(PostBody.builder().title("title").content("content").build())
                            .deadline(LocalDateTime.of(3000, 7, 12, 0, 0))
                            .build()
            );

            PostOption postOption3 = postOptionRepository.save(
                    PostOption.builder()
                            .post(openPost1_V1)
                            .sequence(1)
                            .content("치킨")
                            .build()
            );
            voteRepository.save(Vote.builder().member(voter).postOption(postOption3).build());

            closedPost_V1 = postRepository.save(
                    Post.builder()
                            .writer(writer)
                            .postBody(PostBody.builder().title("title").content("content").build())
                            .deadline(LocalDateTime.of(1000, 7, 12, 0, 0))
                            .build());

            PostOption postOption1 = postOptionRepository.save(
                    PostOption.builder()
                            .post(closedPost_V1)
                            .sequence(1)
                            .content("치킨")
                            .build()
            );
            voteRepository.save(Vote.builder().member(voter).postOption(postOption1).build());

            closedPost1_V0 = postRepository.save(
                    Post.builder()
                            .writer(writer)
                            .postBody(PostBody.builder().title("title").content("content").build())
                            .deadline(LocalDateTime.of(1001, 7, 12, 0, 0))
                            .build()
            );
            PostOption postOption2 = postOptionRepository.save(
                    PostOption.builder()
                            .post(closedPost1_V0)
                            .sequence(1)
                            .content("치킨")
                            .build()
            );
        }

        @Test
        @DisplayName("마감된 게시글을 최신순으로 가져온다.")
        void findClosedPostsWithLatest() {
            // when
            List<Post> posts = postRepository.findAllByWriterWithClosingTypeAndSortTypeAndCategoryId(
                    writer,
                    PostClosingType.CLOSED,
                    PostSortType.LATEST,
                    null,
                    PageRequest.of(0, 10)
            );

            //then
            assertAll(
                    () -> assertThat(posts).hasSize(2),
                    () -> assertThat(posts.get(0)).isEqualTo(closedPost1_V0),
                    () -> assertThat(posts.get(1)).isEqualTo(closedPost_V1)
            );
        }

        @Test
        @DisplayName("마감된 게시글을 투표순으로 가져온다.")
        void findClosedPostsWithHot() {
            // when
            List<Post> posts = postRepository.findAllByWriterWithClosingTypeAndSortTypeAndCategoryId(
                    writer,
                    PostClosingType.CLOSED,
                    PostSortType.HOT,
                    null,
                    PageRequest.of(0, 10)
            );

            //then
            assertAll(
                    () -> assertThat(posts).hasSize(2),
                    () -> assertThat(posts.get(0)).isEqualTo(closedPost_V1),
                    () -> assertThat(posts.get(1)).isEqualTo(closedPost1_V0)
            );
        }

        @Test
        @DisplayName("마감안된 게시글을 최신순으로 가져온다.")
        void findOpenPostsWithLatest() {
            // when
            List<Post> posts = postRepository.findAllByWriterWithClosingTypeAndSortTypeAndCategoryId(
                    writer,
                    PostClosingType.PROGRESS,
                    PostSortType.LATEST,
                    null,
                    PageRequest.of(0, 10)
            );

            //then
            assertAll(
                    () -> assertThat(posts).hasSize(2),
                    () -> assertThat(posts.get(0)).isEqualTo(openPost1_V1),
                    () -> assertThat(posts.get(1)).isEqualTo(openPost_V2)
            );
        }

        @Test
        @DisplayName("마감안된 게시글을 인기순으로 가져온다.")
        void findOpenPostsWithHot() {
            // when
            List<Post> posts = postRepository.findAllByWriterWithClosingTypeAndSortTypeAndCategoryId(
                    writer,
                    PostClosingType.PROGRESS,
                    PostSortType.HOT,
                    null,
                    PageRequest.of(0, 10)
            );

            //then
            assertAll(
                    () -> assertThat(posts).hasSize(2),
                    () -> assertThat(posts.get(0)).isEqualTo(openPost_V2),
                    () -> assertThat(posts.get(1)).isEqualTo(openPost1_V1)
            );
        }

        @Test
        @DisplayName("마감여부와 관계없이 게시글을 인기순으로 조회한다.")
        void findPostsByHot() {
            // when
            List<Post> posts = postRepository.findAllByWriterWithClosingTypeAndSortTypeAndCategoryId(
                    writer,
                    PostClosingType.ALL,
                    PostSortType.HOT,
                    null,
                    PageRequest.of(0, 10)
            );

            //then
            assertAll(
                    () -> assertThat(posts).hasSize(4),
                    () -> assertThat(posts.get(0)).isEqualTo(openPost_V2),
                    () -> assertThat(posts.get(3)).isEqualTo(closedPost1_V0)
            );
        }

    }

}
