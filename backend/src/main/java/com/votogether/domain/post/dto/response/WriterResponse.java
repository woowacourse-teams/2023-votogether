package com.votogether.domain.post.dto.response;

public record WriterResponse(
        Long id,
        String nickname
) {

    @Override
    public String toString() {
        return "WriterResponse{" +
                "id=" + id +
                ", nickname='" + nickname + '\'' +
                '}';
    }

}
