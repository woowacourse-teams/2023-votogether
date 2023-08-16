package com.votogether.global.log.aop;

import java.util.Objects;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;

@Slf4j
@RequiredArgsConstructor
@Aspect
@Component
public class LogAop {

    private static final String PROXY = "Proxy";

    private final Logger logger;

    @Pointcut("@within(org.springframework.web.bind.annotation.RestController)")
    public void restControllerAnnotatedClass() {
    }

    @Pointcut("@within(org.springframework.stereotype.Service)")
    public void serviceAnnotatedClass() {
    }

    @Pointcut("execution(* com.votogether.domain..*Repository+.*(..))")
    public void repositoryClass() {
    }

    @Around("restControllerAnnotatedClass() || serviceAnnotatedClass() || repositoryClass()")
    public Object doLog(final ProceedingJoinPoint joinPoint) throws Throwable {
        if (!isRequestScope()) {
            return joinPoint.proceed();
        }
        final String className = getClassSimpleName(joinPoint);
        final String methodName = getMethodName(joinPoint);
        logger.methodCall(className, methodName);
        try {
            final Object result = joinPoint.proceed();
            logger.methodReturn(className, methodName);
            return result;
        } catch (Throwable e) {
            logger.throwException(className, methodName, e);
            throw e;
        }
    }

    private boolean isRequestScope() {
        return Objects.nonNull(RequestContextHolder.getRequestAttributes());
    }

    private String getClassSimpleName(final ProceedingJoinPoint joinPoint) {
        final Class<?> clazz = joinPoint.getTarget().getClass();
        String className = clazz.getSimpleName();
        if (className.contains(PROXY)) {
            className = clazz.getInterfaces()[0].getSimpleName();
        }
        return className;
    }

    private String getMethodName(final ProceedingJoinPoint joinPoint) {
        return joinPoint.getSignature().getName();
    }

}
