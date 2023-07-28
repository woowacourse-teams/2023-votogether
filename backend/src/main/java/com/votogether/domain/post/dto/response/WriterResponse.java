package com.votogether.domain.post.dto.response;

public record WriterResponse(
        Long id,
        String nickname
) {

    public static WriterResponse of(final Long id, final String nickname) {
        return new WriterResponse(id, nickname);
    }

    @Override
    public String toString() {
        return "WriterResponse{" +
                "id=" + id +
                ", nickname='" + nickname + '\'' +
                '}';
    }

}
