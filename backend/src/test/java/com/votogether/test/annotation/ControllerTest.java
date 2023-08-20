package com.votogether.test.annotation;

import com.votogether.global.log.context.MemberIdHolder;
import com.votogether.global.log.presentation.RequestLogInterceptor;
import org.springframework.boot.test.mock.mockito.MockBean;

public class ControllerTest {

    @MockBean
    MemberIdHolder memberIdHolder;

    @MockBean
    RequestLogInterceptor requestLogInterceptor;

}
