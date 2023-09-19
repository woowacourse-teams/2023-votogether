package com.votogether.domain.post.entity;

import com.votogether.domain.post.exception.PostExceptionType;
import com.votogether.global.exception.BadRequestException;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PostDeadline {

    private static final long MAXIMUM_DEADLINE = 14;

    @Column(columnDefinition = "datetime(6)", nullable = false)
    private LocalDateTime deadline;

    public PostDeadline(final LocalDateTime deadline) {
        validate(deadline);
        this.deadline = deadline;
    }

    private void validate(final LocalDateTime deadline) {
        final LocalDate now = LocalDateTime.now().toLocalDate();
        final LocalDate deadlineDate = deadline.toLocalDate();
        if (ChronoUnit.DAYS.between(now, deadlineDate) > MAXIMUM_DEADLINE) {
            throw new BadRequestException(PostExceptionType.DEADLINE_EXCEED);
        }
    }

    public void close() {
        this.deadline = LocalDateTime.now();
    }

    public boolean isClosed() {
        return this.deadline.isBefore(LocalDateTime.now());
    }

}
