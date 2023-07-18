package com.votogether.domain.post.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyCollection;
import static org.mockito.BDDMockito.given;

import com.votogether.domain.category.entity.Category;
import com.votogether.domain.category.repository.CategoryRepository;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.repository.MemberRepository;
import com.votogether.domain.post.dto.request.PostCreateRequest;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.repository.PostRepository;
import java.util.Collections;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

@ExtendWith(MockitoExtension.class)
class PostServiceTest {

    @Mock
    private PostRepository postRepository;

    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private MemberRepository memberRepository;

    @InjectMocks
    private PostService postService;

    @Test
    @DisplayName("게시글을 등록한다")
    void save() {
        // given
        final Category category1 = Category.builder().build();
        final Category category2 = Category.builder().build();
        final List<Category> categories = List.of(category1, category2);
        final Member member = Member.builder().build();

        final Post post = Post.builder().build();
        Long fakeMemberId = 1L;
        ReflectionTestUtils.setField(post, "id", fakeMemberId);

        given(categoryRepository.findAllById(anyCollection())).willReturn(categories);
        given(postRepository.save(any())).willReturn(post);

        final PostCreateRequest postCreateRequest = PostCreateRequest.builder()
                .categoryIds(Collections.emptyList())
                .postOptionContents(Collections.emptyList())
                .build();

        // when
        final Long savedPostId = postService.save(postCreateRequest, member, Collections.emptyList());

        // then
        assertThat(savedPostId).isOne();
    }

}
