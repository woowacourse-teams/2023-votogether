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
class VoteRepositoryTest {

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    PostRepository postRepository;

    @Autowired
    VoteRepository voteRepository;

    @Autowired
    PostOptionRepository postOptionRepository;

    @Test
    @DisplayName("투표를 저장한다.")
    void save() {
        // given
        Member member = memberRepository.save(MemberFixtures.MALE_20.get());

        Post post = postRepository.save(
                Post.builder()
                        .member(member)
                        .postBody(PostBody.builder().title("title").content("content").build())
                        .deadline(LocalDateTime.of(2100, 7, 12, 0, 0))
                        .build()
        );
        PostOption postOption = postOptionRepository.save(
                PostOption.builder()
                        .post(post)
                        .sequence(1)
                        .content("치킨")
                        .build()
        );

        Vote vote = Vote.builder()
                .postOption(postOption)
                .member(member)
                .build();

        // when
        voteRepository.save(vote);

        // then
        assertThat(vote.getId()).isNotNull();
    }

    @Test
    @DisplayName("멤버와 투표선택지를 통해 투표를 찾는다.")
    void findByMemberAndPostOption() {
        // given
        Member member = memberRepository.save(MemberFixtures.MALE_20.get());

        Post post = postRepository.save(
                Post.builder()
                        .member(member)
                        .postBody(PostBody.builder().title("title").content("content").build())
                        .deadline(LocalDateTime.of(2100, 7, 12, 0, 0))
                        .build()
        );
        PostOption postOption = postOptionRepository.save(
                PostOption.builder()
                        .post(post)
                        .sequence(1)
                        .content("치킨")
                        .build()
        );

        Vote vote = voteRepository.save(Vote.builder()
                .postOption(postOption)
                .member(member)
                .build());

        // when
        Vote findVote = voteRepository.findByMemberAndPostOption(member, postOption).get();

        // then
        assertThat(findVote).isSameAs(vote);
    }

    @Test
    @DisplayName("멤버와 여러 투표선택지를 통해 투표를 찾는다.")
    void findByMemberAndPostOptionIn() {
        // given
        Member member = memberRepository.save(MemberFixtures.MALE_20.get());

        Post postA = postRepository.save(
                Post.builder()
                        .member(member)
                        .postBody(PostBody.builder().title("title").content("content").build())
                        .deadline(LocalDateTime.of(2100, 7, 12, 0, 0))
                        .build()
        );
        PostOption postOptionA = postOptionRepository.save(
                PostOption.builder()
                        .post(postA)
                        .sequence(1)
                        .content("치킨")
                        .build()
        );
        Post postB = postRepository.save(
                Post.builder()
                        .member(member)
                        .postBody(PostBody.builder().title("title").content("content").build())
                        .deadline(LocalDateTime.of(2100, 7, 12, 0, 0))
                        .build()
        );
        PostOption postOptionB = postOptionRepository.save(
                PostOption.builder()
                        .post(postB)
                        .sequence(1)
                        .content("치킨")
                        .build()
        );

        Vote voteA = Vote.builder()
                .postOption(postOptionA)
                .member(member)
                .build();
        Vote voteB = Vote.builder()
                .postOption(postOptionB)
                .member(member)
                .build();
        voteRepository.save(voteA);
        voteRepository.save(voteB);

        // when
        List<Vote> votes = voteRepository.findByMemberAndPostOptionIn(member, List.of(postOptionA, postOptionB));

        // then
        assertThat(votes).hasSize(2);
    }

