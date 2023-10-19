package com.votogether.domain.ranking.service;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.MemberMetric;
import com.votogether.domain.member.exception.MemberExceptionType;
import com.votogether.domain.member.repository.MemberMetricRepository;
import com.votogether.domain.ranking.dto.response.RankingResponse;
import com.votogether.global.exception.NotFoundException;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class RankingService {

    private final MemberMetricRepository memberMetricRepository;

    @Transactional(readOnly = true)
    public RankingResponse getPassionRanking(final Member member) {
        final MemberMetric memberMetric = memberMetricRepository.findByMember(member)
                .orElseThrow(() -> new NotFoundException(MemberExceptionType.NOT_FOUND_METRIC));
        final long higherCount = memberMetricRepository.countByScoreGreaterThan(memberMetric.getScore());

        return new RankingResponse(
                higherCount + 1,
                member.getNickname(),
                memberMetric.getPostCount(),
                memberMetric.getVoteCount(),
                memberMetric.getScore()
        );
    }

    @Transactional(readOnly = true)
    public List<RankingResponse> getPassionRanking() {
        final List<MemberMetric> memberMetrics = memberMetricRepository.getTop10MemberMetrics();

        int currentRanking = 1;
        int previousRanking = -1;
        long previousScore = -1;

        final List<RankingResponse> result = new ArrayList<>();
        for (final MemberMetric memberMetric : memberMetrics) {
            final long currentScore = memberMetric.getScore();
            final int ranking = (currentScore == previousScore) ? previousRanking : currentRanking;

            final RankingResponse rankingResponse = new RankingResponse(
                    ranking,
                    memberMetric.getMember().getNickname(),
                    memberMetric.getPostCount(),
                    memberMetric.getVoteCount(),
                    memberMetric.getScore()
            );
            result.add(rankingResponse);

            previousRanking = ranking;
            previousScore = currentScore;
            currentRanking++;
        }
        return result;
    }

}
