package com.votogether.domain.ranking.service;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.repository.MemberRepository;
import com.votogether.domain.member.service.RankingBoard;
import com.votogether.domain.post.repository.PostRepository;
import com.votogether.domain.ranking.domain.ActivityRecord;
import com.votogether.domain.ranking.dto.response.RankingResponse;
import com.votogether.domain.vote.repository.VoteRepository;
import java.util.HashMap;
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
    public RankingResponse getRanking(final Member member) {
        final RankingBoard rankingBoard = getRankingBoard();
        return new RankingResponse(
                rankingBoard.getRanking(member),
                member.getNickname(),
                rankingBoard.getActivityRecord(member).getPostCount(),
                rankingBoard.getActivityRecord(member).getVoteCount(),
                rankingBoard.getScore(member)
        );
    }

    private RankingBoard getRankingBoard() {
        final List<Member> members = memberRepository.findAll();
        final List<Integer> postCounts = postRepository.findCountsByMembers(members);
        final List<Integer> voteCounts = voteRepository.findCountsByMembers(members);

        final Map<Member, ActivityRecord> passionBoard = new HashMap<>();

        for (int i = 0; i < members.size(); i++) {
            passionBoard.put(members.get(i), new ActivityRecord(postCounts.get(i), voteCounts.get(i)));
        }

        return new RankingBoard(passionBoard);
    }

}
