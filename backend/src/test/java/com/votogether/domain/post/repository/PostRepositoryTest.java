package com.votogether.domain.post.repository;

import static org.assertj.core.api.Assertions.assertThat;

import com.votogether.RepositoryTest;
import com.votogether.domain.member.entity.Gender;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.SocialType;
import com.votogether.domain.member.repository.MemberRepository;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostBody;
import com.votogether.domain.post.entity.PostClosingType;
import com.votogether.domain.post.entity.PostOption;
import com.votogether.domain.post.entity.PostSortType;
import com.votogether.domain.vote.entity.Vote;
import com.votogether.domain.vote.repository.VoteRepository;
import com.votogether.fixtures.MemberFixtures;
import java.time.LocalDateTime;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;

@RepositoryTest
class PostRepositoryTest {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private PostOptionRepository postOptionRepository;

    @Autowired
    private VoteRepository voteRepository;

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
                .point(0)
                .socialType(SocialType.KAKAO)
                .nickname("user1")
                .gender(Gender.MALE)
                .birthday("0718")
                .ageRange("10~14")
                .socialType(SocialType.KAKAO)
                .socialId("kakao@gmail.com")
                .ageRange("30~39")
                .birthday("0101")
                .point(0)
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
                .socialType(SocialType.KAKAO)
                .socialId("kakao@gmail.com")
                .ageRange("30~39")
                .birthday("0101")
                .point(0)
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
    @DisplayName("회원이 투표한 게시글 목록을 조회한다.")
    class findPostsVotedByMember {

        @DisplayName("마감된 게시글 목록을 최신순으로 가져온다.")
        void findClosedPostsVotedByMember() throws InterruptedException {
            // given
            Member writer = memberRepository.save(MemberFixtures.MALE_20.get());
            Member member = memberRepository.save(MemberFixtures.MALE_LATE_10.get());

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

            Thread.sleep(10);

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
            assertThat(posts).hasSize(2);
            assertThat(posts.getContent().get(0)).usingRecursiveComparison().isEqualTo(closedPost1);
        }

        @Test
        @DisplayName("마감되지 않은 게시글 목록을 투표순으로 가져온다.")
        void findOpenPostsVotedByMember() {
            // given
            Member writer = memberRepository.save(MemberFixtures.MALE_20.get());
            Member member = memberRepository.save(MemberFixtures.MALE_LATE_10.get());
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
            assertThat(posts).hasSize(2);
            assertThat(posts.getContent().get(0)).usingRecursiveComparison().isEqualTo(openPost1);
        }

        @Test
        @DisplayName("모든 게시글 목록을 가져온다.")
        void findPostsVotedByMember() {
            // given
            Member writer = memberRepository.save(MemberFixtures.MALE_20.get());
            Member member = memberRepository.save(MemberFixtures.MALE_LATE_10.get());

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
        void setUp() throws InterruptedException {
            writer = memberRepository.save(MemberFixtures.MALE_20.get());
            voter = memberRepository.save(MemberFixtures.FEMALE_OVER_90.get());
            voter1 = memberRepository.save(MemberFixtures.MALE_LATE_10.get());

            openPost_V2 = postRepository.save(
                    Post.builder()
                            .writer(writer)
                            .postBody(PostBody.builder().title("title").content("content").build())
                            .deadline(LocalDateTime.of(3000, 7, 12, 0, 0))
                            .build()
            );
            Thread.sleep(10);

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
            Thread.sleep(10);

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
            Thread.sleep(10);

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
            List<Post> posts = postRepository.findAllByWriterWithClosingTypeAndSortType(
                    writer,
                    PostClosingType.CLOSED,
                    PostSortType.LATEST,
                    PageRequest.of(0, 10)
            );

            //then
            assertThat(posts).hasSize(2);
            assertThat(posts.get(0)).isEqualTo(closedPost1_V0);
            assertThat(posts.get(1)).isEqualTo(closedPost_V1);
        }

        @Test
        @DisplayName("마감된 게시글을 투표순으로 가져온다.")
        void findClosedPostsWithHot() {
            // when
            List<Post> posts = postRepository.findAllByWriterWithClosingTypeAndSortType(
                    writer,
                    PostClosingType.CLOSED,
                    PostSortType.HOT,
                    PageRequest.of(0, 10)
            );

            //then
            assertThat(posts).hasSize(2);
            assertThat(posts.get(0)).isEqualTo(closedPost_V1);
            assertThat(posts.get(1)).isEqualTo(closedPost1_V0);
        }

        @Test
        @DisplayName("마감안된 게시글을 최신순으로 가져온다.")
        void findOpenPostsWithLatest() {
            // when
            List<Post> posts = postRepository.findAllByWriterWithClosingTypeAndSortType(
                    writer,
                    PostClosingType.PROGRESS,
                    PostSortType.LATEST,
                    PageRequest.of(0, 10)
            );

            //then
            assertThat(posts).hasSize(2);
            assertThat(posts.get(0)).isEqualTo(openPost1_V1);
            assertThat(posts.get(1)).isEqualTo(openPost_V2);
        }

        @Test
        @DisplayName("마감안된 게시글을 인기순으로 가져온다.")
        void findOpenPostsWithHot() {
            // when
            List<Post> posts = postRepository.findAllByWriterWithClosingTypeAndSortType(
                    writer,
                    PostClosingType.PROGRESS,
                    PostSortType.HOT,
                    PageRequest.of(0, 10)
            );

            //then
            assertThat(posts).hasSize(2);
            assertThat(posts.get(0)).isEqualTo(openPost_V2);
            assertThat(posts.get(1)).isEqualTo(openPost1_V1);
        }

        @Test
        @DisplayName("마감여부와 관계없이 게시글을 인기순으로 조회한다.")
        void findPostsByHot() {
            // when
            List<Post> posts = postRepository.findAllByWriterWithClosingTypeAndSortType(
                    writer,
                    PostClosingType.ALL,
                    PostSortType.HOT,
                    PageRequest.of(0, 10)
            );

            //then
            assertThat(posts).hasSize(4);
            assertThat(posts.get(0)).isEqualTo(openPost_V2);
            assertThat(posts.get(3)).isEqualTo(closedPost1_V0);
        }

    }

}
