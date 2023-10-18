package com.votogether.domain.vote.service;

import com.votogether.domain.member.entity.Member;
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

    public void vote(
            final Member member,
            final Long postId,
            final Long postOptionId
    ) {
        final Post post = postRepository.findById(postId)
                .orElseThrow(() -> new NotFoundException(PostExceptionType.NOT_FOUND));

        final PostOption postOption = postOptionRepository.findById(postOptionId)
                .orElseThrow(() -> new NotFoundException(PostOptionExceptionType.NOT_FOUND));

        validateAlreadyVoted(member, post);
        final Vote vote = createVote(member, post, postOption);
        voteRepository.save(vote);
    }

    private Vote createVote(final Member member, final Post post, final PostOption postOption) {
        validateDeadline(post);
        validatePostOption(post, postOption);

        final Vote vote = Vote.builder()
                .member(member)
                .postOption(postOption)
                .build();
        postOption.addVote(vote);
        return vote;
    }

    private void validatePostOption(final Post post, final PostOption postOption) {
        if (!post.hasPostOption(postOption)) {
            throw new BadRequestException(PostOptionExceptionType.NOT_FOUND);
        }
    }

    private void validateDeadline(final Post post) {
        if (post.isClosed()) {
            throw new BadRequestException(PostExceptionType.CLOSED);
        }
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

        final PostOption originPostOption = postOptionRepository.findById(originPostOptionId)
                .orElseThrow(() -> new NotFoundException(PostOptionExceptionType.NOT_FOUND));

        final Vote originVote = voteRepository.findByMemberAndPostOption(member, originPostOption)
                .orElseThrow(() -> new NotFoundException(VoteExceptionType.NOT_FOUND));

        final PostOption newPostOption = postOptionRepository.findById(newPostOptionId)
                .orElseThrow(() -> new NotFoundException(PostOptionExceptionType.NOT_FOUND));

        voteRepository.delete(originVote);
        final Vote newVote = createVote(member, post, newPostOption);
        voteRepository.save(newVote);
    }

}
