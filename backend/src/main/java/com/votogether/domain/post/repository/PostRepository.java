package com.votogether.domain.post.repository;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.entity.Post;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PostRepository extends JpaRepository<Post, Long>, PostCustomRepository {

    @Query("SELECT COUNT(p)" +
            "FROM Member m " +
            "LEFT JOIN Post p ON m.id = p.writer.id AND p.writer IN :members " +
            "WHERE m IN :members " +
            "GROUP BY m.id")
    List<Integer> findCountsByMembers(@Param("members") final List<Member> members);

    List<Post> findAllByWriter(final Member member);

    int countByWriter(final Member member);

}
