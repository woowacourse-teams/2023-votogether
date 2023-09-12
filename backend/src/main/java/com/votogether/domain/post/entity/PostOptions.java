package com.votogether.domain.post.entity;

import com.votogether.domain.member.entity.Member;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Embeddable;
import jakarta.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@Embeddable
public class PostOptions {

    private static final Integer FIRST_OPTION_SEQUENCE = 1;

    @OneToMany(mappedBy = "post", cascade = CascadeType.PERSIST, orphanRemoval = true)
    private List<PostOption> postOptions = new ArrayList<>();

    public static PostOptions of(
            final Post post,
            final List<String> postOptionContents,
            final List<String> optionImageUrls
    ) {
        final PostOptions newInstance = new PostOptions();
        final List<PostOption> postOptions = getPostOptions(post, postOptionContents, optionImageUrls);

        newInstance.postOptions.addAll(postOptions);
        return newInstance;
    }

    private static List<PostOption> getPostOptions(
            final Post post,
            final List<String> postOptionContents,
            final List<String> optionImageUrls
    ) {
        return IntStream.rangeClosed(FIRST_OPTION_SEQUENCE, postOptionContents.size())
                .mapToObj(postOptionSequence ->
                        toPostOption(post, postOptionContents, optionImageUrls, postOptionSequence)
                )
                .toList();
    }

    private static PostOption toPostOption(
            final Post post,
            final List<String> postOptionContents,
            final List<String> optionImageUrls,
            final int postOptionSequence
    ) {
        return PostOption.of(
                postOptionContents.get(postOptionSequence - 1),
                post,
                postOptionSequence,
                optionImageUrls.get(postOptionSequence - 1)
        );
    }

    public Boolean contains(final PostOption postOption) {
        return postOptions.contains(postOption);
    }

    public Long getSelectedOptionId(final Member member) {
        return postOptions.stream()
                .filter(postOption -> postOption.hasMemberVote(member))
                .findAny()
                .map(PostOption::getId)
                .orElse(0L);
    }

    public void addAll(
            final Post post,
            final List<String> postOptionContents,
            final List<String> postOptionImageUrls
    ) {
        this.postOptions.addAll(getPostOptions(post, postOptionContents, postOptionImageUrls));
    }

    public void clear() {
        this.postOptions.clear();
    }

}
