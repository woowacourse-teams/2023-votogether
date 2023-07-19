package com.votogether.domain.vote.repository;

import static org.assertj.core.api.Assertions.assertThat;

import com.votogether.RepositoryTest;
import com.votogether.domain.member.entity.Gender;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.repository.MemberRepository;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostBody;
import com.votogether.domain.post.entity.PostOption;
import com.votogether.domain.post.repository.PostOptionRepository;
import com.votogether.domain.post.repository.PostRepository;
import com.votogether.domain.vote.dto.VoteStatus;
import com.votogether.domain.vote.entity.Vote;
import com.votogether.fixtures.MemberFixtures;
import java.time.LocalDateTime;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

@RepositoryTest
class VoteCustomRepositoryImplTest {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private PostOptionRepository postOptionRepository;

    @Autowired
    private VoteRepository voteRepository;

    @Autowired
    private VoteCustomRepositoryImpl voteCustomRepository;

    @Test
    @DisplayName("게시글 투표 옵션의 연령대와 성별로 그룹화된 투표 통계를 조회한다.")
    void findVoteCountByPostOptionIdGroupByAgeRangeAndGender() {
        // given
        Member femaleEarly10 = memberRepository.save(MemberFixtures.FEMALE_EARLY_10);
        Member maleLate10 = memberRepository.save(MemberFixtures.MALE_LATE_10);
        Member male60 = memberRepository.save(MemberFixtures.MALE_60);
        Member female70 = memberRepository.save(MemberFixtures.FEMALE_70);
        Member female80 = memberRepository.save(MemberFixtures.FEMALE_80);
        Member writer = memberRepository.save(MemberFixtures.MALE_20);

        Post post = postRepository.save(
                Post.builder()
                        .member(writer)
                        .postBody(PostBody.builder().title("title").content("content").build())
                        .deadline(LocalDateTime.of(2100, 7, 12, 0, 0))
                        .build()
        );
        PostOption postOptionA = postOptionRepository.save(
                PostOption.builder()
                        .post(post)
                        .sequence(1)
                        .content("치킨")
                        .build()
        );

        voteRepository.save(Vote.builder().member(femaleEarly10).postOption(postOptionA).build());
        voteRepository.save(Vote.builder().member(maleLate10).postOption(postOptionA).build());
        voteRepository.save(Vote.builder().member(male60).postOption(postOptionA).build());
        voteRepository.save(Vote.builder().member(female70).postOption(postOptionA).build());
        voteRepository.save(Vote.builder().member(female80).postOption(postOptionA).build());

        // when
        List<VoteStatus> result =
                voteCustomRepository.findVoteCountByPostOptionIdGroupByAgeRangeAndGender(postOptionA.getId());

        // then
        assertThat(result).containsExactly(
                new VoteStatus("10~14", Gender.FEMALE, 1),
                new VoteStatus("15~19", Gender.MALE, 1),
                new VoteStatus("60~69", Gender.MALE, 1),
                new VoteStatus("70~79", Gender.FEMALE, 1),
                new VoteStatus("80~89", Gender.FEMALE, 1)
        );
    }

}
