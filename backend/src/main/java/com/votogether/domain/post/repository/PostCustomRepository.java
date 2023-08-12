package com.votogether.domain.post.repository;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostClosingType;
import com.votogether.domain.post.entity.PostSortType;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface PostCustomRepository {

    List<Post> findAllByClosingTypeAndSortTypeAndCategoryId(
            final PostClosingType postClosingType,
            final PostSortType postSortType,
            final Long categoryId,
            final Pageable pageable
    );

    List<Post> findAllByWriterWithClosingTypeAndSortTypeAndCategoryId(
            final Member writer,
            final PostClosingType postClosingType,
            final PostSortType postSortType,
            final Long categoryId,
            final Pageable pageable
    );

}
