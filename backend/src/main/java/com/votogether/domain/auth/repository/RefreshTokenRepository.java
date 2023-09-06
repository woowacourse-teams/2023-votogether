package com.votogether.domain.auth.repository;

import com.votogether.domain.auth.RefreshToken;
import org.springframework.data.repository.CrudRepository;

public interface RefreshTokenRepository extends CrudRepository<RefreshToken, String> {
}
