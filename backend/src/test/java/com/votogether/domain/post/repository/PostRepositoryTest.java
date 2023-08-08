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
import com.votogether.domain.vote.repository.VoteRepository;
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

@RepositoryTest
class PostRepositoryTest {

    @Autowired
    PostRepository postRepository;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    PostOptionRepository postOptionRepository;

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
    @DisplayName("마감 여부와 정렬 기준으로 페이징 처리하여 게시글 목록을 조회한다.")
    class FindAllByClosingTypeAndSortType {

        private List<Member> members;
        private List<Post> posts;

        @BeforeEach
        void setUp() {
            members = new ArrayList<>();
            posts = new ArrayList<>();

            for (int i = 0; i < 11; i++) {
                members.add(memberTestPersister.builder().save());
            }

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

                generatePostOptionAndVote(closedPost, i + 5);
                generatePostOptionAndVote(notClosedPost, i + 7);
            }
        }

        private void generatePostOptionAndVote(Post post, int voteCount) {
            for (int j = 0; j < 5; j++) {
                PostOption postOption = postOptionTestPersister.builder().post(post).save();
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
            List<Post> result =
                    postRepository.findAllByClosingTypeAndSortType(PostClosingType.ALL, PostSortType.LATEST, pageable);

            // then
            assertThat(result).containsExactly(posts.get(3), posts.get(2));
        }

        @Test
        @DisplayName("마감 여부와 상관없이 게시글 목록을 인기순으로 조회한다.")
        void getAllPostsOrderByHot() {
            // given
            Pageable pageable = PageRequest.of(0, 2);

            // when
            List<Post> result =
                    postRepository.findAllByClosingTypeAndSortType(PostClosingType.ALL, PostSortType.HOT, pageable);

            // then
            assertThat(result).containsExactly(posts.get(1), posts.get(3));
        }

        @Test
        @DisplayName("진행중인 게시글 목록을 최신순으로 조회한다.")
        void getProgressPostsOrderByLatest() {
            // given
            Pageable pageable = PageRequest.of(0, 2);

            // when
            List<Post> result = postRepository.findAllByClosingTypeAndSortType(
                    PostClosingType.PROGRESS,
                    PostSortType.LATEST,
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
            List<Post> result = postRepository.findAllByClosingTypeAndSortType(
                    PostClosingType.PROGRESS,
                    PostSortType.HOT,
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
            List<Post> result = postRepository.findAllByClosingTypeAndSortType(
                    PostClosingType.CLOSED,
                    PostSortType.LATEST,
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
            List<Post> result = postRepository.findAllByClosingTypeAndSortType(
                    PostClosingType.CLOSED,
                    PostSortType.HOT,
                    pageable
            );

            // then
            assertThat(result).containsExactly(posts.get(0), posts.get(2));
        }

    }

}
