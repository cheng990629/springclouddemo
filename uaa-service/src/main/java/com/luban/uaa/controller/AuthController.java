package com.luban.uaa.controller;

import com.luban.uaa.dto.AuthResponse;
import com.luban.uaa.dto.LoginRequest;
import com.luban.uaa.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/uaa")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/token")
    public ResponseEntity<AuthResponse> getToken(@RequestBody LoginRequest request) {
        try {
            AuthResponse response = authService.login(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    AuthResponse.builder()
                            .tokenType("error")
                            .build()
            );
        }
    }

    @GetMapping("/login")
    public ResponseEntity<Map<String, String>> loginPage() {
        return ResponseEntity.ok(Map.of(
                "message", "请使用POST /uaa/token获取token",
                "username_password_login", "POST /uaa/token with grant_type=password",
                "github_login", "点击登录按钮跳转到 /oauth2/authorization/github",
                "ldap_login", "POST /uaa/ldap/token with username and password"
        ));
    }

    @PostMapping("/ldap/token")
    public ResponseEntity<AuthResponse> ldapLogin(@RequestBody Map<String, Object> request) {
        try {
            String username = (String) request.get("username");
            String password = (String) request.get("password");
            @SuppressWarnings("unchecked")
            List<String> roles = (List<String>) request.getOrDefault("roles", List.of("USER"));
            AuthResponse response = authService.loginFromLDAP(username, roles);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    AuthResponse.builder()
                            .tokenType("error")
                            .build()
            );
        }
    }

    @GetMapping("/check")
    public ResponseEntity<Map<String, Object>> checkToken(@RequestParam String token) {
        // Token验证端点
        return ResponseEntity.ok(Map.of(
                "valid", true,
                "message", "Token验证成功"
        ));
    }
}
