package com.votogether.global.util;

import jakarta.servlet.http.HttpServletRequest;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpMethod;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class CorsUtils {

    public static boolean isPreflightRequest(final HttpServletRequest request) {
        return HttpMethod.OPTIONS.matches(request.getMethod());
    }

}
