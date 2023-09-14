package com.votogether.domain.report.service.strategy;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.*;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.repository.MemberRepository;
import com.votogether.domain.post.dto.response.post.PostResponse;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostBody;
import com.votogether.domain.post.entity.vo.PostClosingType;
import com.votogether.domain.post.entity.vo.PostSortType;
import com.votogether.domain.post.service.PostService;
import com.votogether.domain.report.dto.request.ReportRequest;
import com.votogether.domain.report.entity.vo.ReportType;
import com.votogether.global.exception.BadRequestException;
import com.votogether.global.exception.NotFoundException;
import com.votogether.test.annotation.ServiceTest;
import com.votogether.test.fixtures.MemberFixtures;
import com.votogether.test.persister.PostTestPersister;
import java.time.LocalDateTime;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

@ServiceTest
@DisplayName("게시글 신고 기능은")
class ReportPostStrategyTest {

    @Autowired
    ReportPostStrategy reportPostStrategy;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    PostTestPersister postTestPersister;

    @Autowired
    PostService postService;

    @Test
    @DisplayName("정상적으로 동작한다.")
    void reportPost() {
        // given
        Member reporter = memberRepository.save(MemberFixtures.FEMALE_60.get());
        Member writer = memberRepository.save(MemberFixtures.FEMALE_30.get());

        PostBody postBody = PostBody.builder()
                .title("title")
                .content("content")
                .build();

        Post post = postTestPersister.builder()
                .writer(writer)
                .postBody(postBody)
                .deadline(LocalDateTime.of(2100, 7, 12, 0, 0))
                .save();

        ReportRequest request = new ReportRequest(ReportType.POST, post.getId(), "불건전한 게시글");

        // when, then
        assertDoesNotThrow(() -> reportPostStrategy.report(reporter, request));
    }

    @Test
    @DisplayName("없는 투표글을 신고하는 경우 예외가 발생한다.")
    void reportNonExistPostThrowsException() {
        // given
        Member writer = memberRepository.save(MemberFixtures.FEMALE_30.get());

        ReportRequest request = new ReportRequest(ReportType.POST, -1L, "불건전한 게시글");

        // when, then
        assertThatThrownBy(() -> reportPostStrategy.report(writer, request))
                .isInstanceOf(NotFoundException.class)
                .hasMessage("해당 게시글이 존재하지 않습니다.");
    }

    @Test
    @DisplayName("자신의 투표글을 신고하는 경우 예외가 발생한다.")
    void reportOwnPostThrowsException() {
        // given
        Member writer = memberRepository.save(MemberFixtures.FEMALE_30.get());

        PostBody postBody = PostBody.builder()
                .title("title")
                .content("content")
                .build();

        Post post = postTestPersister.builder()
                .writer(writer)
                .postBody(postBody)
                .deadline(LocalDateTime.of(2100, 7, 12, 0, 0))
                .save();

        ReportRequest request = new ReportRequest(ReportType.POST, post.getId(), "불건전한 게시글");

        // when, then
        assertThatThrownBy(() -> reportPostStrategy.report(writer, request))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("자신의 게시글은 신고할 수 없습니다.");
    }

    @Test
    @DisplayName("블라인드 처리된 투표글을 신고하는 경우 예외가 발생한다.")
    void reportHiddenPost() {
        // given
        Member reporter = memberRepository.save(MemberFixtures.FEMALE_60.get());
        Member writer = memberRepository.save(MemberFixtures.FEMALE_30.get());

        PostBody postBody = PostBody.builder()
                .title("title")
                .content("content")
                .build();

        Post post = postTestPersister.builder()
                .writer(writer)
                .postBody(postBody)
                .deadline(LocalDateTime.of(2100, 7, 12, 0, 0))
                .blind()
                .save();

        ReportRequest request = new ReportRequest(ReportType.POST, post.getId(), "불건전한 게시글");

        // when, then

        assertThatThrownBy(() -> reportPostStrategy.report(reporter, request))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("이미 블라인드 처리된 글입니다.");
    }

    @Test
    @DisplayName("하나의 회원이 투표글을 중복하여 신고하면 예외를 던진다.")
    void reportDuplicated() {
        // given
        Member reporter = memberRepository.save(MemberFixtures.FEMALE_20.get());
        Member writer = memberRepository.save(MemberFixtures.FEMALE_10.get());

        PostBody postBody = PostBody.builder()
                .title("title")
                .content("content")
                .build();

        Post post = postTestPersister.builder()
                .writer(writer)
                .postBody(postBody)
                .deadline(LocalDateTime.of(2100, 7, 12, 0, 0))
                .save();

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
        Member reporter1 = memberRepository.save(MemberFixtures.FEMALE_20.get());
        Member reporter2 = memberRepository.save(MemberFixtures.FEMALE_30.get());
        Member reporter3 = memberRepository.save(MemberFixtures.FEMALE_40.get());
        Member reporter4 = memberRepository.save(MemberFixtures.FEMALE_50.get());
        Member reporter5 = memberRepository.save(MemberFixtures.FEMALE_60.get());
        Member writer = memberRepository.save(MemberFixtures.FEMALE_10.get());

        PostBody postBody = PostBody.builder()
                .title("title")
                .content("content")
                .build();

        Post post = postTestPersister.builder()
                .writer(writer)
                .postBody(postBody)
                .deadline(LocalDateTime.of(2100, 7, 12, 0, 0))
                .save();

        ReportRequest request = new ReportRequest(ReportType.POST, post.getId(), "불건전한 게시글");

        // when
        reportPostStrategy.report(reporter1, request);
        reportPostStrategy.report(reporter2, request);
        reportPostStrategy.report(reporter3, request);
        reportPostStrategy.report(reporter4, request);
        reportPostStrategy.report(reporter5, request);

        // then
        final List<PostResponse> responses = postService.getPostsGuest(
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
    
}
