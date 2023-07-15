package com.votogether.domain.post.entity;

import com.votogether.domain.category.entity.Category;
import com.votogether.domain.common.BaseEntity;
import com.votogether.domain.member.entity.Member;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class Post extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Embedded
    private PostBody postBody;

    @Embedded
    private PostCategories postCategories;

    @Embedded
    private PostOptions postOptions;

    @Column(columnDefinition = "datetime(2)", nullable = false)
    private LocalDateTime deadline;

    @Builder
    public Post(
            final Member member,
            final PostBody postBody,
            final LocalDateTime deadline
    ) {
        this.member = member;
        this.postBody = postBody;
        this.deadline = deadline;
        this.postCategories = new PostCategories();
        this.postOptions = new PostOptions();
    }

    public void mapCategories(final List<Category> categories) {
        this.postCategories.mapPostAndCategories(this, categories);
    }

    public void addAllPostOptions(final List<PostOption> postOptions) {
        this.postOptions.addAllPostOptions(postOptions);
    }

}
