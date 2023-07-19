package com.votogether.domain.post.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.votogether.domain.category.repository.CategoryRepository;
import com.votogether.domain.member.entity.Gender;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.SocialType;
import com.votogether.domain.member.repository.MemberRepository;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostBody;
import com.votogether.domain.post.entity.PostOption;
import com.votogether.domain.post.repository.PostRepository;
import com.votogether.domain.vote.repository.VoteRepository;
import com.votogether.domain.vote.service.VoteService;
import java.time.LocalDateTime;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
class PostServiceAdditionalTest {

    @Autowired
    PostRepository postRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    VoteRepository voteRepository;

    @Autowired
    PostService postService;

    @Autowired
    VoteService voteService;

    @Test
    @DisplayName("회원 자기자신이 투표한 게시글 목록을 조회한다.")
    @Transactional
    void getPostsVotedOn() {
        // given
        Member member1 = Member.builder()
                .gender(Gender.MALE)
                .point(0)
                .socialType(SocialType.GOOGLE)
                .nickname("user1")
                .socialId("kakao@gmail.com")
                .birthDate(
                        LocalDateTime.of(1995, 7, 12, 0, 0))
                .build();

        Member member2 = Member.builder()
                .gender(Gender.MALE)
                .point(0)
                .socialType(SocialType.GOOGLE)
                .nickname("user2")
                .socialId("naver@gmail.com")
                .birthDate(
                        LocalDateTime.of(1995, 7, 12, 0, 0))
                .build();

        Post post1 = Post.builder()
                .postBody(PostBody.builder().title("title1").content("content1").build())
                .deadline(
                        LocalDateTime.of(3023, 7, 12, 0, 0))
                .member(member1)
                .build();

        post1.mapPostOptionsByElements(
                List.of("content1"),
                post1,
                List.of(new MockMultipartFile("name", "s".getBytes()))
        );

        Post post2 = Post.builder()
                .postBody(PostBody.builder().title("title2").content("content2").build())
                .deadline(
                        LocalDateTime.of(3023, 7, 12, 0, 0))
                .member(member1)
                .build();

        post2.mapPostOptionsByElements(
                List.of("content2"),
                post2,
                List.of(new MockMultipartFile("name", "d".getBytes()))
        );

        memberRepository.save(member1);
        memberRepository.save(member2);
        postRepository.save(post1);
        postRepository.save(post2);

        System.out.println(member2.getId());

        PostOption postOption1 = post1.getPostOptions().getPostOptions().get(0);
        PostOption postOption2 = post2.getPostOptions().getPostOptions().get(0);

        voteService.vote(member2, post1.getId(), postOption1.getId());
        voteService.vote(member2, post2.getId(), postOption2.getId());

        // when
        List<Post> postsVotedOn = postService.getPostsVotedOn(member2);

        // then
        assertAll(
                () -> assertThat(postsVotedOn).hasSize(2),
                () -> assertThat(postsVotedOn.get(0)).isSameAs(post2),
                () -> assertThat(postsVotedOn.get(1)).isSameAs(post1)
        );
    }

}
