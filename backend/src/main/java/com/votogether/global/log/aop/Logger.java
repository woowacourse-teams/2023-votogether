package com.votogether.global.log.aop;

import com.votogether.global.log.context.LogContext;
import com.votogether.global.log.context.LogContextHolder;
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

    private final LogContextHolder logContextHolder;

    public void methodCall(final String className, final String methodName) {
        final LogContext logContext = logContextHolder.getLogContext();
        logContextHolder.increaseCall();
        log.info("[{}]  {}",
                logContext.getLogId(),
                formattedClassAndMethod(logContext.depthPrefix(CALL_PREFIX), className, methodName)
        );
    }

    public void methodReturn(final String className, final String methodName) {
        final LogContext logContext = logContextHolder.getLogContext();
        log.info("[{}]  {}  time={}ms",
                logContext.getLogId(),
                formattedClassAndMethod(logContext.depthPrefix(RETURN_PREFIX), className, methodName),
                logContext.totalTakenTime()
        );
        logContextHolder.decreaseCall();
    }

    public void throwException(final String className, final String methodName, final Throwable exception) {
        final LogContext logContext = logContextHolder.getLogContext();
        log.warn("[{}]  {}  time={}ms,  throws {}",
                logContext.getLogId(),
                formattedClassAndMethod(logContext.depthPrefix(EX_PREFIX), className, methodName),
                logContext.totalTakenTime(),
                exception.getClass().getSimpleName()
        );
        logContextHolder.decreaseCall();
    }

    private String formattedClassAndMethod(final String prefix, final String className, final String methodName) {
        return prefix + className + DOT + methodName + PARENTHESES;
    }

}
