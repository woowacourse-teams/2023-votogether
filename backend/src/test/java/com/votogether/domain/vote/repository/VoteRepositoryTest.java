package com.votogether.domain.vote.repository;

import static org.assertj.core.api.Assertions.assertThat;

import com.votogether.config.JpaConfig;
import com.votogether.domain.member.entity.Gender;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.SocialType;
import com.votogether.domain.member.repository.MemberRepository;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostBody;
import com.votogether.domain.post.entity.PostOption;
import com.votogether.domain.post.repository.PostOptionRepository;
import com.votogether.domain.post.repository.PostRepository;
import com.votogether.domain.vote.entity.Vote;
import java.time.LocalDateTime;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@DataJpaTest
@Import(JpaConfig.class)
class VoteRepositoryTest {

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    PostRepository postRepository;

    @Autowired
    VoteRepository voteRepository;

    @Autowired
    PostOptionRepository postOptionRepository;

    Member member = Member.builder()
            .gender(Gender.MALE)
            .point(0)
            .socialType(SocialType.GOOGLE)
            .nickname("user1")
            .socialId("kakao@gmail.com")
            .birthDate(
                    LocalDateTime.of(1995, 7, 12, 0, 0))
            .build();

    Post post1 = Post.builder()
            .postBody(PostBody.builder().title("title1").content("content1").build())
            .deadline(
                    LocalDateTime.of(3023, 7, 12, 0, 0))
            .member(member)
            .build();

    Post post2 = Post.builder()
            .postBody(PostBody.builder().title("title2").content("content2").build())
            .deadline(
                    LocalDateTime.of(3023, 7, 12, 0, 0))
            .member(member)
            .build();

    PostOption postOption1 = PostOption.builder()
            .post(post1)
            .sequence(1)
            .content("content1")
            .build();

    PostOption postOption2 = PostOption.builder()
            .post(post2)
            .sequence(2)
            .content("content2")
            .build();

    @Test
    @DisplayName("투표를 저장한다.")
    void save() {
        // given
        Vote vote = Vote.builder()
                .postOption(postOption1)
                .member(member)
                .build();
        memberRepository.save(member);
        postRepository.save(post1);
        postOptionRepository.save(postOption1);

        // when
        voteRepository.save(vote);

        // then
        assertThat(vote.getId()).isNotNull();
    }

    @Test
    @DisplayName("멤버와 투표선택지를 통해 투표를 찾는다.")
    void findByMemberAndPostOption() {
        // given
        Vote vote = Vote.builder()
                .postOption(postOption1)
                .member(member)
                .build();
        memberRepository.save(member);
        postRepository.save(post1);
        postOptionRepository.save(postOption1);
        voteRepository.save(vote);

        // when
        Vote findVote = voteRepository.findByMemberAndPostOption(member, postOption1).get();

        // then
        assertThat(findVote).isSameAs(vote);
    }

    @Test
    @DisplayName("멤버와 여러 투표선택지를 통해 투표를 찾는다.")
    void findByMemberAndPostOptionIn() {
        // given
        memberRepository.save(member);
        postRepository.save(post1);
        postRepository.save(post2);
        postOptionRepository.save(postOption1);
        postOptionRepository.save(postOption2);

        Vote vote1 = Vote.builder()
                .postOption(postOption1)
                .member(member)
                .build();
        voteRepository.save(vote1);

        Vote vote2 = Vote.builder()
                .postOption(postOption2)
                .member(member)
                .build();
        voteRepository.save(vote2);

        // when
        List<Vote> votes = voteRepository.findByMemberAndPostOptionIn(member, List.of(postOption1, postOption2));

        // then
        assertThat(votes).hasSize(2);
    }

}
