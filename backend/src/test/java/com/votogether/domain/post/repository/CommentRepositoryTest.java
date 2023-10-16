package com.votogether.domain.post.repository;

import static org.assertj.core.api.Assertions.assertThat;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.comment.Comment;
import com.votogether.test.RepositoryTest;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class CommentRepositoryTest extends RepositoryTest {

    @Autowired
    CommentRepository commentRepository;

    @Test
    @DisplayName("게시글의 댓글 목록을 조회한다.")
    void findAllByPost() {
        // given
        Member writer = memberTestPersister.builder().save();
        Post post = postTestPersister.postBuilder().writer(writer).save();
        Comment commentA = commentTestPersister.builder().post(post).writer(writer).save();
        Comment commentB = commentTestPersister.builder().post(post).writer(writer).save();

        // when
        List<Comment> comments = commentRepository.findAllByPostAndIsHiddenFalseOrderByIdAsc(post);

        // then
        assertThat(comments).containsExactly(commentA, commentB);
    }

    @Test
    @DisplayName("작성자의 댓글 목록을 조회한다.")
    void findAllByWriter() {
        // given
        Member writer = memberTestPersister.builder().save();
        Comment commentA = commentTestPersister.builder().writer(writer).save();
        Comment commentB = commentTestPersister.builder().writer(writer).save();

        // when
        List<Comment> comments = commentRepository.findAllByWriter(writer);

        // then
        assertThat(comments).containsExactly(commentA, commentB);
    }

    @Test
    @DisplayName("게시글의 모든 댓글을 삭제한다.")
    void deleteAllWithPostIdInBatch() {
        // given
        Member writer = memberTestPersister.builder().save();
        Post post = postTestPersister.postBuilder().save();
        commentTestPersister.builder().writer(writer).post(post).save();
        commentTestPersister.builder().writer(writer).post(post).save();
        commentTestPersister.builder().writer(writer).post(post).save();

        // when
        commentRepository.deleteAllWithPostIdInBatch(post.getId());

        // then
        assertThat(commentRepository.findAll()).isEmpty();
    }

}
