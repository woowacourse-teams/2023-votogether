package com.votogether.global.log.presentation;

import com.votogether.global.util.MultipartUtils;
import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.web.util.ContentCachingResponseWrapper;

public class RequestResponseCacheFilter implements Filter {

    @Override
    public void doFilter(final ServletRequest request, final ServletResponse response, final FilterChain chain)
            throws IOException, ServletException {
        final ContentCachingResponseWrapper contentCachingResponse =
                new ContentCachingResponseWrapper((HttpServletResponse) response);
        chain.doFilter(getRequest(request), contentCachingResponse);
        contentCachingResponse.copyBodyToResponse();
    }

    private ServletRequest getRequest(final ServletRequest request) {
        if (MultipartUtils.isMultipartRequest((HttpServletRequest) request)) {
            return request;
        }
        return new RepeatReadableRequestWrapper((HttpServletRequest) request);
    }

}
