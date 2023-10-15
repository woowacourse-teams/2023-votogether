package com.votogether.domain.report.service;

import com.votogether.domain.report.dto.response.ReportsResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class ReportQueryService {
    public ReportsResponse getReports(final long page) {
        return null;
    }
}
