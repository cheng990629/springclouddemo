package com.luban.uaa.config;

import org.springframework.context.annotation.Configuration;

@Configuration
public class LdapConfig {

    // 生产环境使用外部LDAP服务器
    // 开发测试时可以使用嵌入式LDAP

    // 这里配置使用外部LDAP容器
    // Spring Boot会自动从application.yml读取ldap配置
}
