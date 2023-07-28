package com.votogether.domain.post.service;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.dto.request.CommentRegisterRequest;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.comment.Comment;
import com.votogether.domain.post.exception.PostExceptionType;
import com.votogether.domain.post.repository.PostRepository;
import com.votogether.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class PostCommentService {

    private final PostRepository postRepository;

    @Transactional
    public void createComment(
            final Member member,
            final Long postId,
            final CommentRegisterRequest commentRegisterRequest
    ) {
        final Post post = postRepository.findById(postId)
                .orElseThrow(() -> new BadRequestException(PostExceptionType.POST_NOT_FOUND));

        final Comment comment = Comment.builder()
                .member(member)
                .content(commentRegisterRequest.content())
                .build();

        post.addComment(comment);
    }

}
