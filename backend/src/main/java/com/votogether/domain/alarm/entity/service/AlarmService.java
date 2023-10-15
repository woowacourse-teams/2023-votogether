package com.votogether.domain.alarm.entity.service;

import com.votogether.domain.alarm.dto.response.PostAlarmDetailResponse;
import com.votogether.domain.alarm.dto.response.PostAlarmResponse;
import com.votogether.domain.alarm.entity.Alarm;
import com.votogether.domain.alarm.entity.repository.AlarmRepository;
import com.votogether.domain.alarm.entity.vo.AlarmType;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.repository.PostRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class AlarmService {

    private static final int BASIC_PAGE_SIZE = 10;

    private final AlarmRepository alarmRepository;
    private final PostRepository postRepository;

    @Transactional(readOnly = true)
    public List<PostAlarmResponse> findPostAlarm(final int page) {
        final PageRequest pageRequest = PageRequest.of(page, BASIC_PAGE_SIZE);
        final Slice<Alarm> alarms = alarmRepository.findAllBy(pageRequest);

        final List<Long> postIds = alarms.stream()
                .map(Alarm::getTargetId)
                .toList();
        final List<Post> posts = postRepository.findAllById(postIds);

        final List<PostAlarmResponse> postAlarmResponses = new ArrayList<>();
        for (final Alarm alarm : alarms) {
            PostAlarmDetailResponse postAlarmDetailResponse = null;
            for (final Post post : posts) {
                String nickname = "";
                if (alarm.getAlarmType() == AlarmType.COMMENT) {
                    nickname = post.getWriter().getNickname();
                }
                postAlarmDetailResponse = new PostAlarmDetailResponse(post.getId(),
                        post.getTitle(), nickname);
            }
            final PostAlarmResponse postAlarmResponse = new PostAlarmResponse(alarm.getId(), postAlarmDetailResponse,
                    alarm.getCreatedAt(), alarm.isChecked());
            postAlarmResponses.add(postAlarmResponse);
        }
        return postAlarmResponses;
    }

}
