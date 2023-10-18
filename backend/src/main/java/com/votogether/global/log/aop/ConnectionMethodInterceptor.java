package com.votogether.global.log.aop;

import com.votogether.global.log.context.QueryCount;
import java.sql.PreparedStatement;
import lombok.RequiredArgsConstructor;
import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;
import org.springframework.aop.framework.ProxyFactory;

@RequiredArgsConstructor
public class ConnectionMethodInterceptor implements MethodInterceptor {

    private final QueryCount queryCount;

    @Override
    public Object invoke(final MethodInvocation invocation) throws Throwable {
        final Object result = invocation.proceed();
        if (result instanceof PreparedStatement ps) {
            final ProxyFactory proxyFactory = new ProxyFactory(ps);
            proxyFactory.addAdvice(new PreparedStatementMethodInterceptor(queryCount));
            return proxyFactory.getProxy();
        }
        return result;
    }

}
