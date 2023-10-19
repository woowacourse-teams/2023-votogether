package com.votogether.test.persister;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.MemberMetric;
import com.votogether.domain.member.repository.MemberMetricRepository;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Persister
public class MemberMetricTestPersister {

    private final MemberMetricRepository memberMetricRepository;
    private final MemberTestPersister memberTestPersister;

    public MemberMetricBuilder builder() {
        return new MemberMetricBuilder();
    }

    public final class MemberMetricBuilder {

        private Member member;
        private long postCount;
        private long voteCount;
        private long score;

        public MemberMetricBuilder member(Member member) {
            this.member = member;
            return this;
        }

        public MemberMetricBuilder postCount(long postCount) {
            this.postCount = postCount;
            return this;
        }

        public MemberMetricBuilder voteCount(long voteCount) {
            this.voteCount = voteCount;
            return this;
        }

        public MemberMetricBuilder score(long score) {
            this.score = score;
            return this;
        }

        public MemberMetric save() {
            MemberMetric memberMetric = MemberMetric.builder()
                    .member(member == null ? memberTestPersister.builder().save() : member)
                    .postCount(postCount)
                    .voteCount(voteCount)
                    .score(score)
                    .build();
            return memberMetricRepository.save(memberMetric);
        }

    }

}
