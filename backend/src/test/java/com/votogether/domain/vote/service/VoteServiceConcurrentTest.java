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

    @Test
    @DisplayName("동시에 투표를 하더라도 투표 수가 일치한다.")
    void concurrentlyVote() throws Exception {
        // given
        ExecutorService executorService = Executors.newFixedThreadPool(10);
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

}
