package com.votogether.domain.vote.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.MemberMetric;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostOption;
import com.votogether.domain.post.repository.PostOptionRepository;
import com.votogether.domain.post.repository.PostRepository;
import com.votogether.test.ServiceTest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class VoteServiceTest extends ServiceTest {

    @Autowired
    VoteService voteService;

    @Autowired
    PostRepository postRepository;

    @Autowired
    PostOptionRepository postOptionRepository;

    @Nested
    @DisplayName("투표를 할 때")
    class Vote {

        @Test
        @DisplayName("게시글의 투표 수가 1 증가한다.")
        void increasePostVoteCount() {
            // given
            Member member = memberTestPersister.builder().save();
            memberMetricTestPersister.builder().member(member).save();
            Post post = postTestPersister.postBuilder().save();
            PostOption postOption = postTestPersister.postOptionBuilder().post(post).sequence(1).save();
            post.addPostOption(postOption);

            // when
            voteService.vote(member, post.getId(), postOption.getId());

            // then
            assertThat(post.getVoteCount()).isEqualTo(1);
        }

        @Test
        @DisplayName("게시글 옵션의 투표 수가 1 증가한다.")
        void increasePostOptionVoteCount() {
            // given
            Member member = memberTestPersister.builder().save();
            memberMetricTestPersister.builder().member(member).save();
            Post post = postTestPersister.postBuilder().save();
            PostOption postOption = postTestPersister.postOptionBuilder().post(post).sequence(1).save();
            post.addPostOption(postOption);

            // when
            voteService.vote(member, post.getId(), postOption.getId());

            // then
            assertThat(postOption.getVoteCount()).isEqualTo(1);
        }

        @Test
        @DisplayName("멤버의 투표 수가 업데이트된다.")
        void updateMemberVoteCount() {
            // given
            Member member = memberTestPersister.builder().save();
            MemberMetric memberMetric = memberMetricTestPersister.builder().member(member).save();
            Post post = postTestPersister.postBuilder().save();
            PostOption postOption = postTestPersister.postOptionBuilder().post(post).sequence(1).save();
            post.addPostOption(postOption);

            // when
            voteService.vote(member, post.getId(), postOption.getId());

            // then
            assertThat(memberMetric.getVoteCount()).isEqualTo(1);
        }

    }

    @Nested
    @DisplayName("투표를 수정할 때")
    class ChangeVote {

        @Test
        @DisplayName("게시글 투표 수는 변하지 않는다.")
        void maintainPostVoteCount() {
            // given
            Member member = memberTestPersister.builder().save();
            memberMetricTestPersister.builder().member(member).save();
            Post post = postTestPersister.postBuilder().save();
            PostOption postOptionA = postTestPersister.postOptionBuilder().post(post).sequence(1).save();
            PostOption postOptionB = postTestPersister.postOptionBuilder().post(post).sequence(2).save();
            post.addPostOption(postOptionA);
            post.addPostOption(postOptionB);
            voteService.vote(member, post.getId(), postOptionA.getId());

            // when
            voteService.changeVote(member, post.getId(), postOptionA.getId(), postOptionB.getId());

            // then
            assertThat(post.getVoteCount()).isOne();
        }

        @Test
        @DisplayName("기존 옵션 투표 수는 1 감소하고, 새로운 옵션 투표 수는 1 증가한다.")
        void decreaseOriginIncreaseNew() {
            // given
            Member member = memberTestPersister.builder().save();
            memberMetricTestPersister.builder().member(member).save();
            Post post = postTestPersister.postBuilder().save();
            PostOption postOptionA = postTestPersister.postOptionBuilder().post(post).sequence(1).save();
            PostOption postOptionB = postTestPersister.postOptionBuilder().post(post).sequence(2).save();
            post.addPostOption(postOptionA);
            post.addPostOption(postOptionB);
            voteService.vote(member, post.getId(), postOptionA.getId());

            // when
            voteService.changeVote(member, post.getId(), postOptionA.getId(), postOptionB.getId());

            // then
            assertSoftly(softly -> {
                softly.assertThat(postOptionA.getVoteCount()).isZero();
                softly.assertThat(postOptionB.getVoteCount()).isOne();
            });
        }

        @Test
        @DisplayName("멤버의 투표 수는 변하지 않는다.")
        void maintainMemberVoteCount() {
            // given
            Member member = memberTestPersister.builder().save();
            MemberMetric memberMetric = memberMetricTestPersister.builder().member(member).save();
            Post post = postTestPersister.postBuilder().save();
            PostOption postOptionA = postTestPersister.postOptionBuilder().post(post).sequence(1).save();
            PostOption postOptionB = postTestPersister.postOptionBuilder().post(post).sequence(2).save();
            post.addPostOption(postOptionA);
            post.addPostOption(postOptionB);
            voteService.vote(member, post.getId(), postOptionA.getId());

            // when
            voteService.changeVote(member, post.getId(), postOptionA.getId(), postOptionB.getId());

            // then
            assertThat(memberMetric.getVoteCount()).isOne();
        }

    }

}
