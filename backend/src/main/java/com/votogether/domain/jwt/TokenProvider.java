package com.votogether.domain.jwt;

import com.votogether.domain.member.entity.Member;
import io.jsonwebtoken.Header;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.util.Date;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class TokenProvider {

    private final String secretKey;
    private final int tokenExpirationTime;

    public TokenProvider(
            @Value("${jwt.token.secret-key}") final String secretKey,
            @Value("${jwt.token.expiration-time}") final int tokenExpirationTime
    ) {
        this.secretKey = secretKey;
        this.tokenExpirationTime = tokenExpirationTime;
    }

    public String generateToken(final Member member) {
        final Date now = new Date();

        return Jwts.builder()
                .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                .claim("memberId", member.getId())
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + tokenExpirationTime))
                .signWith(Keys.hmacShaKeyFor(secretKey.getBytes()), SignatureAlgorithm.HS256)
                .compact();
    }

}
