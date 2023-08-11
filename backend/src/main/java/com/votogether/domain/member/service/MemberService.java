package com.votogether.domain.member.service;

import com.votogether.domain.member.dto.MemberDetailRequest;
import com.votogether.domain.member.dto.MemberInfoResponse;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.Nickname;
import com.votogether.domain.member.exception.MemberExceptionType;
import com.votogether.domain.member.repository.MemberRepository;
import com.votogether.domain.post.repository.PostRepository;
import com.votogether.domain.vote.repository.VoteRepository;
import com.votogether.exception.BadRequestException;
import com.votogether.exception.NotFoundException;
import java.util.Objects;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final PostRepository postRepository;
    private final VoteRepository voteRepository;

    @Transactional
    public Member register(final Member member) {
        final Optional<Member> maybeMember = memberRepository.findBySocialIdAndSocialType(
                member.getSocialId(),
                member.getSocialType()
        );
        return maybeMember.orElseGet(() -> memberRepository.save(member));
    }

    @Transactional(readOnly = true)
    public Member findById(final Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundException(MemberExceptionType.NONEXISTENT_MEMBER));
    }

    @Transactional(readOnly = true)
    public MemberInfoResponse findMemberInfo(final Member member) {
        final int numberOfPosts = postRepository.countByWriter(member);
        final int numberOfVotes = voteRepository.countByMember(member);

        return new MemberInfoResponse(
                member.getNickname(),
                member.getGender(),
                member.getBirthYear(),
                numberOfPosts,
                numberOfVotes
        );
    }

    @Transactional
    public void changeNickname(final Member member, final String nickname) {
        validateExistentNickname(nickname);
        member.changeNickname(nickname);
    }

    private void validateExistentNickname(final String nickname) {
        final boolean isExist = memberRepository.existsByNickname(new Nickname(nickname));
        if (isExist) {
            throw new BadRequestException(MemberExceptionType.ALREADY_EXISTENT_NICKNAME);
        }
    }

    @Transactional
    public void updateDetails(final MemberDetailRequest request, final Member member) {
        validateExistentDetails(request, member);
        member.updateGender(request.gender());
        member.updateBirthYear(request.birthYear());
    }

    private static void validateExistentDetails(final MemberDetailRequest request, final Member member) {
        if (member.getGender() == request.gender()) {
            throw new BadRequestException(MemberExceptionType.SAME_GENDER);
        }
        if (Objects.equals(member.getBirthYear(), request.birthYear())) {
            throw new BadRequestException(MemberExceptionType.SAME_BIRTH_YEAR);
        }
    }

    @Transactional
    public void deleteMember(final Member member) {
        final Member existentMember = memberRepository.findById(member.getId())
                .orElseThrow(() -> new NotFoundException(MemberExceptionType.NONEXISTENT_MEMBER));
        memberRepository.delete(existentMember);
    }

}
