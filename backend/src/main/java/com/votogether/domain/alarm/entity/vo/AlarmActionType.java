package com.votogether.domain.alarm.entity.vo;

import com.votogether.domain.alarm.exception.AlarmExceptionType;
import com.votogether.global.exception.BadRequestException;
import java.util.Arrays;

public enum AlarmActionType {

    CONTENT,
    REPORT,
    ;

    public static AlarmActionType from(final String actionType) {
        return Arrays.stream(AlarmActionType.values())
                .filter(alarmActionType -> alarmActionType.name().equals(actionType))
                .findFirst()
                .orElseThrow(() -> new BadRequestException(AlarmExceptionType.NOT_FOUND_ACTION_TYPE));
    }

}
