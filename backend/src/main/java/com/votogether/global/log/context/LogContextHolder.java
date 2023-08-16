package com.votogether.global.log.context;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.RequestScope;

@Getter
@RequestScope
@Component
public class LogContextHolder {

    @Setter
    private LogContext logContext;

    public void increaseCall() {
        logContext.increaseMethodCall();
    }

    public void decreaseCall() {
        logContext.decreaseMethodCall();
    }

}
