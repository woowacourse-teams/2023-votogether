package com.votogether.domain.post.entity;

import com.votogether.domain.common.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class PostOption extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;

    @Column(nullable = false)
    private Integer sequence;

    @Column(length = 50, nullable = false)
    private String content;

    @Column
    private String imageUrl;

    @Builder
    public PostOption(
            final Post post,
            final Integer sequence,
            final String content,
            final String imageUrl
    ) {
        this.post = post;
        this.sequence = sequence;
        this.content = content;
        this.imageUrl = imageUrl;
    }

}
