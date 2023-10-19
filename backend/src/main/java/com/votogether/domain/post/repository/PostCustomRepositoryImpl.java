package com.votogether.domain.post.repository;

import static com.votogether.domain.post.entity.QPost.post;
import static com.votogether.domain.post.entity.QPostCategory.postCategory;
import static com.votogether.domain.post.entity.QPostOption.postOption;
import static com.votogether.domain.post.entity.comment.QComment.comment;
import static com.votogether.domain.vote.entity.QVote.vote;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.vo.PostClosingType;
import com.votogether.domain.post.entity.vo.PostSortType;
import com.votogether.domain.post.repository.dto.PostCommentCountDto;
import com.votogether.domain.post.repository.dto.QPostCommentCountDto;
import com.votogether.global.persistence.OrderByNull;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class PostCustomRepositoryImpl implements PostCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<PostCommentCountDto> getCommentCountsInPosts(final Set<Long> postIds) {
        return jpaQueryFactory.select(
                        new QPostCommentCountDto(
                                post.id,
                                comment.count()
                        )
                )
                .from(post)
                .innerJoin(comment).on(comment.post.eq(post))
                .where(post.id.in(postIds))
                .groupBy(post.id)
                .fetch();
    }

    @Override
    public List<Post> findPostsWithFilteringAndPaging(
            final PostClosingType postClosingType,
            final PostSortType postSortType,
            final Long categoryId,
            final Pageable pageable
    ) {
        return jpaQueryFactory
                .selectDistinct(post)
                .from(post)
                .join(post.writer).fetchJoin()
                .leftJoin(post.postCategories, postCategory)
                .where(
                        categoryIdEq(categoryId),
                        deadlineEq(postClosingType),
                        post.isHidden.eq(false)
                )
                .orderBy(orderBy(postSortType))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
    }

    private BooleanExpression categoryIdEq(final Long categoryId) {
        return categoryId == null ? null : postCategory.category.id.eq(categoryId);
    }

    @Override
    public List<Post> findPostsByWriterWithFilteringAndPaging(
            final Member writer,
            final PostClosingType postClosingType,
            final PostSortType postSortType,
            final Pageable pageable
    ) {
        return jpaQueryFactory
                .select(post)
                .from(post)
                .join(post.writer).fetchJoin()
                .where(
                        post.writer.eq(writer),
                        deadlineEq(postClosingType),
                        post.isHidden.eq(false)
                )
                .orderBy(orderBy(postSortType))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
    }

    @Override
    public List<Post> findSearchPostsWithFilteringAndPaging(
            final String keyword,
            final PostClosingType postClosingType,
            final PostSortType postSortType,
            final Pageable pageable
    ) {
        return jpaQueryFactory
                .select(post)
                .from(post)
                .join(post.writer).fetchJoin()
                .where(
                        containsKeywordInTitleOrContent(keyword),
                        deadlineEq(postClosingType),
                        post.isHidden.eq(false)
                )
                .orderBy(orderBy(postSortType))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
    }

    private BooleanExpression containsKeywordInTitleOrContent(final String keyword) {
        return post.postBody.title.contains(keyword)
                .or(post.postBody.content.contains(keyword));
    }

    @Override
    public List<Post> findPostsByVotedWithFilteringAndPaging(
            final Member voter,
            final PostClosingType postClosingType,
            final PostSortType postSortType,
            final Pageable pageable
    ) {
        return jpaQueryFactory
                .selectDistinct(post)
                .from(post)
                .join(post.writer).fetchJoin()
                .leftJoin(post.postOptions, postOption)
                .leftJoin(postOption.votes, vote)
                .where(
                        vote.member.eq(voter),
                        deadlineEq(postClosingType),
                        post.isHidden.eq(false)
                )
                .orderBy(orderBy(postSortType))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
    }

    private BooleanExpression deadlineEq(final PostClosingType postClosingType) {
        final LocalDateTime now = LocalDateTime.now();
        return switch (postClosingType) {
            case PROGRESS -> post.postDeadline.deadline.after(now);
            case CLOSED -> post.postDeadline.deadline.before(now);
            default -> null;
        };
    }

    private OrderSpecifier orderBy(final PostSortType postSortType) {
        return switch (postSortType) {
            case LATEST -> post.id.desc();
            case HOT -> post.voteCount.desc();
            default -> OrderByNull.DEFAULT;
        };
    }

}
