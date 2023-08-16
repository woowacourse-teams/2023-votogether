package com.votogether.global.log.presentation;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.http.MediaType;

public class ResponseLog {

    private final Map<String, Object> params = new LinkedHashMap<>();

    public ResponseLog(final String id, final HttpServletResponse response) {
        params.put("ID", id);
        params.put("Status", response.getStatus());
        params.put("Headers", parseHeaders(response));
        params.put("Body", parseBody(response));
    }

    public void put(final String key, final Object value) {
        params.put(key, value);
    }

    public String parseHeaders(final HttpServletResponse response) {
        final Collection<String> headerNames = response.getHeaderNames();
        return headerNames.stream()
                .map(header -> "\t\t[%s] = [%s]".formatted(header, response.getHeaders(header)))
                .distinct()
                .collect(Collectors.joining("\n", "\n", "\n\t"));
    }

    public String parseBody(final HttpServletResponse response) {
        final String body = MessageBodyReader.readBody(response);
        final String contentType = response.getContentType();
        if (!MediaType.APPLICATION_JSON_VALUE.equals(contentType)) {
            return body;
        }
        final ObjectMapper mapper = new ObjectMapper();
        try {
            final Object jsonObject = mapper.readValue(body, Object.class);
            final String jsonResponse = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(jsonObject);
            return Arrays.stream(jsonResponse.split("\\n"))
                    .collect(Collectors.joining("\n\t\t", "\n\t\t", "\n\t"));
        } catch (JsonProcessingException e) {
            throw new IllegalStateException(e);
        }
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
