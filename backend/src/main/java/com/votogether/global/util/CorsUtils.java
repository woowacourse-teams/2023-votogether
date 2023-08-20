package com.votogether.global.util;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpMethod;

public class CorsUtils {

    public static boolean isPreflightRequest(final HttpServletRequest request) {
        return HttpMethod.OPTIONS.matches(request.getMethod());
    }

}
