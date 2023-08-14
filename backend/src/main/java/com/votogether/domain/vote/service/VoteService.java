package com.votogether.domain.vote.service;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostOption;
import com.votogether.domain.post.entity.PostOptions;
import com.votogether.domain.post.repository.PostOptionRepository;
import com.votogether.domain.post.repository.PostRepository;
import com.votogether.domain.vote.entity.Vote;
import com.votogether.domain.vote.repository.VoteRepository;
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
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다."));

        validateAlreadyVoted(member, post);

        final PostOption postOption = postOptionRepository.findById(postOptionId)
                .orElseThrow(() -> new IllegalArgumentException("해당 선택지가 존재 하지 않습니다."));

        final Vote vote = post.makeVote(member, postOption);
        voteRepository.save(vote);
    }


    private void validateAlreadyVoted(final Member member, final Post post) {
        final PostOptions postOptions = post.getPostOptions();
        final List<Vote> alreadyVoted =
                voteRepository.findAllByMemberAndPostOptionIn(member, postOptions.getPostOptions());
        if (!alreadyVoted.isEmpty()) {
            throw new IllegalStateException("해당 게시물에는 이미 투표하였습니다.");
        }
    }

    public void changeVote(
            final Member member,
            final Long postId,
            final Long originPostOptionId,
            final Long newPostOptionId
    ) {
        final Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다."));

        final PostOption originPostOption = postOptionRepository.findById(originPostOptionId)
                .orElseThrow(() -> new IllegalArgumentException("헤당 선택지가 존재하지 않습니다."));

        final Vote originVote = voteRepository.findByMemberAndPostOption(member, originPostOption)
                .orElseThrow(() -> new IllegalArgumentException("선택지에 해당되는 투표가 존재하지 않습니다."));

        final PostOption newPostOption = postOptionRepository.findById(newPostOptionId)
                .orElseThrow(() -> new IllegalArgumentException("헤당 선택지가 존재하지 않습니다."));

        voteRepository.delete(originVote);
        final Vote vote = post.makeVote(member, newPostOption);
        voteRepository.save(vote);
    }

}
