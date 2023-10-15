package com.votogether.domain.report.service.strategy;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.dto.response.post.PostResponse;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.vo.PostClosingType;
import com.votogether.domain.post.entity.vo.PostSortType;
import com.votogether.domain.post.service.PostGuestService;
import com.votogether.domain.report.dto.request.ReportRequest;
import com.votogether.domain.report.entity.vo.ReportType;
import com.votogether.global.exception.BadRequestException;
import com.votogether.global.exception.NotFoundException;
import com.votogether.test.ServiceTest;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

@DisplayName("게시글 신고 기능은")
class ReportPostStrategyTest extends ServiceTest {

    @Autowired
    ReportPostStrategy reportPostStrategy;

    @Autowired
    PostGuestService postGuestService;

    @Test
    @DisplayName("정상적으로 동작한다.")
    void reportPost() {
        // given
        Member reporter = memberTestPersister.builder().save();
        Post post = postTestPersister.postBuilder().save();
        ReportRequest request = new ReportRequest(ReportType.POST, post.getId(), "불건전한 게시글");

        // when, then
        assertDoesNotThrow(() -> reportPostStrategy.report(reporter, request));
    }

    @Test
    @DisplayName("없는 투표글을 신고하는 경우 예외가 발생한다.")
    void reportNonExistPostThrowsException() {
        // given
        Member writer = memberTestPersister.builder().save();
        ReportRequest request = new ReportRequest(ReportType.POST, -1L, "불건전한 게시글");

        // when, then
        assertThatThrownBy(() -> reportPostStrategy.report(writer, request))
                .isInstanceOf(NotFoundException.class)
                .hasMessage("게시글이 존재하지 않습니다.");
    }

    @Test
    @DisplayName("자신의 투표글을 신고하는 경우 예외가 발생한다.")
    void reportOwnPostThrowsException() {
        // given
        Member writer = memberTestPersister.builder().save();
        Post post = postTestPersister.postBuilder().writer(writer).save();
        ReportRequest request = new ReportRequest(ReportType.POST, post.getId(), "불건전한 게시글");

        // when, then
        assertThatThrownBy(() -> reportPostStrategy.report(writer, request))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("본인 게시글은 신고할 수 없습니다.");
    }

    @Test
    @DisplayName("블라인드 처리된 투표글을 신고하는 경우 예외가 발생한다.")
    void reportHiddenPost() {
        // given
        Member reporter = memberTestPersister.builder().save();
        Post post = postTestPersister.postBuilder().save();
        post.blind();
        ReportRequest request = new ReportRequest(ReportType.POST, post.getId(), "불건전한 게시글");

        // when, then
        assertThatThrownBy(() -> reportPostStrategy.report(reporter, request))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("신고에 의해 숨겨진 게시글은 접근할 수 없습니다.");
    }

    @Test
    @DisplayName("하나의 회원이 투표글을 중복하여 신고하면 예외를 던진다.")
    void reportDuplicated() {
        // given
        Member reporter = memberTestPersister.builder().save();
        Post post = postTestPersister.postBuilder().save();
        ReportRequest request = new ReportRequest(ReportType.POST, post.getId(), "불건전한 게시글");

        // when
        reportPostStrategy.report(reporter, request);

        // then
        assertThatThrownBy(() -> reportPostStrategy.report(reporter, request))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("하나의 글에 대해서 중복하여 신고할 수 없습니다.");
    }

    @Test
    @DisplayName("투표글 신고가 5회가 되면 블라인드 처리가 된다.")
    void reportAndBlind() {
        // given
        Member reporter1 = memberTestPersister.builder().save();
        Member reporter2 = memberTestPersister.builder().save();
        Member reporter3 = memberTestPersister.builder().save();
        Member reporter4 = memberTestPersister.builder().save();
        Member reporter5 = memberTestPersister.builder().save();
        Post post = postTestPersister.postBuilder().save();
        ReportRequest request = new ReportRequest(ReportType.POST, post.getId(), "불건전한 게시글");

        // when
        reportPostStrategy.report(reporter1, request);
        reportPostStrategy.report(reporter2, request);
        reportPostStrategy.report(reporter3, request);
        reportPostStrategy.report(reporter4, request);
        reportPostStrategy.report(reporter5, request);

        // then
        final List<PostResponse> responses = postGuestService.getPosts(
                0,
                PostClosingType.ALL,
                PostSortType.HOT,
                null
        );
        assertAll(
                () -> assertThat(post.isHidden()).isTrue(),
                () -> assertThat(responses).isEmpty()
        );
    }

    @Test
    @DisplayName("targetId를 통해 해당 멤버의 Nickname을 가져온다")
    void parseTarget() {
        // given
        Post post = postTestPersister.postBuilder().save();

        // when
        final String postId = reportPostStrategy.parseTarget(post.getId());

        // then
        assertThat(postId).isEqualTo(post.getId().toString());
    }

}
