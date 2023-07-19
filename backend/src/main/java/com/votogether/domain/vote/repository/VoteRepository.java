package com.votogether.domain.vote.repository;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.entity.PostOption;
import com.votogether.domain.vote.entity.Vote;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VoteRepository extends JpaRepository<Vote, Long> {

    Optional<Vote> findByMemberAndPostOption(final Member member, final PostOption postOption);

    List<Vote> findByMemberAndPostOptionIn(final Member member, final List<PostOption> postOptions);

    List<Vote> findByMember(final Member member);

}
