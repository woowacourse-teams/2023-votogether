package com.votogether.global.log.aop;

import com.votogether.global.log.context.QueryCount;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.aop.framework.ProxyFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class QueryCountAop {

    private final QueryCount queryCount;

    public QueryCountAop(final QueryCount queryCount) {
        this.queryCount = queryCount;
    }

    @Around("execution(* javax.sql.DataSource.getConnection())")
    public Object getConnection(final ProceedingJoinPoint joinPoint) throws Throwable {
        final Object connection = joinPoint.proceed();
        final ProxyFactory proxyFactory = new ProxyFactory(connection);
        proxyFactory.addAdvice(new ConnectionMethodInterceptor(queryCount));
        return proxyFactory.getProxy();
    }

}
