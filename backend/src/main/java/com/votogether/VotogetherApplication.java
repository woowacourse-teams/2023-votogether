package com.votogether;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@ConfigurationPropertiesScan
@SpringBootApplication
public class VotogetherApplication {

    public static void main(String[] args) {
        SpringApplication.run(VotogetherApplication.class, args);
    }

}
