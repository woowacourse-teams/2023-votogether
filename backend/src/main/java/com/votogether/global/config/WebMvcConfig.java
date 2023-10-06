package com.votogether.global.config;

import com.votogether.global.jwt.JwtAuthenticationFilter;
import com.votogether.global.jwt.JwtAuthorizationArgumentResolver;
import com.votogether.global.jwt.TokenProcessor;
import com.votogether.global.log.context.MemberIdHolder;
import com.votogether.global.log.presentation.RequestLogInterceptor;
import com.votogether.global.log.presentation.RequestResponseCacheFilter;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@RequiredArgsConstructor
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    private static final String LOCALHOST_FRONTEND = "http://localhost:3000";
    private static final String HTTPS_LOCALHOST_FRONTEND = "https://localhost:3000";
    private static final String DEV_SERVER = "https://dev.votogether.com";
    private static final String PROD_SERVER = "https://votogether.com";

    private final MemberIdHolder memberIdHolder;
    private final TokenProcessor tokenProcessor;
    private final RequestLogInterceptor requestLogInterceptor;
    private final JwtAuthorizationArgumentResolver jwtAuthorizationArgumentResolver;

    @Bean
    public FilterRegistrationBean<CorsFilter> corsFilterRegistrationBean() {
        final CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin(LOCALHOST_FRONTEND);
        config.addAllowedOrigin(HTTPS_LOCALHOST_FRONTEND);
        config.addAllowedOrigin(DEV_SERVER);
        config.addAllowedOrigin(PROD_SERVER);
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        config.addExposedHeader(HttpHeaders.LOCATION);
        config.addExposedHeader(HttpHeaders.SET_COOKIE);

        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        final FilterRegistrationBean<CorsFilter> filterBean = new FilterRegistrationBean<>(new CorsFilter(source));
        filterBean.setOrder(0);

        return filterBean;
    }

    @Bean
    public FilterRegistrationBean<RequestResponseCacheFilter> requestResponseCacheFilter() {
        final FilterRegistrationBean<RequestResponseCacheFilter> filterRegistrationBean = new FilterRegistrationBean<>();
        filterRegistrationBean.setFilter(new RequestResponseCacheFilter());
        filterRegistrationBean.addUrlPatterns("/*");
        filterRegistrationBean.setOrder(1);
        return filterRegistrationBean;
    }

    @Bean
    public FilterRegistrationBean<JwtAuthenticationFilter> jwtAuthenticationFilter() {
        final FilterRegistrationBean<JwtAuthenticationFilter> filterRegistrationBean = new FilterRegistrationBean<>();
        filterRegistrationBean.setFilter(new JwtAuthenticationFilter(memberIdHolder, tokenProcessor));
        filterRegistrationBean.addUrlPatterns("/*");
        filterRegistrationBean.setOrder(2);
        return filterRegistrationBean;
    }

    @Override
    public void addInterceptors(final InterceptorRegistry registry) {
        registry.addInterceptor(requestLogInterceptor)
                .addPathPatterns("/**")
                .order(1);
    }

    @Override
    public void addArgumentResolvers(final List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(jwtAuthorizationArgumentResolver);
    }

}
