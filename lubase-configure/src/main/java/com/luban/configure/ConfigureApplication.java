package com.luban.configure;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.config.server.EnableConfigServer;

@SpringBootApplication
@EnableConfigServer
public class ConfigureApplication {
    public static void main(String[] args) {
        SpringApplication.run(ConfigureApplication.class, args);
    }
}
