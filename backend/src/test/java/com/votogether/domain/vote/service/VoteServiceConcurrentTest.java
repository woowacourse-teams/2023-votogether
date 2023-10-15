package com.votogether.domain.vote.service;

import static org.assertj.core.api.SoftAssertions.assertSoftly;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.repository.MemberMetricRepository;
import com.votogether.domain.member.repository.MemberRepository;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostOption;
import com.votogether.domain.post.repository.PostOptionRepository;
import com.votogether.domain.post.repository.PostRepository;
import com.votogether.domain.vote.repository.VoteRepository;
import com.votogether.global.log.context.LogContext;
import com.votogether.test.persister.MemberMetricTestPersister;
import com.votogether.test.persister.MemberTestPersister;
import com.votogether.test.persister.PostTestPersister;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicInteger;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

@SpringBootTest
class VoteServiceConcurrentTest {

    @MockBean
    LogContext logContext;

    @Autowired
    VoteService voteService;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    MemberMetricRepository memberMetricRepository;

    @Autowired
    PostRepository postRepository;

    @Autowired
    PostOptionRepository postOptionRepository;

    @Autowired
    VoteRepository voteRepository;

    @Autowired
    MemberTestPersister memberTestPersister;

    @Autowired
    MemberMetricTestPersister memberMetricTestPersister;

    @Autowired
    PostTestPersister postTestPersister;

    @AfterEach
    void tearDown() {
        voteRepository.deleteAll();
        postOptionRepository.deleteAll();
        postRepository.deleteAll();
        memberMetricRepository.deleteAll();
        memberRepository.deleteAll();
    }

    /**
     * 게시글 락을 걸지 않으면 투표 2개 생기는 문제 발생
     */
    @Test
    @DisplayName("동시에 투표를 하더라도 투표는 1번만 되어야 한다.")
    void concurrentlyOnlyVote() throws Exception {
        // given
        ExecutorService executorService = Executors.newFixedThreadPool(2);
        CountDownLatch latch = new CountDownLatch(2);
        AtomicInteger successCount = new AtomicInteger();
        AtomicInteger failCount = new AtomicInteger();

        Member member = memberTestPersister.builder().save();
        memberMetricTestPersister.builder().member(member).save();
        Post post = postTestPersister.postBuilder().save();
        PostOption postOptionA = postTestPersister.postOptionBuilder().post(post).sequence(1).save();
        PostOption postOptionB = postTestPersister.postOptionBuilder().post(post).sequence(2).save();
        post.addPostOption(postOptionA);
        post.addPostOption(postOptionB);

        // when
        executorService.submit(() -> {
            try {
                voteService.vote(member, post.getId(), postOptionA.getId());
                successCount.incrementAndGet();
            } catch (Exception e) {
                System.out.println("EXCEPTION 1 : " + e.getMessage());
                failCount.incrementAndGet();
            } finally {
                latch.countDown();
            }
        });
        executorService.submit(() -> {
            try {
                voteService.vote(member, post.getId(), postOptionB.getId());
                successCount.incrementAndGet();
            } catch (Exception e) {
                System.out.println("EXCEPTION 2 : " + e.getMessage());
                failCount.incrementAndGet();
            } finally {
                latch.countDown();
            }
        });
        latch.await();

        System.out.println("SUCCESS : " + successCount);
        System.out.println("FAIL : " + failCount);

        // then
        assertSoftly(softly -> {
            softly.assertThat(postRepository.findById(post.getId()).get().getVoteCount()).isEqualTo(1);
            softly.assertThat(memberMetricRepository.findByMember(member).get().getVoteCount()).isEqualTo(1);
        });
    }

    /**
     * 락을 걸지 않으면 투표 수가 일치하지 않을 수 있다.
     */
    @Test
    @DisplayName("동시에 투표를 하더라도 투표 수가 일치한다.")
    void concurrentlyVote() throws Exception {
        // given
        ExecutorService executorService = Executors.newFixedThreadPool(5);
        CountDownLatch latch = new CountDownLatch(5);

        List<Member> members = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            members.add(memberTestPersister.builder().save());
            memberMetricTestPersister.builder().member(members.get(i)).save();
        }
        Post post = postTestPersister.postBuilder().save();
        PostOption postOption = postTestPersister.postOptionBuilder().post(post).sequence(1).save();
        post.addPostOption(postOption);

        // when
        for (int i = 0; i < 5; i++) {
            int index = i;
            executorService.submit(() -> {
                try {
                    voteService.vote(members.get(index), post.getId(), postOption.getId());
                } finally {
                    latch.countDown();
                }
            });
        }
        latch.await();

        // then
        assertSoftly(softly -> {
            softly.assertThat(postRepository.findById(post.getId()).get().getVoteCount()).isEqualTo(5);
            softly.assertThat(postOptionRepository.findById(postOption.getId()).get().getVoteCount()).isEqualTo(5);
        });
    }

    /**
     * 정렬하지 않으면 데드락 문제가 발생한다.
     */
    @Test
    @DisplayName("동시에 투표를 수정하더라도 투표 수가 일치한다.")
    void concurrentlyChangeVote() throws Exception {
        // given
        ExecutorService executorService = Executors.newFixedThreadPool(2);
        CountDownLatch latch = new CountDownLatch(2);

        Member memberA = memberTestPersister.builder().save();
        Member memberB = memberTestPersister.builder().save();
        memberMetricTestPersister.builder().member(memberA).save();
        memberMetricTestPersister.builder().member(memberB).save();
        Post post = postTestPersister.postBuilder().save();
        PostOption postOptionA = postTestPersister.postOptionBuilder().post(post).sequence(1).save();
        PostOption postOptionB = postTestPersister.postOptionBuilder().post(post).sequence(2).save();
        post.addPostOption(postOptionA);
        post.addPostOption(postOptionB);
        voteService.vote(memberA, post.getId(), postOptionA.getId());
        voteService.vote(memberB, post.getId(), postOptionB.getId());

        // when
        executorService.submit(() -> {
            try {
                voteService.changeVote(memberA, post.getId(), postOptionA.getId(), postOptionB.getId());
            } finally {
                latch.countDown();
            }
        });
        executorService.submit(() -> {
            try {
                voteService.changeVote(memberB, post.getId(), postOptionB.getId(), postOptionA.getId());
            } finally {
                latch.countDown();
            }
        });
        latch.await();

        // then
        assertSoftly(softly -> {
            softly.assertThat(postRepository.findById(post.getId()).get().getVoteCount()).isEqualTo(2);
            softly.assertThat(postOptionRepository.findById(postOptionA.getId()).get().getVoteCount()).isEqualTo(1);
            softly.assertThat(postOptionRepository.findById(postOptionB.getId()).get().getVoteCount()).isEqualTo(1);
            softly.assertThat(memberMetricRepository.findByMember(memberA).get().getVoteCount()).isEqualTo(1);
            softly.assertThat(memberMetricRepository.findByMember(memberB).get().getVoteCount()).isEqualTo(1);
        });
    }

}
