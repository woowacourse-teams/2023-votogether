package com.votogether.domain.post.entity;

import com.votogether.domain.member.entity.Member;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Embeddable;
import jakarta.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@Embeddable
public class PostOptions {

    @OneToMany(mappedBy = "post", cascade = CascadeType.PERSIST, orphanRemoval = true)
    private List<PostOption> postOptions = new ArrayList<>();

    public void addAllPostOptions(final List<PostOption> postOptions) {
        this.postOptions.addAll(postOptions);
    }

    public boolean contains(final PostOption postOption) {
        return postOptions.contains(postOption);
    }

    public Integer getSelectOption(final Member member) {
        return postOptions.stream()
                .filter(postOption -> postOption.isVoteByMember(member))
                .findFirst()
                .map(PostOption::getSequence)
                .orElse(0);
    }

}
