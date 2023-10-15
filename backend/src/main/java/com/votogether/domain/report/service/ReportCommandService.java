package com.votogether.domain.report.service;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.report.dto.request.ReportRequest;
import com.votogether.domain.report.entity.vo.ReportType;
import com.votogether.domain.report.service.strategy.ReportActionProvider;
import com.votogether.domain.report.service.strategy.ReportCommentStrategy;
import com.votogether.domain.report.service.strategy.ReportNicknameStrategy;
import com.votogether.domain.report.service.strategy.ReportPostStrategy;
import com.votogether.domain.report.service.strategy.ReportStrategy;
import java.util.EnumMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class ReportCommandService {

    private final ReportActionProvider reportActionProvider;

    public void report(final Member reporter, final ReportRequest request) {
        final ReportStrategy reportStrategy = reportActionProvider.getStrategy(request.type());
        reportStrategy.report(reporter, request);
    }

}
