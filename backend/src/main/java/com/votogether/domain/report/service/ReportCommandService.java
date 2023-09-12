package com.votogether.domain.report.service;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.report.dto.request.ReportRequest;
import com.votogether.domain.report.entity.vo.ReportType;
import com.votogether.domain.report.service.strategy.ReportCommentStrategy;
import com.votogether.domain.report.service.strategy.ReportNicknameStrategy;
import com.votogether.domain.report.service.strategy.ReportPostStrategy;
import com.votogether.domain.report.service.strategy.ReportStrategy;
import java.util.EnumMap;
import java.util.Map;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ReportCommandService {

    private final Map<ReportType, ReportStrategy> reportActions;

    public ReportCommandService(
            final ReportPostStrategy reportPostStrategy,
            final ReportCommentStrategy reportCommentStrategy,
            final ReportNicknameStrategy reportNicknameStrategy
    ) {
        this.reportActions = new EnumMap<>(ReportType.class);
        this.reportActions.put(ReportType.POST, reportPostStrategy);
        this.reportActions.put(ReportType.COMMENT, reportCommentStrategy);
        this.reportActions.put(ReportType.NICKNAME, reportNicknameStrategy);
    }

    @Transactional
    public void report(final Member reporter, final ReportRequest request) {
        final ReportStrategy reportStrategy = reportActions.get(request.type());
        reportStrategy.report(reporter, request);
    }

}
