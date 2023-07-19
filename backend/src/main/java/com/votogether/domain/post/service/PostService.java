package com.votogether.domain.post.service;

import com.votogether.domain.category.entity.Category;
import com.votogether.domain.category.repository.CategoryRepository;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.repository.MemberRepository;
import com.votogether.domain.post.dto.request.PostCreateRequest;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostBody;
import com.votogether.domain.post.repository.PostRepository;
import com.votogether.domain.vote.entity.Vote;
import com.votogether.domain.vote.repository.VoteRepository;
import java.util.Comparator;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@Transactional
@Service
public class PostService {

    private final PostRepository postRepository;
    private final CategoryRepository categoryRepository;
    private final MemberRepository memberRepository;
    private final VoteRepository voteRepository;

    public Long save(
            final PostCreateRequest postCreateRequest,
            final Member member,
            final List<MultipartFile> images
    ) {
        final List<Category> categories = categoryRepository.findAllById(postCreateRequest.categoryIds());
        final Post post = toPostEntity(postCreateRequest, member, images, categories);

        // TODO : 일단 돌아가게 하기 위한 member 저장 (실제 어플에선 삭제될 코드)
        memberRepository.save(member);
        return postRepository.save(post).getId();
    }

    private Post toPostEntity(
            final PostCreateRequest postCreateRequest,
            final Member member,
            final List<MultipartFile> images,
            final List<Category> categories
    ) {
        final Post post = Post.builder()
                .member(member)
                .postBody(toPostBody(postCreateRequest))
                .deadline(postCreateRequest.deadline())
                .build();

        final List<String> postOptionContents = postCreateRequest.postOptionContents();
        post.mapPostOptionsByElements(postOptionContents, post, images);
        post.mapCategories(categories);

        return post;
    }

    private PostBody toPostBody(final PostCreateRequest postCreateRequest) {
        return PostBody.builder()
                .title(postCreateRequest.title())
                .content(postCreateRequest.content())
                .build();
    }

    public List<Post> getPostsVotedOn(final Member member) {
        final List<Vote> votes = voteRepository.findByMember(member);

        final List<Post> posts = votes.stream()
                .map(vote -> vote.getPostOption().getPost())
                .sorted(Comparator.comparing(Post::getCreatedAt).reversed())
                .toList();

        // TODO: 2023/07/19 List<Post> -> List<PostResponse> 로 바꾸어서 응답하기
        return posts;
    }

}
