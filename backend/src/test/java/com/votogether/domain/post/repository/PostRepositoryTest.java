package com.votogether.domain.post.repository;

import static org.assertj.core.api.Assertions.assertThat;

import com.votogether.config.JpaConfig;
import com.votogether.domain.member.entity.Gender;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.SocialType;
import com.votogether.domain.member.repository.MemberRepository;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostBody;
import java.time.LocalDateTime;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@DataJpaTest
@Import(JpaConfig.class)
class PostRepositoryTest {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Test
    @DisplayName("Post를 저장한다")
    void save() {
        // given
        final PostBody postBody = PostBody.builder()
                .title("title")
                .content("content")
                .build();

        final Member member = Member.builder()
                .gender(Gender.MALE)
                .point(0)
                .socialType(SocialType.KAKAO)
                .nickname("user1")
                .socialId("kakao@gmail.com")
                .ageRange("30~39")
                .birthday("0101")
                .build();

        final Post post = Post.builder()
                .member(member)
                .postBody(postBody)
                .deadline(LocalDateTime.of(2100, 7, 12, 0, 0))
                .build();

        memberRepository.save(member);

        // when
        final Post savedPost = postRepository.save(post);

        // then
        assertThat(savedPost).isNotNull();
    }

}
