package com.votogether.domain.post.repository;

import static com.votogether.domain.post.entity.QPost.post;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostClosingType;
import com.votogether.domain.post.entity.PostSortType;
import com.votogether.global.persistence.OrderByNull;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class PostCustomRepositoryImpl implements PostCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<Post> findAllByClosingTypeAndSortType(
            final PostClosingType postClosingType,
            final PostSortType postSortType,
            final Pageable pageable
    ) {
        return jpaQueryFactory
                .selectFrom(post)
                .join(post.writer).fetchJoin()
                .where(deadlineEq(postClosingType))
                .orderBy(orderBy(postSortType))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
    }

    private BooleanExpression deadlineEq(final PostClosingType postClosingType) {
        final LocalDateTime now = LocalDateTime.now();
        switch (postClosingType) {
            case PROGRESS:
                return post.deadline.after(now);
            case CLOSED:
                return post.deadline.before(now);
            case ALL:
            default:
                return null;
        }
    }

    private OrderSpecifier orderBy(final PostSortType postSortType) {
        switch (postSortType) {
            case LATEST:
                return post.createdAt.desc();
            case HOT:
                return post.totalVoteCount.desc();
            default:
                return OrderByNull.DEFAULT;
        }
    }

}
