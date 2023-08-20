package com.votogether.global.log.presentation;

import com.votogether.global.util.MultipartUtils;
import jakarta.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.Collections;
import java.util.Enumeration;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Spliterator;
import java.util.Spliterators;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;
import org.springframework.http.MediaType;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.HandlerMapping;

public class RequestLog {

    private final Map<String, Object> params = new LinkedHashMap<>();

    public RequestLog(final String id, final HttpServletRequest request) {
        params.put("ID", id);
        params.put("IP", request.getRemoteAddr());
        params.put("Remote Host", request.getRemoteHost());
        params.put("Headers", parseHeaders(request));
        params.put("Method", request.getMethod());
        params.put("URL", request.getRequestURL());
        params.put("Path Variables", parsePathVariables(request));
        params.put("Params", parseParams(request));
        params.put("Body", parseBody(request));
    }

    public void put(final String key, Object value) {
        params.put(key, value);
    }

    public String parseHeaders(final HttpServletRequest request) {
        final Enumeration<String> headerNames = request.getHeaderNames();
        final Stream<String> headerStream = StreamSupport.stream(
                Spliterators.spliteratorUnknownSize(headerNames.asIterator(), Spliterator.ORDERED), false
        );
        return headerStream.map(header -> "\t\t[%s] = [%s]".formatted(header, headers(request, header)))
                .distinct()
                .collect(Collectors.joining("\n", "\n", "\n\t"));
    }

    private String headers(final HttpServletRequest request, final String header) {
        return String.join(", ", Collections.list(request.getHeaders(header)));
    }

    public String parsePathVariables(final HttpServletRequest request) {
        final Map<String, String> pathVariables =
                (Map<String, String>) request.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);

        if (pathVariables == null || pathVariables.isEmpty()) {
            return "";
        }
        return pathVariables.keySet()
                .stream()
                .map(key -> "\t\t[%s] = [%s]".formatted(key, pathVariables.get(key)))
                .collect(Collectors.joining("\n", "\n", "\n\t"));
    }

    public String parseParams(final HttpServletRequest request) {
        final Enumeration<String> parameterNames = request.getParameterNames();
        final Stream<String> parameterStream = StreamSupport.stream(
                Spliterators.spliteratorUnknownSize(parameterNames.asIterator(), Spliterator.ORDERED), false
        );
        return parameterStream.map(param -> "\t\t[%s] = [%s]".formatted(param, request.getParameter(param)))
                .collect(Collectors.joining("\n", "\n", "\n\t"));
    }

    public String parseBody(final HttpServletRequest request) {
        if (MultipartUtils.isMultipartRequest(request)) {
            return "MULTIPART_FORM_DATA_VALUE";
        }
        final String body = MessageBodyReader.readBody(request);
        final String contentType = request.getContentType();
        if (!StringUtils.hasText(contentType)) {
            return body;
        }
        if (contentType.contains(MediaType.TEXT_PLAIN_VALUE)) {
            return "\n" + body + "\n\t";
        }
        if (contentType.contains(MediaType.APPLICATION_JSON_VALUE)) {
            return Arrays.stream(body.split("\\n"))
                    .collect(Collectors.joining("\n\t\t", "\n\t\t", "\n\t"));
        }
        if (contentType.contains(MediaType.APPLICATION_FORM_URLENCODED_VALUE) ||
                contentType.contains(MediaType.MULTIPART_FORM_DATA_VALUE)) {
            return Arrays.stream(body.split("&"))
                    .map(it -> {
                        final String[] split = it.split("=");
                        String value = null;
                        if (split.length >= 2) {
                            value = it.substring(it.indexOf("=") + 1);
                        }
                        return "[%s] = [%s]".formatted(split[0], value);
                    })
                    .collect(Collectors.joining("\n\t\t", "\n\t\t", "\n\t"));
        }
        return body;
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder();
        for (final String key : params.keySet()) {
            sb.append("\t[%s] = [%s]\n".formatted(key, params.get(key)));
        }
        return sb.toString();
    }

}
