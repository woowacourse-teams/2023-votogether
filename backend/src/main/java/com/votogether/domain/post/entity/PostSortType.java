package com.votogether.domain.post.entity;

import lombok.Getter;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;

@Getter
public enum PostSortType {

    LATEST(Sort.by(Sort.Direction.DESC, "createdAt")),
    HOT(Sort.by(Direction.DESC, "totalVoteCount"));

    private final Sort sort;

    PostSortType(final Sort sort) {
        this.sort = sort;
    }

}
