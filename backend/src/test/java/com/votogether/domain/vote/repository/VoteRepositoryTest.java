package com.votogether.domain.vote.repository;

import static org.assertj.core.api.Assertions.assertThat;

import com.votogether.RepositoryTest;
import com.votogether.domain.member.entity.Gender;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.SocialType;
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

    Member member = Member.builder()
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

    Post post1 = Post.builder()
            .postBody(PostBody.builder().title("title1").content("content1").build())
            .deadline(
                    LocalDateTime.of(3023, 7, 12, 0, 0))
            .member(member)
            .build();

    PostOption postOption1 = PostOption.builder()
            .post(post1)
            .sequence(1)
            .content("content1")
            .build();

    Post post2 = Post.builder()
            .postBody(PostBody.builder().title("title2").content("content2").build())
            .deadline(
                    LocalDateTime.of(3023, 7, 12, 0, 0))
            .member(member)
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

}
