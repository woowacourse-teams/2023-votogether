package com.votogether.global.log.presentation;

import com.votogether.global.log.context.LogContext;
import com.votogether.global.log.context.LogId;
import com.votogether.global.log.context.MemberIdHolder;
import com.votogether.global.log.context.QueryCount;
import com.votogether.global.util.CorsUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

@Slf4j
@RequiredArgsConstructor
@Component
public class RequestLogInterceptor implements HandlerInterceptor {

    private static final String DOT = ".";
    private static final String PARENTHESES = "()";
    private static final int WARNING_QUERY_COUNT = 5;
    private static final int WARNING_TOTAL_EXECUTE_MS_TIME = 2500;

    private final MemberIdHolder memberIdHolder;
    private final QueryCount queryCount;
    private final LogContext logContext;

    @Override
    public boolean preHandle(
            final HttpServletRequest request,
            final HttpServletResponse response,
            final Object handler
    ) {
        if (CorsUtils.isPreflightRequest(request)) {
            return true;
        }
        logContext.setLogId(LogId.from(memberIdHolder));
        if (handler instanceof HandlerMethod) {
            final RequestLog requestLog = new RequestLog(logContext.getLogId(), request);
            requestLog.put("Controller Method", handlerMethod((HandlerMethod) handler));
            log.info("\n[Web Request START] : [\n{}]", requestLog);
        }
        return true;
    }

    private String handlerMethod(final HandlerMethod handler) {
        final String className = handler.getMethod().getDeclaringClass().getSimpleName();
        final String methodName = handler.getMethod().getName();
        return className + DOT + methodName + PARENTHESES;
    }

    @Override
    public void afterCompletion(
            final HttpServletRequest request,
            final HttpServletResponse response,
            final Object handler,
            final Exception ex
    ) {
        if (CorsUtils.isPreflightRequest(request)) {
            return;
        }
        final ResponseLog responseLog = new ResponseLog(logContext.getLogId(), response);
        final long currentTimeMillis = System.currentTimeMillis();
        final long totalTime = logContext.totalTakenTime(currentTimeMillis);
        responseLog.put("Query Count", queryCount.getCount());
        responseLog.put("Total Time", totalTime + "ms");
        log.info("\n[Web Request END] : [\n{}]", responseLog);
        logWarning(logContext, totalTime);
    }

    private void logWarning(final LogContext logContext, final long totalTime) {
        if (queryCount.getCount() >= WARNING_QUERY_COUNT) {
            log.warn("[{}] : 쿼리가 {}번 이상 실행되었습니다. (총 {}번)",
                    logContext.getLogId(),
                    WARNING_QUERY_COUNT,
                    queryCount.getCount()
            );
        }
        if (totalTime >= WARNING_TOTAL_EXECUTE_MS_TIME) {
            log.warn("[{}] : 요청을 처리하는데 {}ms 이상 소요되었습니다. (총 {}ms)",
                    logContext.getLogId(),
                    WARNING_TOTAL_EXECUTE_MS_TIME,
                    totalTime
            );
        }
    }

}
