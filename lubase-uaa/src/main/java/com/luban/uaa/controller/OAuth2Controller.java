package com.luban.uaa.controller;

import com.luban.uaa.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/uaa")
public class OAuth2Controller {

    @Autowired
    private JwtUtils jwtUtils;

    @Value("${frontend.url:http://localhost:3000}")
    private String frontendUrl;

    /**
     * GitHub OAuth2 登录成功后的回调
     * 重定向到前端，并带上 JWT token
     */
    @GetMapping("/oauth2/callback")
    public String oauth2Callback(Authentication authentication, RedirectAttributes redirectAttributes) {
        if (authentication == null || !(authentication instanceof OAuth2AuthenticationToken)) {
            redirectAttributes.addAttribute("error", "authentication_failed");
            return "redirect:" + frontendUrl + "/oauth/callback?error=authentication_failed";
        }

        OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
        OAuth2User oauthUser = oauthToken.getPrincipal();

        // 调试：打印所有 GitHub 返回的属性
        System.out.println("=== GitHub OAuth2 用户属性 ===");
        System.out.println("所有属性: " + oauthUser.getAttributes());
        System.out.println("================================");

        // 获取 GitHub 用户信息
        String githubId = oauthUser.getAttribute("id") != null ?
            String.valueOf(oauthUser.getAttribute("id")) : "github_user";
        String username = oauthUser.getAttribute("login") != null ?
            oauthUser.getAttribute("login") : "github_user";
        String name = oauthUser.getAttribute("name");
        String email = oauthUser.getAttribute("email");
        String avatarUrl = oauthUser.getAttribute("avatar_url");

        System.out.println("GitHub 用户信息: id=" + githubId + ", username=" + username + ", name=" + name + ", email=" + email + ", avatar=" + avatarUrl);

        // 使用 username@github 的格式作为唯一标识
        String loginUsername = username + "@github";

        // 获取角色（默认为 EDITOR）
        List<String> roles = new ArrayList<>();
        roles.add("EDITOR");

        // 构建 GitHub 用户资料
        Map<String, Object> additionalClaims = new HashMap<>();
        additionalClaims.put("github_id", githubId);
        additionalClaims.put("github_username", username);
        additionalClaims.put("provider", "github");
        if (name != null) {
            additionalClaims.put("name", name);
        }
        if (email != null) {
            additionalClaims.put("email", email);
        }
        if (avatarUrl != null) {
            additionalClaims.put("avatar", avatarUrl);
        }

        // 生成 JWT token（包含 GitHub 用户资料）
        String jwtToken = jwtUtils.generateToken(loginUsername, roles, additionalClaims);

        // 记录登录信息
        System.out.println("GitHub OAuth2 登录成功: username=" + loginUsername + ", name=" + name + ", email=" + email);

        // 重定向到前端，带上 token
        return "redirect:" + frontendUrl + "/oauth/callback?token=" + jwtToken;
    }

    /**
     * OAuth2 授权端点 - 触发 GitHub 登录
     * 访问 /uaa/oauth2/authorize/github 会跳转到 GitHub 授权页面
     */
    @GetMapping("/oauth2/authorize/github")
    public ResponseEntity<Map<String, String>> authorizeGithub() {
        // 返回授权 URL 前端跳转
        return ResponseEntity.ok(Map.of(
            "authorization_uri", "/oauth2/authorization/github",
            "message", "请访问 /oauth2/authorization/github 进行 GitHub 授权"
        ));
    }

    /**
     * 令牌端点 - 用授权码换取 token（可选前端使用）
     */
    @GetMapping("/oauth2/token")
    public ResponseEntity<Map<String, Object>> exchangeToken(
            @RequestParam("code") String code,
            @RequestParam(value = "grant_type", defaultValue = "authorization_code") String grantType) {
        
        // 这里可以添加用 authorization_code 换取 access_token 的逻辑
        // Spring Security OAuth2 已经自动处理了这个流程
        // 这个端点主要用于前端获取 token（如果需要的话）
        
        return ResponseEntity.ok(Map.of(
            "message", "请使用 /uaa/oauth2/callback 获取 token",
            "note", "GitHub OAuth2 登录后会自动重定向到前端并带上 token"
        ));
    }
}