    @Test
    @DisplayName("게시글의 연령대와 성별로 그룹화된 투표 통계를 조회한다.")
    void findVoteCountByPostIdGroupByAgeRangeAndGender() {
        // given
        Member femaleEarly10 = memberRepository.save(MemberFixtures.FEMALE_EARLY_10.get());
        Member maleLate10 = memberRepository.save(MemberFixtures.MALE_LATE_10.get());
        Member male60 = memberRepository.save(MemberFixtures.MALE_60.get());
        Member female70 = memberRepository.save(MemberFixtures.FEMALE_70.get());
        Member female80 = memberRepository.save(MemberFixtures.FEMALE_80.get());
        Member writer = memberRepository.save(MemberFixtures.MALE_20.get());

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
        PostOption postOptionB = postOptionRepository.save(
                PostOption.builder()
                        .post(post)
                        .sequence(2)
                        .content("피자")
                        .build()
        );

        voteRepository.save(Vote.builder().member(femaleEarly10).postOption(postOptionA).build());
        voteRepository.save(Vote.builder().member(maleLate10).postOption(postOptionB).build());
        voteRepository.save(Vote.builder().member(male60).postOption(postOptionA).build());
        voteRepository.save(Vote.builder().member(female70).postOption(postOptionB).build());
        voteRepository.save(Vote.builder().member(female80).postOption(postOptionA).build());

        // when
        List<VoteStatus> result = voteRepository.findVoteCountByPostIdGroupByAgeRangeAndGender(post.getId());

        // then
        assertThat(result).containsExactly(
                new VoteStatus("10~14", Gender.FEMALE, 1),
                new VoteStatus("15~19", Gender.MALE, 1),
                new VoteStatus("60~69", Gender.MALE, 1),
                new VoteStatus("70~79", Gender.FEMALE, 1),
                new VoteStatus("80~89", Gender.FEMALE, 1)
        );
    }

    @Test
    @DisplayName("게시글 투표 옵션의 연령대와 성별로 그룹화된 투표 통계를 조회한다.")
    void findVoteCountByPostOptionIdGroupByAgeRangeAndGender() {
        // given
        Member femaleEarly10 = memberRepository.save(MemberFixtures.FEMALE_EARLY_10.get());
        Member maleLate10 = memberRepository.save(MemberFixtures.MALE_LATE_10.get());
        Member male60 = memberRepository.save(MemberFixtures.MALE_60.get());
        Member female70 = memberRepository.save(MemberFixtures.FEMALE_70.get());
        Member female80 = memberRepository.save(MemberFixtures.FEMALE_80.get());
        Member writer = memberRepository.save(MemberFixtures.MALE_20.get());

        Post post = postRepository.save(
                Post.builder()
                        .member(writer)
                        .postBody(PostBody.builder().title("title").content("content").build())
                        .deadline(LocalDateTime.of(2100, 7, 12, 0, 0))
                        .build()
        );
        PostOption postOption = postOptionRepository.save(
                PostOption.builder()
                        .post(post)
                        .sequence(1)
                        .content("치킨")
                        .build()
        );

        voteRepository.save(Vote.builder().member(femaleEarly10).postOption(postOption).build());
        voteRepository.save(Vote.builder().member(maleLate10).postOption(postOption).build());
        voteRepository.save(Vote.builder().member(male60).postOption(postOption).build());
        voteRepository.save(Vote.builder().member(female70).postOption(postOption).build());
        voteRepository.save(Vote.builder().member(female80).postOption(postOption).build());

        // when
        List<VoteStatus> result =
                voteRepository.findVoteCountByPostOptionIdGroupByAgeRangeAndGender(postOption.getId());

        // then
        assertThat(result).containsExactly(
                new VoteStatus("10~14", Gender.FEMALE, 1),
                new VoteStatus("15~19", Gender.MALE, 1),
                new VoteStatus("60~69", Gender.MALE, 1),
                new VoteStatus("70~79", Gender.FEMALE, 1),
                new VoteStatus("80~89", Gender.FEMALE, 1)
        );
    }

    @Test
    @DisplayName("해당 회원이 투표한 개수를 반환한다.")
    void countByMember() {
        // given
        Member member = memberRepository.save(MemberFixtures.MALE_LATE_10.get());
        Member writer = memberRepository.save(MemberFixtures.MALE_20.get());
        Post post = postRepository.save(
                Post.builder()
                        .member(writer)
                        .postBody(PostBody.builder().title("title").content("content").build())
                        .deadline(LocalDateTime.of(2100, 7, 12, 0, 0))
                        .build()
        );
        PostOption postOption = postOptionRepository.save(
                PostOption.builder()
                        .post(post)
                        .sequence(1)
                        .content("치킨")
                        .build()
        );
        Vote vote = Vote.builder()
                .member(member)
                .postOption(postOption)
                .build();

        memberRepository.save(member);
        voteRepository.save(vote);

        // when
        int numberOfVote = voteRepository.countByMember(member);

        // then
        assertThat(numberOfVote).isEqualTo(1);
    }

}
