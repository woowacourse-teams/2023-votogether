package com.votogether.domain.alarm.entity.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

import com.votogether.domain.alarm.dto.response.PostAlarmDetailResponse;
import com.votogether.domain.alarm.dto.response.PostAlarmResponse;
import com.votogether.domain.alarm.service.AlarmService;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.dto.request.comment.CommentCreateRequest;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.service.PostCommandService;
import com.votogether.domain.post.service.PostCommentService;
import com.votogether.test.ServiceTest;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.jdbc.Sql.ExecutionPhase;
import org.springframework.test.context.transaction.TestTransaction;

@Sql(scripts = "classpath:truncate.sql", executionPhase = ExecutionPhase.AFTER_TEST_METHOD)
class AlarmServiceTest extends ServiceTest {

    @Autowired
    private AlarmService alarmService;

    @Autowired
    private PostCommentService postCommentService;

    @Autowired
    private PostCommandService postCommandService;

    @Nested
    @DisplayName("알림 조회는 ")
    class GetPostAlarm {

        @Test
        @DisplayName("댓글을 생성할 때 가능하다.")
        void whenCreateComment() {
            // given
            Member commentWriter = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().save();
            CommentCreateRequest commentCreateRequest = new CommentCreateRequest("댓글입니다.");

            postCommentService.createComment(post.getId(), commentCreateRequest, commentWriter);

            TestTransaction.flagForCommit();
            TestTransaction.end();

            // when
            List<PostAlarmResponse> postAlarmResponses = alarmService.getPostAlarm(0);

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
            List<PostAlarmResponse> postAlarmResponses = alarmService.getPostAlarm(0);

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
            // given, when
            List<PostAlarmResponse> postAlarmResponses = alarmService.getPostAlarm(0);

            // then
            assertThat(postAlarmResponses).hasSize(0);
        }

    }

}
