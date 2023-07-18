package com.votogether.global.jwt;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.votogether.domain.member.entity.Member;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Header;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import java.security.Key;
import java.util.Date;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Slf4j
@Component
public class TokenProcessor {

    private final Key key;
    private final int tokenExpirationTime;
    private final ObjectMapper objectMapper;

    public TokenProcessor(
            @Value("${jwt.token.secret-key}") final String secretKey,
            @Value("${jwt.token.expiration-time}") final int tokenExpirationTime
    ) {
        this.key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey));
        this.tokenExpirationTime = tokenExpirationTime;
        this.objectMapper = new ObjectMapper();
    }

    public String generateToken(final Member member) {
        final Date now = new Date();

        return Jwts.builder()
                .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                .claim("memberId", member.getId())
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + tokenExpirationTime))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String resolveToken(final String token) {
        if (StringUtils.hasText(token) && token.startsWith("Bearer ")) {
            return token.split(" ")[1];
        }
        return null;
    }

    public void validateToken(final String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
        } catch (final UnsupportedJwtException e) {
            log.info("지원하지 않는 JWT입니다.");
            throw new IllegalArgumentException("지원하지 않는 JWT입니다.");
        } catch (final MalformedJwtException e) {
            log.info("잘못된 JWT 서명입니다.");
            throw new IllegalArgumentException("잘못된 JWT 서명입니다.");
        } catch (final SignatureException e) {
            log.info("토큰의 서명 유효성 검사가 실패했습니다.");
            throw new IllegalArgumentException("토큰의 서명 유효성 검사가 실패했습니다.");
        } catch (final ExpiredJwtException e) {
            log.info("토큰의 유효기간이 만료되었습니다.");
            throw new IllegalArgumentException("토큰의 유효기간이 만료되었습니다.");
        } catch (final IllegalArgumentException e) {
            throw new IllegalArgumentException("토큰의 내용이 비어있습니다.");
        }
    }

    public TokenPayload parseToken(final String token) throws JsonProcessingException {
        final String[] chunks = token.split("//.");
        final String payload = new String(Decoders.BASE64.decode(chunks[1]));
        return objectMapper.readValue(payload, TokenPayload.class);
    }

}
