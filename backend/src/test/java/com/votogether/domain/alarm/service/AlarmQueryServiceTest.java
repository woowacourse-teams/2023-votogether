package com.votogether.domain.alarm.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

import com.votogether.domain.alarm.dto.response.ReportActionAlarmResponse;
import com.votogether.domain.alarm.dto.response.ReportActionResponse;
import com.votogether.domain.alarm.dto.response.PostAlarmDetailResponse;
import com.votogether.domain.alarm.dto.response.PostAlarmResponse;
import com.votogether.domain.alarm.entity.ReportActionAlarm;
import com.votogether.domain.alarm.repository.ReportActionAlarmRepository;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.dto.request.comment.CommentCreateRequest;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.service.PostCommandService;
import com.votogether.domain.post.service.PostCommentService;
import com.votogether.domain.report.entity.vo.ReportType;
import com.votogether.test.ServiceTest;
import java.util.List;
import java.util.Set;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.jdbc.Sql.ExecutionPhase;
import org.springframework.test.context.transaction.TestTransaction;

@Sql(scripts = "classpath:truncate.sql", executionPhase = ExecutionPhase.AFTER_TEST_METHOD)
class AlarmQueryServiceTest extends ServiceTest {

    @Autowired
    AlarmQueryService alarmQueryService;

    @Autowired
    PostCommentService postCommentService;

    @Autowired
    PostCommandService postCommandService;

    @Autowired
    ReportActionAlarmRepository reportActionAlarmRepository;

    @Nested
    @DisplayName("알림 조회는 ")
    class GetPostAlarm {

        @Test
        @DisplayName("댓글을 생성할 때 가능하다.")
        void whenCreateComment() throws Exception {
            // given
            Member commentWriter = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().save();
            CommentCreateRequest commentCreateRequest = new CommentCreateRequest("댓글입니다.");

            postCommentService.createComment(post.getId(), commentCreateRequest, commentWriter);

            TestTransaction.flagForCommit();
            TestTransaction.end();

            Thread.sleep(1000);

            // when
            List<PostAlarmResponse> postAlarmResponses = alarmQueryService.getPostAlarm(post.getWriter(), 0);

            // then
            PostAlarmResponse postAlarmResponse = postAlarmResponses.get(0);
            PostAlarmDetailResponse postAlarmDetailResponse = postAlarmResponse.detail();
            assertSoftly(softly -> {
                softly.assertThat(postAlarmResponses).hasSize(1);
                softly.assertThat(postAlarmResponse.isChecked()).isEqualTo(false);
                softly.assertThat(postAlarmDetailResponse.postTitle()).isEqualTo("title");
            });
        }

        @Test
        @DisplayName("게시글이 마감완료가 되었을 때 가능하다.")
        void whenPostClosed() throws Exception {
            // given
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().writer(member).save();

            postCommandService.closePostEarly(post.getId(), member);

            TestTransaction.flagForCommit();
            TestTransaction.end();

            Thread.sleep(1000);

            // when
            List<PostAlarmResponse> postAlarmResponses = alarmQueryService.getPostAlarm(member, 0);

            // then
            PostAlarmResponse postAlarmResponse = postAlarmResponses.get(0);
            PostAlarmDetailResponse postAlarmDetailResponse = postAlarmResponse.detail();
            assertSoftly(softly -> {
                softly.assertThat(postAlarmResponses).hasSize(1);
                softly.assertThat(postAlarmResponse.isChecked()).isEqualTo(false);
                softly.assertThat(postAlarmDetailResponse.postTitle()).isEqualTo("title");
            });
        }

        @Test
        @DisplayName("어떠한 이벤트도 발생하지 않았다면 빈 리스트가 조회된다.")
        void getEmptyListWhenNoEventOccurs() {
            // given
            Member member = memberTestPersister.builder().save();

            // when
            List<PostAlarmResponse> postAlarmResponses = alarmQueryService.getPostAlarm(member, 0);

            // then
            assertThat(postAlarmResponses).hasSize(0);
        }

    }

    @Test
    @DisplayName("신고조치알림 목록을 조회한다.")
    void getReportActionAlarms() {
        // given
        Member member = memberTestPersister.builder().save();

        ReportActionAlarm reportActionAlarmA = ReportActionAlarm.builder()
                .reportType(ReportType.POST)
                .member(member)
                .isChecked(false)
                .reasons("광고성, 부적합성")
                .target("1")
                .build();

        reportActionAlarmRepository.save(reportActionAlarmA);

        // when
        List<ReportActionAlarmResponse> reportActionAlarms = alarmQueryService.getReportActionAlarms(member, 0);

        // then
        ReportActionAlarmResponse result = reportActionAlarms.get(0);
        assertSoftly(softly -> {
            softly.assertThat(reportActionAlarms).hasSize(1);
            softly.assertThat(result.alarmId()).isNotNull();
            softly.assertThat(result.isChecked()).isFalse();
            softly.assertThat(result.detail().reportActionId()).isNotNull();
            softly.assertThat(result.detail().content()).isEqualTo("1");
            softly.assertThat(result.detail().reasons()).containsAll(Set.of("광고성", "부적합성"));
            softly.assertThat(result.detail().type()).isEqualTo(ReportType.POST);
        });
    }

    @Test
    @DisplayName("신고 조치 알림을 상세 조회한다.")
    void getReportActionAlarm() {
        // given
        Member member = memberTestPersister.builder().save();

        ReportActionAlarm reportActionAlarmA = ReportActionAlarm.builder()
                .reportType(ReportType.POST)
                .member(member)
                .isChecked(false)
                .reasons("광고성, 부적합성")
                .target("1")
                .build();

        ReportActionAlarm savedReportActionAlarm = reportActionAlarmRepository.save(reportActionAlarmA);

        // when
        ReportActionResponse response = alarmQueryService.getReportActionAlarm(savedReportActionAlarm.getId(), member);

        // then
        assertSoftly(softly -> {
            softly.assertThat(response.reportActionId()).isEqualTo(savedReportActionAlarm.getId());
            softly.assertThat(response.type()).isEqualTo(ReportType.POST);
            softly.assertThat(response.content()).isEqualTo("1");
            softly.assertThat(response.reasons()).containsAll(Set.of("광고성", "부적합성"));
        });
    }

}
