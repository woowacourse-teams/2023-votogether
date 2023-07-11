package com.votogether.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenAPIConfig {

    @Value("${votogether.openapi.dev-url}")
    private String devUrl;

    @Value("${votogether.openapi.prod-url}")
    private String prodUrl;

    @Bean
    public OpenAPI openAPI() {
        final Server devServer = new Server();
        devServer.setUrl(devUrl);
        devServer.description("개발 환경 서버 URL");

        final Server prodServer = new Server();
        prodServer.setUrl(prodUrl);
        prodServer.description("운영 환경 서버 URL");

        final Info info = new Info()
                .title("VoTogether API")
                .version("v1.0.0")
                .description("보투게더 API");

        return new OpenAPI()
                .info(info)
                .servers(List.of(devServer, prodServer));
    }

}
