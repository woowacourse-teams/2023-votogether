package com.votogether.domain.post.entity.vo;

import lombok.Getter;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;

@Getter
public enum PostSortType {

    LATEST(
            Sort.by(Direction.DESC, "createdAt"),
            Sort.by(Direction.DESC, "postOption.post.createdAt")
    ),

    HOT(
            Sort.by(Direction.DESC, "totalVoteCount"),
            Sort.by(Direction.DESC, "postOption.post.totalVoteCount")
    );

    private final Sort postBaseSort;
    private final Sort voteBaseSort;

    PostSortType(final Sort postBaseSort, final Sort voteBaseSort) {
        this.postBaseSort = postBaseSort;
        this.voteBaseSort = voteBaseSort;
    }

}
