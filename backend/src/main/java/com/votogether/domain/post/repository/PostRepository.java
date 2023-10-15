package com.votogether.domain.post.repository;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.entity.Post;
import jakarta.persistence.LockModeType;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PostRepository extends JpaRepository<Post, Long>, PostCustomRepository {

    List<Post> findAllByWriter(final Member member);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT p FROM Post p where p.id = :postId")
    Optional<Post> findByIdForUpdate(@Param("postId") final Long postId);

}
