package com.votogether.domain.post.service;

import com.votogether.domain.alarm.dto.event.PostAlarmEvent;
import com.votogether.domain.alarm.entity.vo.AlarmType;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.dto.request.comment.CommentCreateRequest;
import com.votogether.domain.post.dto.request.comment.CommentUpdateRequest;
import com.votogether.domain.post.dto.response.comment.CommentResponse;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.comment.Comment;
import com.votogether.domain.post.exception.CommentExceptionType;
import com.votogether.domain.post.exception.PostExceptionType;
import com.votogether.domain.post.repository.CommentRepository;
import com.votogether.domain.post.repository.PostRepository;
import com.votogether.global.exception.BadRequestException;
import com.votogether.global.exception.NotFoundException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class PostCommentService {

    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    private final ApplicationEventPublisher applicationEventPublisher;

    @Transactional(readOnly = true)
    public List<CommentResponse> getComments(final Long postId) {
        final Post post = postRepository.findById(postId)
                .orElseThrow(() -> new NotFoundException(PostExceptionType.NOT_FOUND));
        validateHiddenPost(post);

        return commentRepository.findAllByPostAndIsHiddenFalseOrderByIdAsc(post)
                .stream()
                .map(CommentResponse::from)
                .toList();
    }

    @Transactional
    public void createComment(
            final Long postId,
            final CommentCreateRequest commentCreateRequest,
            final Member loginMember
    ) {
        final Post post = postRepository.findById(postId)
                .orElseThrow(() -> new NotFoundException(PostExceptionType.NOT_FOUND));
        validateHiddenPost(post);

        final Comment comment = Comment.builder()
                .writer(loginMember)
                .content(commentCreateRequest.content())
                .build();
        post.addComment(comment);

        publishAlarmEvent(loginMember, post);
    }

    private void publishAlarmEvent(final Member loginMember, final Post post) {
        if (post.isWriter(loginMember)) {
            return;
        }
        final PostAlarmEvent postAlarmEvent = new PostAlarmEvent(
                post.getWriter(),
                loginMember.getNickname(),
                post.getId(),
                AlarmType.COMMENT,
                post.getTitle()
        );
        applicationEventPublisher.publishEvent(postAlarmEvent);
    }

    @Transactional
    public void updateComment(
            final Long postId,
            final Long commentId,
            final CommentUpdateRequest commentUpdateRequest,
            final Member loginMember
    ) {
        final Post post = postRepository.findById(postId)
                .orElseThrow(() -> new NotFoundException(PostExceptionType.NOT_FOUND));
        final Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new NotFoundException(CommentExceptionType.NOT_FOUND));

        validateHiddenPost(post);
        validateHiddenComment(comment);
        validateBelongsToPost(comment, post);
        validateWriter(comment, loginMember);

        comment.updateContent(commentUpdateRequest.content());
    }

    @Transactional
    public void deleteComment(final Long postId, final Long commentId, final Member loginMember) {
        final Post post = postRepository.findById(postId)
                .orElseThrow(() -> new NotFoundException(PostExceptionType.NOT_FOUND));
        final Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new NotFoundException(CommentExceptionType.NOT_FOUND));

        validateHiddenPost(post);
        validateHiddenComment(comment);
        validateBelongsToPost(comment, post);
        validateWriter(comment, loginMember);

        commentRepository.delete(comment);
    }

    private void validateHiddenPost(final Post post) {
        if (post.isHidden()) {
            throw new BadRequestException(PostExceptionType.IS_HIDDEN);
        }
    }

    private void validateHiddenComment(final Comment comment) {
        if (comment.isHidden()) {
            throw new BadRequestException(CommentExceptionType.IS_HIDDEN);
        }
    }

    private void validateBelongsToPost(final Comment comment, final Post post) {
        if (!comment.belongsTo(post)) {
            throw new BadRequestException(CommentExceptionType.NOT_BELONG_POST);
        }
    }

    private void validateWriter(final Comment comment, final Member member) {
        if (!comment.isWriter(member)) {
            throw new BadRequestException(CommentExceptionType.NOT_WRITER);
        }
    }

}
