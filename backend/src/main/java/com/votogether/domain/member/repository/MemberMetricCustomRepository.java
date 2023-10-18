package com.votogether.domain.member.repository;

import com.votogether.domain.member.entity.MemberMetric;
import java.util.List;

public interface MemberMetricCustomRepository {

    List<MemberMetric> getTop10MemberMetrics();

}
