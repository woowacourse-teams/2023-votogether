package com.votogether.domain.vote.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostOption;
import com.votogether.domain.post.repository.PostOptionRepository;
import com.votogether.domain.post.repository.PostRepository;
import com.votogether.domain.vote.entity.Vote;
import com.votogether.domain.vote.repository.VoteRepository;
import com.votogether.global.exception.BadRequestException;
import com.votogether.global.exception.NotFoundException;
import com.votogether.test.ServiceTest;
import jakarta.persistence.EntityManager;
import java.time.LocalDateTime;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class VoteServiceTest extends ServiceTest {

    @Autowired
    EntityManager entityManager;

    @Autowired
    PostRepository postRepository;

    @Autowired
    VoteRepository voteRepository;

    @Autowired
    PostOptionRepository postOptionRepository;

    @Autowired
    VoteService voteService;

    @Nested
    @DisplayName("게시글에 투표 시")
    class vote {

        @Test
        @DisplayName("투표 성공.")
        void vote() {
            // given
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().save();
            PostOption postOption = postTestPersister.postOptionBuilder().post(post).save();
            post.addPostOption(postOption);

            // when
            voteService.vote(member, post.getId(), postOption.getId());

            // then
            int count = voteRepository.countByMember(member);
            assertThat(count).isEqualTo(1);
        }

        @Test
        @DisplayName("본인의 게시글에 투표하는 경우 예외 발생")
        void vote1() {
            // given
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().writer(member).save();
            PostOption postOption = postTestPersister.postOptionBuilder().post(post).save();
            post.addPostOption(postOption);

            // when, then
            assertThatThrownBy(() -> voteService.vote(member, post.getId(), postOption.getId()))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("게시글 작성자는 투표할 수 없습니다.");
        }

        @Test
        @DisplayName("마감기간이 지난 게시글인 경우 예외 발생")
        void vote2() {
            // given
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().deadline(LocalDateTime.now().minusDays(1L)).save();
            PostOption postOption = postTestPersister.postOptionBuilder().post(post).save();
            post.addPostOption(postOption);

            // when, then
            assertThatThrownBy(() -> voteService.vote(member, post.getId(), postOption.getId()))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("게시글이 마감되었습니다.");
        }

        @Test
        @DisplayName("게시글에 해당되는 투표 선택지가 아닌 경우 예외 발생")
        void vote3() {
            // given
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().save();
            PostOption postOptionA = postTestPersister.postOptionBuilder().post(post).save();
            post.addPostOption(postOptionA);
            PostOption postOptionB = postTestPersister.postOptionBuilder().save();

            // when, then
            assertThatThrownBy(() -> voteService.vote(member, post.getId(), postOptionB.getId()))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("게시글 투표 옵션이 존재하지 않습니다.");
        }

        @Test
        @DisplayName("이미 해당 선택지에 투표를 한 경우 예외 발생")
        void vote4() {
            // given
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().save();
            PostOption postOption = postTestPersister.postOptionBuilder().post(post).save();
            post.addPostOption(postOption);
            voteTestPersister.builder().member(member).postOption(postOption).save();

            // when, then
            assertThatThrownBy(() -> voteService.vote(member, post.getId(), postOption.getId()))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("이미 참여한 투표입니다.");
        }

        @Test
        @DisplayName("게시글이 존재하지 않는 경우 예외 발생")
        void vote5() {
            // given
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().save();
            PostOption postOption = postTestPersister.postOptionBuilder().post(post).save();
            post.addPostOption(postOption);
            voteTestPersister.builder().member(member).postOption(postOption).save();

            // when, then
            assertThatThrownBy(() -> voteService.vote(member, -1L, postOption.getId()))
                    .isInstanceOf(NotFoundException.class)
                    .hasMessage("게시글이 존재하지 않습니다.");
        }

        @Test
        @DisplayName("투표 선택지 옵션이 존재하지 않는 경우 예외 발생")
        void vote6() {
            // given
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().save();
            PostOption postOption = postTestPersister.postOptionBuilder().post(post).save();
            post.addPostOption(postOption);
            voteTestPersister.builder().member(member).postOption(postOption).save();

            // when, then
            assertThatThrownBy(() -> voteService.vote(member, post.getId(), -1L))
                    .isInstanceOf(NotFoundException.class)
                    .hasMessage("게시글 투표 옵션이 존재하지 않습니다.");
        }

    }

    @Nested
    @DisplayName("게시글의 투표 변경 시")
    class changingVote {

        @Test
        @DisplayName("변경 성공.")
        void changeVote() {
            // given
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().save();
            PostOption postOptionA = postTestPersister.postOptionBuilder().post(post).sequence(1).save();
            PostOption postOptionB = postTestPersister.postOptionBuilder().post(post).sequence(2).save();
            post.addPostOption(postOptionA);
            post.addPostOption(postOptionB);
            voteService.vote(member, post.getId(), postOptionA.getId());
            entityManager.flush();
            entityManager.clear();

            // when
            voteService.changeVote(member, post.getId(), postOptionA.getId(), postOptionB.getId());

            // then
            Vote vote = voteRepository.findAllByMember(member).get(0);
            assertThat(vote.getPostOption().getId()).isEqualTo(postOptionB.getId());
        }

        @Test
        @DisplayName("존재하지 않는 게시글인 경우 예외 발생")
        void changeVote1() {
            // given
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().save();
            PostOption postOptionA = postTestPersister.postOptionBuilder().post(post).sequence(1).save();
            PostOption postOptionB = postTestPersister.postOptionBuilder().post(post).sequence(2).save();
            post.addPostOption(postOptionA);
            post.addPostOption(postOptionB);
            voteService.vote(member, post.getId(), postOptionA.getId());
            entityManager.flush();
            entityManager.clear();

            // when, then
            assertThatThrownBy(() -> voteService.changeVote(member, -1L, postOptionA.getId(), postOptionB.getId()))
                    .isInstanceOf(NotFoundException.class)
                    .hasMessage("게시글이 존재하지 않습니다.");
        }

        @Test
        @DisplayName("이전 투표가 존재 하지 않는 경우 예외 발생")
        void changeVote2() {
            // given
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().save();
            PostOption postOptionA = postTestPersister.postOptionBuilder().post(post).sequence(1).save();
            PostOption postOptionB = postTestPersister.postOptionBuilder().post(post).sequence(2).save();
            PostOption postOptionC = postTestPersister.postOptionBuilder().save();
            post.addPostOption(postOptionA);
            post.addPostOption(postOptionB);
            voteService.vote(member, post.getId(), postOptionA.getId());
            entityManager.flush();
            entityManager.clear();

            // when, then
            assertThatThrownBy(
                    () -> voteService.changeVote(member, post.getId(), postOptionC.getId(), postOptionB.getId()))
                    .isInstanceOf(NotFoundException.class)
                    .hasMessage("참여한 투표가 존재하지 않습니다.");
        }

        @Test
        @DisplayName("게시글 선택지가 존재하지 않는 경우 예외 발생")
        void changeVote3() {
            // given
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().save();
            PostOption postOptionA = postTestPersister.postOptionBuilder().post(post).sequence(1).save();
            PostOption postOptionB = postTestPersister.postOptionBuilder().post(post).sequence(2).save();
            post.addPostOption(postOptionA);
            post.addPostOption(postOptionB);
            voteService.vote(member, post.getId(), postOptionA.getId());
            entityManager.flush();
            entityManager.clear();

            // when, then
            assertThatThrownBy(
                    () -> voteService.changeVote(member, post.getId(), -1L, postOptionB.getId()))
                    .isInstanceOf(NotFoundException.class)
                    .hasMessage("게시글 투표 옵션이 존재하지 않습니다.");
        }

    }

}
