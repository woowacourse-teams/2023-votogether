package com.votogether.global.util;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.MediaType;
import org.springframework.util.StringUtils;

public class MultipartUtils {

    public static boolean isMultipartRequest(final HttpServletRequest request) {
        final String contentType = request.getContentType();
        return StringUtils.hasText(contentType) && contentType.contains(MediaType.MULTIPART_FORM_DATA_VALUE);
    }

}
