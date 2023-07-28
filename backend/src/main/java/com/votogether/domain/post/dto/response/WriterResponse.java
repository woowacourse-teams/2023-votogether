package com.votogether.domain.post.dto.response;

public record WriterResponse(
        long id,
        String nickname
) {

    public static WriterResponse of(final long id, final String nickname) {
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
