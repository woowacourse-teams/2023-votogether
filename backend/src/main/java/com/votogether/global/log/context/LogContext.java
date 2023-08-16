package com.votogether.global.log.context;

public class LogContext {

    private static final String BAR = "|";
    private static final String BLANK = " ";

    private final LogId logId;
    private final long startTimeMillis;
    private int methodDepth = 0;

    public LogContext(final LogId logId) {
        this.logId = logId;
        this.startTimeMillis = System.currentTimeMillis();
    }

    public void increaseMethodCall() {
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

    public long totalTakenTime() {
        return System.currentTimeMillis() - startTimeMillis;
    }

}
