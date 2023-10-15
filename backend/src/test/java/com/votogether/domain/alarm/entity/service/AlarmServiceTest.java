package com.votogether.domain.alarm.entity.service;

import static org.assertj.core.api.SoftAssertions.assertSoftly;

import com.votogether.domain.alarm.dto.response.PostAlarmResponse;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.dto.request.comment.CommentCreateRequest;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.service.PostCommentService;
import com.votogether.test.ServiceTest;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.transaction.TestTransaction;

class AlarmServiceTest extends ServiceTest {

    @Autowired
    private AlarmService alarmService;

    @Autowired
    private PostCommentService postCommentService;

    @Test
    @DisplayName("댓글을 생성할 때 알림이 조회 가능하다.")
    void getAlarm() {
        // given
        final Member commentWriter = memberTestPersister.builder().save();
        final Post post = postTestPersister.postBuilder().save();
        final CommentCreateRequest commentCreateRequest = new CommentCreateRequest("댓글입니다.");

        postCommentService.createComment(post.getId(), commentCreateRequest, commentWriter);

        TestTransaction.flagForCommit();
        TestTransaction.end();

        // when
        TestTransaction.start();
        final List<PostAlarmResponse> postAlarmResponses = alarmService.findPostAlarm(0);

        // then
        final PostAlarmResponse postAlarmResponse = postAlarmResponses.get(0);
        assertSoftly(softly -> {
            softly.assertThat(postAlarmResponses).hasSize(1);
            softly.assertThat(postAlarmResponse.isChecked()).isEqualTo(false);
            softly.assertThat(postAlarmResponse.postAlarmDetailResponse().title()).isEqualTo("title");
        });
    }

}
