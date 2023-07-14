package com.votogether.domain.vote.repository;

import com.votogether.config.JpaConfig;
import com.votogether.domain.member.entity.Gender;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.SocialType;
import com.votogether.domain.member.repository.MemberRepository;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostOption;
import com.votogether.domain.post.repository.PostRepository;
import com.votogether.domain.vote.entity.Vote;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;

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

    @PersistenceContext
    EntityManager entityManager;

    Member member = Member.builder()
            .gender(Gender.MALE)
            .point(0)
            .socialType(SocialType.GOOGLE)
            .nickname("user1")
            .socialId("kakao@gmail.com")
            .birthDate(
                    LocalDateTime.of(1995, 07, 12, 00, 00))
            .build();

    Post post = Post.builder()
            .title("title")
            .deadline(
                    LocalDateTime.of(3023, 07, 12, 00, 00))
            .content("content")
            .member(member)
            .build();

    PostOption postOption1 = PostOption.builder()
            .post(post)
            .sequence(1)
            .content("content1")
            .build();

    PostOption postOption2 = PostOption.builder()
            .post(post)
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
        postRepository.save(post);
        entityManager.persist(postOption1);

        // when
        voteRepository.save(vote);

        // then
        assertThat(vote.getId()).isNotNull();
    }

    @Test
    @DisplayName("멤버아이디와 투표선택지아이디를 통해 투표를 찾는다.")
    void findVoteByMemberIdAndPostOptionId() {
        // given
        Vote vote = Vote.builder()
                .postOption(postOption1)
                .member(member)
                .build();
        memberRepository.save(member);
        postRepository.save(post);
        entityManager.persist(postOption1);
        voteRepository.save(vote);

        // when
        Vote findVote = voteRepository.findByMemberIdAndPostOptionId(
                member.getId(), postOption1.getId());

        // then
        assertThat(findVote).isSameAs(vote);
    }

}
