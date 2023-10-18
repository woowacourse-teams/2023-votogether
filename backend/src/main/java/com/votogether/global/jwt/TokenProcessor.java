package com.votogether.global.jwt;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.votogether.domain.auth.exception.AuthExceptionType;
import com.votogether.global.exception.BadRequestException;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Header;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Slf4j
@Component
public class TokenProcessor {

    private static final String TOKEN_DELIMITER = "\\.";
    private static final String BEARER_TOKEN_PREFIX = "Bearer ";
    private static final String BLANK = " ";

    private final Key key;
    private final int tokenExpirationTime;
    private final int refreshTokenExpirationTime;
    private final ObjectMapper objectMapper;

    public TokenProcessor(
            @Value("${jwt.token.secret-key}") final String secretKey,
            @Value("${jwt.token.access-expiration-time}") final int tokenExpirationTime,
            @Value("${jwt.token.refresh-expiration-time}") final int refreshTokenExpirationTime,
            final ObjectMapper objectMapper
    ) {
        this.key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
        this.tokenExpirationTime = tokenExpirationTime;
        this.refreshTokenExpirationTime = refreshTokenExpirationTime;
        this.objectMapper = objectMapper;
    }

    public String generateAccessToken(final Long memberId) {
        final Date now = new Date();
        return Jwts.builder()
                .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                .claim("memberId", memberId)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + tokenExpirationTime))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String generateRefreshToken(final Long memberId) {
        final Date now = new Date();
        return Jwts.builder()
                .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                .claim("memberId", memberId)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + refreshTokenExpirationTime))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String resolveToken(final String token) {
        if (StringUtils.hasText(token) && token.startsWith(BEARER_TOKEN_PREFIX)) {
            return token.split(BLANK)[1];
        }
        throw new BadRequestException(AuthExceptionType.INVALID_TOKEN);
    }

    public TokenPayload parseToken(final String token) throws JsonProcessingException {
        final String[] chunks = token.split(TOKEN_DELIMITER);
        final String payload = new String(Decoders.BASE64.decode(chunks[1]));
        return objectMapper.readValue(payload, TokenPayload.class);
    }

    public void validateToken(final String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
        } catch (final UnsupportedJwtException e) {
            log.info("지원하지 않는 JWT입니다.");
            throw new BadRequestException(AuthExceptionType.UNSUPPORTED_TOKEN);
        } catch (final MalformedJwtException e) {
            log.info("잘못된 JWT 서명입니다.");
            throw new BadRequestException(AuthExceptionType.MALFORMED_TOKEN);
        } catch (final SignatureException e) {
            log.info("토큰의 서명 유효성 검사가 실패했습니다.");
            throw new BadRequestException(AuthExceptionType.SIGNATURE_TOKEN);
        } catch (final ExpiredJwtException e) {
            log.info("토큰의 유효기간이 만료되었습니다.");
            throw new BadRequestException(AuthExceptionType.EXPIRED_TOKEN);
        } catch (final Exception e) {
            log.info("알 수 없는 토큰 유효성 문제가 발생했습니다.");
            throw new BadRequestException(AuthExceptionType.UNKNOWN_TOKEN);
        }
    }

}
