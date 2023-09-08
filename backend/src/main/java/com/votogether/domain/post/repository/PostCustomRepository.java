package com.votogether.domain.post.repository;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.vo.PostClosingType;
import com.votogether.domain.post.entity.vo.PostSortType;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface PostCustomRepository {

    List<Post> findPostsWithFilteringAndPaging(
            final PostClosingType postClosingType,
            final PostSortType postSortType,
            final Long categoryId,
            final Pageable pageable
    );

    List<Post> findPostsByWriterWithFilteringAndPaging(
            final Member writer,
            final PostClosingType postClosingType,
            final PostSortType postSortType,
            final Pageable pageable
    );

    List<Post> findSearchPostsWithFilteringAndPaging(
            final String keyword,
            final PostClosingType postClosingType,
            final PostSortType postSortType,
            final Pageable pageable
    );

    List<Post> findPostsByVotedWithFilteringAndPaging(
            final Member voter,
            final PostClosingType postClosingType,
            final PostSortType postSortType,
            final Pageable pageable
    );

}
