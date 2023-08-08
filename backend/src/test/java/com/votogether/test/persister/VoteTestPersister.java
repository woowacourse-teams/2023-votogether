package com.votogether.test.persister;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.entity.PostOption;
import com.votogether.domain.vote.entity.Vote;
import com.votogether.domain.vote.repository.VoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Persister
@RequiredArgsConstructor
@Component
public class VoteTestPersister {

    private final MemberTestPersister memberTestPersister;
    private final PostOptionTestPersister postOptionTestPersister;
    private final VoteRepository voteRepository;

    public VoteBuilder builder() {
        return new VoteBuilder();
    }

    public final class VoteBuilder {

        private Member member;
        private PostOption postOption;

        public VoteBuilder member(Member member) {
            this.member = member;
            return this;
        }

        public VoteBuilder postOption(PostOption postOption) {
            this.postOption = postOption;
            return this;
        }

        public Vote save() {
            Vote vote = Vote.builder()
                    .member(member == null ? memberTestPersister.builder().save() : member)
                    .postOption(postOption == null ? postOptionTestPersister.builder().save() : postOption)
                    .build();
            return voteRepository.save(vote);
        }

    }
}
