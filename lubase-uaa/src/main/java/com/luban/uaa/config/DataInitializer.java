package com.luban.uaa.config;

import com.luban.uaa.entity.User;
import com.luban.uaa.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        // 创建普通用户
        if (!userRepository.existsByUsername("user_1")) {
            User user = User.builder()
                    .username("user_1")
                    .password(passwordEncoder.encode("user_1"))
                    .roles("USER")
                    .enabled(true)
                    .accountNonExpired(true)
                    .accountNonLocked(true)
                    .credentialsNonExpired(true)
                    .build();
            userRepository.save(user);
        }

        // 创建EDITOR用户
        if (!userRepository.existsByUsername("editor_1")) {
            User editor = User.builder()
                    .username("editor_1")
                    .password(passwordEncoder.encode("editor_1"))
                    .roles("EDITOR")
                    .enabled(true)
                    .accountNonExpired(true)
                    .accountNonLocked(true)
                    .credentialsNonExpired(true)
                    .build();
            userRepository.save(editor);
        }

        // 创建PRODUCT_ADMIN用户
        if (!userRepository.existsByUsername("adm_1")) {
            User admin = User.builder()
                    .username("adm_1")
                    .password(passwordEncoder.encode("adm_1"))
                    .roles("PRODUCT_ADMIN")
                    .enabled(true)
                    .accountNonExpired(true)
                    .accountNonLocked(true)
                    .credentialsNonExpired(true)
                    .build();
            userRepository.save(admin);
        }
    }
}
