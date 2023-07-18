package com.votogether.domain.post.service;

import com.votogether.domain.category.entity.Category;
import com.votogether.domain.category.repository.CategoryRepository;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.repository.MemberRepository;
import com.votogether.domain.post.dto.request.PostCreateRequest;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.repository.PostRepository;
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

    public Long save(
            final PostCreateRequest postCreateRequest,
            final Member member,
            final List<MultipartFile> images
    ) {
        final List<Category> categories = categoryRepository.findAllById(postCreateRequest.categoryIds());
        final Post post = postCreateRequest.toEntity(member, images, categories);

        // TODO : 일단 돌아가게 하기 위한 member 저장 (실제 어플에선 삭제될 코드)
        memberRepository.save(member);
        return postRepository.save(post).getId();
    }

}
