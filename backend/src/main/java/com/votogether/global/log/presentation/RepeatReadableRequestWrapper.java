package com.votogether.global.log.presentation;

import io.micrometer.common.util.StringUtils;
import jakarta.servlet.ReadListener;
import jakarta.servlet.ServletInputStream;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletRequestWrapper;
import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;

public class RepeatReadableRequestWrapper extends HttpServletRequestWrapper {

    private final Charset encoding;
    private final byte[] rowData;

    public RepeatReadableRequestWrapper(final HttpServletRequest request) {
        super(request);
        final String characterEncoding = request.getCharacterEncoding();
        this.encoding = getEncoding(characterEncoding);
        try {
            final InputStream inputStream = request.getInputStream();
            this.rowData = inputStream.readAllBytes();
        } catch (final IOException e) {
            throw new IllegalStateException(e);
        }
    }

    private Charset getEncoding(final String characterEncoding) {
        if (StringUtils.isBlank(characterEncoding)) {
            return StandardCharsets.UTF_8;
        }
        return Charset.forName(characterEncoding);
    }

    @Override
    public ServletInputStream getInputStream() throws IOException {
        final ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(this.rowData);

        return new ServletInputStream() {
            @Override
            public boolean isFinished() {
                throw new UnsupportedOperationException("[RepeatReadableRequestWrapper] isFinished() not supported");
            }

            @Override
            public boolean isReady() {
                throw new UnsupportedOperationException("[RepeatReadableRequestWrapper] isReady() not supported");
            }

            @Override
            public void setReadListener(final ReadListener listener) {
            }

            @Override
            public int read() {
                return byteArrayInputStream.read();
            }
        };
    }

    @Override
    public BufferedReader getReader() {
        try {
            return new BufferedReader(new InputStreamReader(this.getInputStream(), this.encoding));
        } catch (IOException e) {
            throw new IllegalStateException(e);
        }
    }

}
