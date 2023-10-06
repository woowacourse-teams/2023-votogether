package com.votogether.global.log.context;

import java.util.Stack;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.RequestScope;

@RequestScope
@Component
public class LogContext {

    private static final String BAR = "|";
    private static final String BLANK = " ";

    private final long startTimeMillis;
    private final Stack<Long> callTimeStack = new Stack<>();

    private LogId logId;
    private int methodDepth = 0;

    public LogContext() {
        this.startTimeMillis = System.currentTimeMillis();
    }

    public void increaseMethodCall() {
        callTimeStack.push(System.currentTimeMillis());
        ++methodDepth;
    }

    public void decreaseMethodCall() {
        --methodDepth;
    }

    public String depthPrefix(final String prefix) {
        if (methodDepth == 1) {
            return BAR + prefix;
        }

        final String bar = BAR + BLANK.repeat(prefix.length());
        final String repeatedBar = bar.repeat(methodDepth - 1);
        return repeatedBar + BAR + prefix;
    }

    public String getLogId() {
        return logId.getId();
    }

    public long executionTime(final long currentTimeMillis) {
        if (callTimeStack.isEmpty()) {
            return 0;
        }
        return currentTimeMillis - callTimeStack.pop();
    }

    public long totalTakenTime(final long currentTimeMillis) {
        return currentTimeMillis - startTimeMillis;
    }

    public void setLogId(final LogId logId) {
        this.logId = logId;
    }

}
