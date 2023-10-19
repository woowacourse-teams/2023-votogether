package com.votogether.domain.alarm.service.strategy;

import com.votogether.domain.alarm.entity.vo.AlarmActionType;
import java.util.EnumMap;
import java.util.Map;
import org.springframework.stereotype.Component;

@Component
public class AlarmReadStrategyProvider {

    private final Map<AlarmActionType, AlarmReadStrategy> readStrategies;

    public AlarmReadStrategyProvider(
            final ContentAlarmReadStrategy contentAlarmReadStrategy,
            final ReportAlarmReadStrategy reportAlarmReadStrategy
    ) {
        readStrategies = new EnumMap<>(AlarmActionType.class);
        readStrategies.put(AlarmActionType.CONTENT, contentAlarmReadStrategy);
        readStrategies.put(AlarmActionType.REPORT, reportAlarmReadStrategy);
    }

    public AlarmReadStrategy getStrategy(final AlarmActionType alarmActionType) {
        return readStrategies.get(alarmActionType);
    }

}
