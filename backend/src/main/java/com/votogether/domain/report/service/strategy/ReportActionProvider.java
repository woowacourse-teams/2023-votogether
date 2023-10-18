package com.votogether.domain.report.service.strategy;

import com.votogether.domain.report.entity.vo.ReportType;
import java.util.EnumMap;
import java.util.Map;
import org.springframework.stereotype.Component;

@Component
public class ReportActionProvider {

    private final Map<ReportType, ReportStrategy> reportActions;

    public ReportActionProvider(
            final ReportPostStrategy reportPostStrategy,
            final ReportCommentStrategy reportCommentStrategy,
            final ReportNicknameStrategy reportNicknameStrategy
    ) {
        this.reportActions = new EnumMap<>(ReportType.class);
        this.reportActions.put(ReportType.POST, reportPostStrategy);
        this.reportActions.put(ReportType.COMMENT, reportCommentStrategy);
        this.reportActions.put(ReportType.NICKNAME, reportNicknameStrategy);
    }

    public ReportStrategy getStrategy(ReportType type) {
        return reportActions.get(type);
    }

}
