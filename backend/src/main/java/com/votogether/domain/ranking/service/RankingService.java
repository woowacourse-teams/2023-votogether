package com.votogether.domain.ranking.service;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.repository.MemberRepository;
import com.votogether.domain.post.repository.PostRepository;
import com.votogether.domain.ranking.dto.response.RankingResponse;
import com.votogether.domain.ranking.entity.PassionRankings;
import com.votogether.domain.ranking.entity.vo.PassionRecord;
import com.votogether.domain.vote.repository.VoteRepository;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class RankingService {

    private final MemberRepository memberRepository;
    private final PostRepository postRepository;
    private final VoteRepository voteRepository;

    @Transactional(readOnly = true)
    public RankingResponse getPassionRanking(final Member member) {
        final PassionRankings passionRankings = getPassionRankings();
        return RankingResponse.of(passionRankings, member);
    }

    @Transactional(readOnly = true)
    public List<RankingResponse> getPassionRanking() {
        final PassionRankings passionRankings = getPassionRankings();
        return passionRankings.getTop10Members()
                .stream()
                .map(member -> RankingResponse.of(passionRankings, member)
                ).toList();
    }

    private PassionRankings getPassionRankings() {
        final List<Member> members = memberRepository.findAll();
        final List<Integer> postCounts = postRepository.findCountsByMembers(members);
        final List<Integer> voteCounts = voteRepository.findCountsByMembers(members);

        final Map<Member, PassionRecord> passionBoard = new LinkedHashMap<>();

        for (int i = 0; i < members.size(); i++) {
            passionBoard.put(members.get(i), new PassionRecord(postCounts.get(i), voteCounts.get(i)));
        }

        return new PassionRankings(passionBoard);
    }

}
