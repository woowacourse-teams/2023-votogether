package com.votogether.domain.healthcheck.service;

import org.springframework.stereotype.Service;

@Service
public class HealthCheckService {

    public String check() {
        return "health-check";
    }

}
