package com.votogether.global.log.aop;

import com.votogether.global.log.context.LogContext;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@RequiredArgsConstructor
@Component
public class Logger {

    private static final String DOT = ".";
    private static final String PARENTHESES = "()";
    private static final String CALL_PREFIX = "--->";
    private static final String RETURN_PREFIX = "<---";
    private static final String EX_PREFIX = "<X--";

    private final LogContext logContext;

    public void methodCall(final String className, final String methodName) {
        logContext.increaseMethodCall();
        log.info("[{}]  {}",
                logContext.getLogId(),
                formattedClassAndMethod(logContext.depthPrefix(CALL_PREFIX), className, methodName)
        );
    }

    public void methodReturn(final String className, final String methodName) {
        final long currentTimeMillis = System.currentTimeMillis();
        log.info("[{}]  {} - [execution time = {}ms]  [total time = {}ms]",
                logContext.getLogId(),
                formattedClassAndMethod(logContext.depthPrefix(RETURN_PREFIX), className, methodName),
                logContext.executionTime(currentTimeMillis),
                logContext.totalTakenTime(currentTimeMillis)
        );
        logContext.decreaseMethodCall();
    }

    public void throwException(final String className, final String methodName, final Throwable exception) {
        final long currentTimeMillis = System.currentTimeMillis();
        log.warn("[{}]  {} - [execution time = {}ms]  [total time = {}ms]  [throws {}]",
                logContext.getLogId(),
                formattedClassAndMethod(logContext.depthPrefix(EX_PREFIX), className, methodName),
                logContext.executionTime(currentTimeMillis),
                logContext.totalTakenTime(currentTimeMillis),
                exception.getClass().getSimpleName()
        );
        logContext.decreaseMethodCall();
    }

    private String formattedClassAndMethod(final String prefix, final String className, final String methodName) {
        return prefix + className + DOT + methodName + PARENTHESES;
    }

}
