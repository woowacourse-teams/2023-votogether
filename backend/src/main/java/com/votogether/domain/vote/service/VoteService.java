package com.votogether.domain.vote.service;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostOption;
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

    public void vote(
            final Member member,
            final Long postId,
            final Long postOptionId
    ) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("게시글이 존재하지 않습니다."));
        validateDeadLine(post);

        List<Long> postOptionIdsInPost = post.getPostOptions().stream()
                .map(postOption -> postOption.getId())
                .toList();

        List<Vote> alreadyVoted = voteRepository.findByMemberIdAndPostOptionIdIn(member.getId(), postOptionIdsInPost);
        if (!alreadyVoted.isEmpty()) {
            throw new IllegalStateException("해당 게시물에는 이미 투표하였습니다.");
        }

        Vote newVote = member.vote(post, postOptionId);
        member.plusPoint(1);

        voteRepository.save(newVote);
    }

    private void validateDeadLine(final Post post) {
        if (post.isClosed()) {
            throw new IllegalStateException("게시글이 마감되었습니다.");
        }
    }

    public void changeVote(
            final Member member,
            final Long postId,
            final Long originPostOptionId,
            final Long newPostOptionId
    ) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("게시글이 존재하지 않습니다."));
        validateDeadLine(post);

        Vote vote = voteRepository.findByMemberIdAndPostOptionId(member.getId(), originPostOptionId)
                .orElseThrow(() -> new IllegalArgumentException("선택지에 해당되는 투표가 존재하지 않습니다."));

        PostOption postOption = post.findPostOptionById(newPostOptionId);

        vote.changePostOption(postOption);
    }

}
