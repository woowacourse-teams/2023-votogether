package com.votogether.test.annotation;

import com.votogether.global.log.presentation.RequestLogInterceptor;
import org.springframework.boot.test.mock.mockito.MockBean;

public class ControllerTest {

    @MockBean
    RequestLogInterceptor requestLogInterceptor;

}
