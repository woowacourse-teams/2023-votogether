package com.votogether.domain.vote.service;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.MemberMetric;
import com.votogether.domain.member.exception.MemberExceptionType;
import com.votogether.domain.member.repository.MemberMetricRepository;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostOption;
import com.votogether.domain.post.exception.PostExceptionType;
import com.votogether.domain.post.exception.PostOptionExceptionType;
import com.votogether.domain.post.repository.PostOptionRepository;
import com.votogether.domain.post.repository.PostRepository;
import com.votogether.domain.vote.entity.Vote;
import com.votogether.domain.vote.exception.VoteExceptionType;
import com.votogether.domain.vote.repository.VoteRepository;
import com.votogether.global.exception.BadRequestException;
import com.votogether.global.exception.NotFoundException;
import java.util.List;
import java.util.Objects;
import java.util.stream.Stream;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class VoteService {

    private final VoteRepository voteRepository;
    private final PostRepository postRepository;
    private final PostOptionRepository postOptionRepository;
    private final MemberMetricRepository memberMetricRepository;

    public void vote(
            final Member member,
            final Long postId,
            final Long postOptionId
    ) {
        final Post post = postRepository.findByIdForUpdate(postId)
                .orElseThrow(() -> new NotFoundException(PostExceptionType.NOT_FOUND));

        validateAlreadyVoted(member, post);

        final PostOption postOption = postOptionRepository.findByIdForUpdate(postOptionId)
                .orElseThrow(() -> new NotFoundException(PostOptionExceptionType.NOT_FOUND));
        final MemberMetric memberMetric = memberMetricRepository.findByMemberIdForUpdate(member.getId())
                .orElseThrow(() -> new NotFoundException(MemberExceptionType.NOT_FOUND_METRIC));
        final int voteCount = voteRepository.countByMember(member);

        final Vote vote = post.makeVote(member, postOption);
        voteRepository.save(vote);
        memberMetric.updateVoteCount(voteCount + 1);
        post.increaseVoteCount();
        postOption.increaseVoteCount();
    }

    private void validateAlreadyVoted(final Member member, final Post post) {
        final List<PostOption> postOptions = post.getPostOptions();
        final List<Vote> alreadyVoted =
                voteRepository.findAllByMemberAndPostOptionIn(member, postOptions);
        if (!alreadyVoted.isEmpty()) {
            throw new BadRequestException(VoteExceptionType.ALREADY_VOTED);
        }
    }

    public void changeVote(
            final Member member,
            final Long postId,
            final Long originPostOptionId,
            final Long newPostOptionId
    ) {
        final Post post = postRepository.findById(postId)
                .orElseThrow(() -> new NotFoundException(PostExceptionType.NOT_FOUND));

        final List<PostOption> postOptions = Stream.of(originPostOptionId, newPostOptionId)
                .sorted()
                .map(postOptionRepository::findByIdForUpdate)
                .map(postOption -> postOption.orElseThrow(
                        () -> new NotFoundException(PostOptionExceptionType.NOT_FOUND)))
                .toList();

        final PostOption originPostOption = getPostOptionById(postOptions, originPostOptionId);
        final PostOption newPostOption = getPostOptionById(postOptions, newPostOptionId);

        final Vote originVote = voteRepository.findByMemberAndPostOption(member, originPostOption)
                .orElseThrow(() -> new NotFoundException(VoteExceptionType.NOT_FOUND));

        voteRepository.delete(originVote);
        final Vote vote = post.makeVote(member, newPostOption);
        voteRepository.save(vote);
        originPostOption.decreaseVoteCount();
        newPostOption.increaseVoteCount();
    }

    private PostOption getPostOptionById(final List<PostOption> postOptions, final Long id) {
        return postOptions.stream()
                .filter(postOption -> Objects.equals(postOption.getId(), id))
                .findAny()
                .orElseThrow(() -> new NotFoundException(PostOptionExceptionType.NOT_FOUND));
    }

}
