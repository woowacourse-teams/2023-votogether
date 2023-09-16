package com.votogether.global.config;

import com.votogether.global.jwt.JwtAuthorizationArgumentResolver;
import java.util.List;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    private static final String LOCALHOST_FRONTEND = "http://localhost:3000";
    private static final String DEV_SERVER = "https://dev.votogether.com";
    private static final String PROD_SERVER = "https://votogether.com";

    private final JwtAuthorizationArgumentResolver jwtAuthorizationArgumentResolver;

    public WebMvcConfig(final JwtAuthorizationArgumentResolver jwtAuthorizationArgumentResolver) {
        this.jwtAuthorizationArgumentResolver = jwtAuthorizationArgumentResolver;
    }

    @Override
    public void addArgumentResolvers(final List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(jwtAuthorizationArgumentResolver);
    }

    @Override
    public void addCorsMappings(final CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedHeaders("*")
                .allowedOrigins(LOCALHOST_FRONTEND, DEV_SERVER, PROD_SERVER)
                .allowedMethods("*")
                .allowCredentials(true)
                .exposedHeaders(HttpHeaders.LOCATION, HttpHeaders.SET_COOKIE);
    }

}
