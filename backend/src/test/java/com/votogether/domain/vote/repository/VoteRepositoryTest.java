package com.votogether.domain.vote.repository;

import static org.assertj.core.api.Assertions.assertThat;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.vo.Gender;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostOption;
import com.votogether.domain.vote.entity.Vote;
import com.votogether.domain.vote.repository.dto.VoteCountByAgeGroupAndGenderDto;
import com.votogether.domain.vote.repository.dto.VoteCountByAgeGroupAndGenderInterface;
import com.votogether.test.RepositoryTest;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class VoteRepositoryTest extends RepositoryTest {

    @Autowired
    VoteRepository voteRepository;

    @Test
    @DisplayName("연령대, 성별로 그릅화하여 게시글 총 투표 수를 집계한다.")
    void findPostVoteCountByAgeGroupAndGender() {
        // given
        Member memberA = memberTestPersister.builder().birthYear(2014).gender(Gender.MALE).save(); // 9세 남성
        Member memberB = memberTestPersister.builder().birthYear(2013).gender(Gender.FEMALE).save(); // 10세 여성
        Member memberC = memberTestPersister.builder().birthYear(1990).gender(Gender.FEMALE).save(); // 33세 여성
        Member memberD = memberTestPersister.builder().birthYear(1986).gender(Gender.MALE).save(); // 37세 남성
        Member memberE = memberTestPersister.builder().birthYear(1963).gender(Gender.MALE).save(); // 60세 남성
        Member memberF = memberTestPersister.builder().birthYear(1951).gender(Gender.FEMALE).save(); // 72세 여성
        Member memberG = memberTestPersister.builder().birthYear(1936).gender(Gender.FEMALE).save(); // 87세 여성
        Member memberH = memberTestPersister.builder().birthYear(1924).gender(Gender.FEMALE).save(); // 99세 여성
        Post post = postTestPersister.postBuilder().save();
        PostOption postOptionA = postTestPersister.postOptionBuilder().post(post).sequence(1).save();
        PostOption postOptionB = postTestPersister.postOptionBuilder().post(post).sequence(2).save();
        voteTestPersister.builder().postOption(postOptionA).member(memberA).save();
        voteTestPersister.builder().postOption(postOptionA).member(memberB).save();
        voteTestPersister.builder().postOption(postOptionA).member(memberC).save();
        voteTestPersister.builder().postOption(postOptionA).member(memberD).save();
        voteTestPersister.builder().postOption(postOptionB).member(memberE).save();
        voteTestPersister.builder().postOption(postOptionB).member(memberF).save();
        voteTestPersister.builder().postOption(postOptionB).member(memberG).save();
        voteTestPersister.builder().postOption(postOptionB).member(memberH).save();

        // when
        List<VoteCountByAgeGroupAndGenderInterface> voteCounts =
                voteRepository.findPostVoteCountByAgeGroupAndGender(post.getId());

        // then
        List<VoteCountByAgeGroupAndGenderDto> result = voteCounts.stream()
                .map(VoteCountByAgeGroupAndGenderDto::from)
                .toList();
        List<VoteCountByAgeGroupAndGenderDto> expected = List.of(
                new VoteCountByAgeGroupAndGenderDto(0, Gender.MALE, 1),
                new VoteCountByAgeGroupAndGenderDto(1, Gender.FEMALE, 1),
                new VoteCountByAgeGroupAndGenderDto(3, Gender.MALE, 1),
                new VoteCountByAgeGroupAndGenderDto(3, Gender.FEMALE, 1),
                new VoteCountByAgeGroupAndGenderDto(6, Gender.MALE, 1),
                new VoteCountByAgeGroupAndGenderDto(6, Gender.FEMALE, 3)
        );
        assertThat(result).usingRecursiveComparison().isEqualTo(expected);
    }

    @Test
    @DisplayName("연령대, 성별로 그릅화하여 게시글 옵션 총 투표 수를 집계한다.")
    void findPostOptionVoteCountByAgeGroupAndGender() {
        // given
        Member memberA = memberTestPersister.builder().birthYear(2014).gender(Gender.MALE).save(); // 9세 남성
        Member memberB = memberTestPersister.builder().birthYear(2013).gender(Gender.FEMALE).save(); // 10세 여성
        Member memberC = memberTestPersister.builder().birthYear(1990).gender(Gender.FEMALE).save(); // 33세 여성
        Member memberD = memberTestPersister.builder().birthYear(1986).gender(Gender.MALE).save(); // 37세 남성
        Post post = postTestPersister.postBuilder().save();
        PostOption postOption = postTestPersister.postOptionBuilder().post(post).sequence(1).save();
        voteTestPersister.builder().postOption(postOption).member(memberA).save();
        voteTestPersister.builder().postOption(postOption).member(memberB).save();
        voteTestPersister.builder().postOption(postOption).member(memberC).save();
        voteTestPersister.builder().postOption(postOption).member(memberD).save();

        // when
        List<VoteCountByAgeGroupAndGenderInterface> voteCounts =
                voteRepository.findPostOptionVoteCountByAgeGroupAndGender(postOption.getId());

        // then
        List<VoteCountByAgeGroupAndGenderDto> result = voteCounts.stream()
                .map(VoteCountByAgeGroupAndGenderDto::from)
                .toList();
        List<VoteCountByAgeGroupAndGenderDto> expected = List.of(
                new VoteCountByAgeGroupAndGenderDto(0, Gender.MALE, 1),
                new VoteCountByAgeGroupAndGenderDto(1, Gender.FEMALE, 1),
                new VoteCountByAgeGroupAndGenderDto(3, Gender.MALE, 1),
                new VoteCountByAgeGroupAndGenderDto(3, Gender.FEMALE, 1)
        );
        assertThat(result).usingRecursiveComparison().isEqualTo(expected);
    }

    @Nested
    @DisplayName("게시글의 회원 투표 조회")
    class FindVoteByPostAndMember {

        @Test
        @DisplayName("투표가 존재하면 투표를 반환한다.")
        void findVote() {
            // given
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().save();
            PostOption postOption = postTestPersister.postOptionBuilder().post(post).sequence(1).save();
            voteTestPersister.builder().postOption(postOption).member(member).save();

            // when
            Optional<Vote> result = voteRepository.findByMemberAndPostOptionPost(member, post);

            // then
            assertThat(result).isPresent();
        }

        @Test
        @DisplayName("투표가 존재하지 않으면 빈 값을 반환한다.")
        void findEmpty() {
            // given
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().save();

            // when
            Optional<Vote> result = voteRepository.findByMemberAndPostOptionPost(member, post);

            // then
            assertThat(result).isNotPresent();
        }

    }

    @Nested
    @DisplayName("게시글 옵션의 회원 투표 조회")
    class FindVoteByPostOptionAndMember {

        @Test
        @DisplayName("투표가 존재하면 투표를 반환한다.")
        void findVote() {
            // given
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().save();
            PostOption postOption = postTestPersister.postOptionBuilder().post(post).sequence(1).save();
            voteTestPersister.builder().postOption(postOption).member(member).save();

            // when
            Optional<Vote> result = voteRepository.findByMemberAndPostOption(member, postOption);

            // then
            assertThat(result).isPresent();
        }

        @Test
        @DisplayName("투표가 존재하지 않으면 빈 값을 반환한다.")
        void findEmpty() {
            // given
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().save();
            PostOption postOption = postTestPersister.postOptionBuilder().post(post).sequence(1).save();

            // when
            Optional<Vote> result = voteRepository.findByMemberAndPostOption(member, postOption);

            // then
            assertThat(result).isNotPresent();
        }

    }

    @Nested
    @DisplayName("게시글 옵션 목록의 회원 투표 조회")
    class FindVoteByPostOptionsAndMember {

        @Test
        @DisplayName("투표가 존재하면 투표를 반환한다.")
        void findVote() {
            // given
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().save();
            PostOption postOptionA = postTestPersister.postOptionBuilder().post(post).sequence(1).save();
            PostOption postOptionB = postTestPersister.postOptionBuilder().post(post).sequence(2).save();
            Vote vote = voteTestPersister.builder().postOption(postOptionB).member(member).save();

            // when
            List<Vote> result =
                    voteRepository.findAllByMemberAndPostOptionIn(member, List.of(postOptionA, postOptionB));

            // then
            assertThat(result).containsExactly(vote);
        }

        @Test
        @DisplayName("투표가 존재하지 않으면 빈 값을 반환한다.")
        void findEmpty() {
            // given
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().save();
            PostOption postOptionA = postTestPersister.postOptionBuilder().post(post).sequence(1).save();
            PostOption postOptionB = postTestPersister.postOptionBuilder().post(post).sequence(2).save();

            // when
            List<Vote> result =
                    voteRepository.findAllByMemberAndPostOptionIn(member, List.of(postOptionA, postOptionB));

            // then
            assertThat(result).isEmpty();
        }

    }

    @Nested
    @DisplayName("회원의 모든 투표 조회")
    class FindVotesByMember {

        @Test
        @DisplayName("투표가 존재하면 모든 투표를 조회한다.")
        void findVotes() {
            // given
            Member member = memberTestPersister.builder().save();
            PostOption postOptionA = postTestPersister.postOptionBuilder().sequence(1).save();
            PostOption postOptionB = postTestPersister.postOptionBuilder().sequence(1).save();
            Vote voteA = voteTestPersister.builder().postOption(postOptionA).member(member).save();
            Vote voteB = voteTestPersister.builder().postOption(postOptionB).member(member).save();

            // when
            List<Vote> result = voteRepository.findAllByMember(member);

            // then
            assertThat(result).containsExactly(voteA, voteB);
        }

        @Test
        @DisplayName("투표가 존재하지 않으면 빈 값을 반환한다.")
        void findEmpty() {
            // given
            Member member = memberTestPersister.builder().save();

            // when
            List<Vote> result = voteRepository.findAllByMember(member);

            // then
            assertThat(result).isEmpty();
        }

    }

    @Test
    @DisplayName("회원의 투표 수를 조회한다.")
    void countVotesByMember() {
        // given
        Member member = memberTestPersister.builder().save();
        PostOption postOptionA = postTestPersister.postOptionBuilder().sequence(1).save();
        PostOption postOptionB = postTestPersister.postOptionBuilder().sequence(1).save();
        voteTestPersister.builder().postOption(postOptionA).member(member).save();
        voteTestPersister.builder().postOption(postOptionB).member(member).save();

        // when
        int result = voteRepository.countByMember(member);

        // then
        assertThat(result).isEqualTo(2);
    }

    @Test
    @DisplayName("게시글의 모든 투표를 삭제한다.")
    void deleteAllWithPostIdInBatch() {
        // given
        Post post = postTestPersister.postBuilder().save();
        PostOption postOptionA = postTestPersister.postOptionBuilder().post(post).sequence(1).save();
        PostOption postOptionB = postTestPersister.postOptionBuilder().post(post).sequence(2).save();
        voteTestPersister.builder().postOption(postOptionA).save();
        voteTestPersister.builder().postOption(postOptionA).save();
        voteTestPersister.builder().postOption(postOptionB).save();
        voteTestPersister.builder().postOption(postOptionB).save();

        // when
        voteRepository.deleteAllWithPostOptionIdsInBatch(List.of(postOptionA.getId(), postOptionB.getId()));

        // then
        assertThat(voteRepository.findAll()).isEmpty();
    }

}
