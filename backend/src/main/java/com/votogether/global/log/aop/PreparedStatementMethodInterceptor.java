package com.votogether.global.log.aop;

import com.votogether.global.log.context.QueryCount;
import java.lang.reflect.Method;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;
import org.springframework.web.context.request.RequestContextHolder;

@RequiredArgsConstructor
public class PreparedStatementMethodInterceptor implements MethodInterceptor {

    private static final Set<String> QUERY_METHODS = new HashSet<>(List.of("execute", "executeQuery", "executeUpdate"));

    private final QueryCount queryCount;

    @Override
    public Object invoke(final MethodInvocation invocation) throws Throwable {
        if (isExecuteQuery(invocation.getMethod()) && isRequestScope()) {
            queryCount.increase();
        }
        return invocation.proceed();
    }

    private boolean isExecuteQuery(final Method method) {
        final String methodName = method.getName();
        return QUERY_METHODS.contains(methodName);
    }

    private boolean isRequestScope() {
        return Objects.nonNull(RequestContextHolder.getRequestAttributes());
    }

}
