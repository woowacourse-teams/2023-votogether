package com.votogether.domain.report.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.votogether.RepositoryTest;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.repository.MemberRepository;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostBody;
import com.votogether.domain.post.repository.PostRepository;
import com.votogether.domain.report.entity.Report;
import com.votogether.domain.report.entity.ReportType;
import com.votogether.fixtures.MemberFixtures;
import java.time.LocalDateTime;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

@RepositoryTest
class ReportRepositoryTest {

    @Autowired
    ReportRepository reportRepository;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    PostRepository postRepository;

    @Test
    @DisplayName("회원, 신고타입, 대상ID를 통해서 신고 횟수를 반환한다.")
    void countByMemberAndReportTypeAndTargetId() {
        // given
        Member member = MemberFixtures.MALE_20.get();
        ReportType reportType = ReportType.POST;

        PostBody postBody = PostBody.builder()
                .title("title")
                .content("content")
                .build();

        Post post = Post.builder()
                .writer(member)
                .postBody(postBody)
                .deadline(LocalDateTime.of(2100, 7, 12, 0, 0))
                .build();

        memberRepository.save(member);
        postRepository.save(post);

        Report report = Report.builder()
                .member(member)
                .reportType(reportType)
                .targetId(post.getId())
                .build();
        reportRepository.save(report);

        // when
        int reportCount = reportRepository.countByReportTypeAndTargetId(reportType, post.getId());

        // then
        assertThat(reportCount).isEqualTo(1);
    }

    @Test
    @DisplayName("회원, 신고유형, 신고대상ID를 통해 해당 신고정보를 반환한다.")
    void findByMemberAndReportTypeAndTargetId() {
        // given
        Member member = MemberFixtures.FEMALE_30.get();

        PostBody postBody = PostBody.builder()
                .title("title")
                .content("content")
                .build();

        Post post = Post.builder()
                .writer(member)
                .postBody(postBody)
                .deadline(LocalDateTime.of(2100, 7, 12, 0, 0))
                .build();

        memberRepository.save(member);
        postRepository.save(post);

        Report report = Report.builder()
                .targetId(post.getId())
                .reportType(ReportType.POST)
                .member(member)
                .build();
        reportRepository.save(report);

        // when
        Report actualReport = reportRepository.findByMemberAndReportTypeAndTargetId(
                member,
                ReportType.POST,
                post.getId()
        ).get();

        // then
        assertAll(
                () -> assertThat(actualReport.getTargetId()).isEqualTo(post.getId()),
                () -> assertThat(actualReport.getMember()).isEqualTo(member),
                () -> assertThat(actualReport.getReportType()).isEqualTo(ReportType.POST)
        );
    }

}
