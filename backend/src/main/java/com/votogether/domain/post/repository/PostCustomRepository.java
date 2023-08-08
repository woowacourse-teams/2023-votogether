package com.votogether.domain.post.repository;

import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostClosingType;
import com.votogether.domain.post.entity.PostSortType;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface PostCustomRepository {

    List<Post> findAllByClosingTypeAndSortType(
            final PostClosingType postClosingType,
            final PostSortType postSortType,
            final Pageable pageable
    );

}
