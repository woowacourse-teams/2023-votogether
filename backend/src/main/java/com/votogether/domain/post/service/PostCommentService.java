package com.votogether.domain.post.service;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.dto.request.comment.CommentRegisterRequest;
import com.votogether.domain.post.dto.request.comment.CommentUpdateRequest;
import com.votogether.domain.post.dto.response.comment.CommentResponse;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.comment.Comment;
import com.votogether.domain.post.exception.CommentExceptionType;
import com.votogether.domain.post.exception.PostExceptionType;
import com.votogether.domain.post.repository.CommentRepository;
import com.votogether.domain.post.repository.PostRepository;
import com.votogether.global.exception.NotFoundException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class PostCommentService {

    private final PostRepository postRepository;
    private final CommentRepository commentRepository;

    @Transactional
    public void createComment(
            final Member member,
            final Long postId,
            final CommentRegisterRequest commentRegisterRequest
    ) {
        final Post post = postRepository.findById(postId)
                .orElseThrow(() -> new NotFoundException(PostExceptionType.POST_NOT_FOUND));

        final Comment comment = Comment.builder()
                .member(member)
                .content(commentRegisterRequest.content())
                .build();

        post.addComment(comment);
    }

    @Transactional(readOnly = true)
    public List<CommentResponse> getComments(final Long postId) {
        final Post post = postRepository.findById(postId)
                .orElseThrow(() -> new NotFoundException(PostExceptionType.POST_NOT_FOUND));

        return commentRepository.findAllByPostOrderByCreatedAtAsc(post)
                .stream()
                .map(CommentResponse::from)
                .toList();
    }

    @Transactional
    public void updateComment(
            final Long postId,
            final Long commentId,
            final CommentUpdateRequest commentUpdateRequest,
            final Member member
    ) {
        final Post post = postRepository.findById(postId)
                .orElseThrow(() -> new NotFoundException(PostExceptionType.POST_NOT_FOUND));
        final Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new NotFoundException(CommentExceptionType.COMMENT_NOT_FOUND));

        comment.validateBelong(post);
        comment.validateWriter(member);

        comment.updateContent(commentUpdateRequest.content());
    }

    @Transactional
    public void deleteComment(final Long postId, final Long commentId, final Member member) {
        final Post post = postRepository.findById(postId)
                .orElseThrow(() -> new NotFoundException(PostExceptionType.POST_NOT_FOUND));
        final Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new NotFoundException(CommentExceptionType.COMMENT_NOT_FOUND));

        comment.validateBelong(post);
        comment.validateWriter(member);

        commentRepository.delete(comment);
    }

}
