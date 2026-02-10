package com.luban.uaa.config;

import com.luban.uaa.utils.JwtUtils;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    @Autowired
    private JwtUtils jwtUtils;

    @Value("${frontend.url:https://lubase.frp.zhenjiucheng.net}")
    private String frontendUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        if (authentication instanceof OAuth2AuthenticationToken) {
            OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
            OAuth2User oauthUser = oauthToken.getPrincipal();

            // 调试：打印所有 GitHub 返回的属性
            System.out.println("=== GitHub OAuth2 SuccessHandler 用户属性 ===");
            System.out.println("所有属性: " + oauthUser.getAttributes());
            System.out.println("============================================");

            // 获取 GitHub 用户信息
            Object idAttr = oauthUser.getAttribute("id");
            String githubId = (idAttr != null) ? String.valueOf(idAttr) : "github_user";
            
            Object loginAttr = oauthUser.getAttribute("login");
            String username = (loginAttr != null) ? String.valueOf(loginAttr) : "github_user";
            
            Object nameAttr = oauthUser.getAttribute("name");
            String name = (nameAttr != null && !nameAttr.toString().equals("null")) ? nameAttr.toString() : null;
            
            Object emailAttr = oauthUser.getAttribute("email");
            String email = (emailAttr != null && !emailAttr.toString().equals("null")) ? emailAttr.toString() : null;
            
            Object avatarAttr = oauthUser.getAttribute("avatar_url");
            String avatarUrl = (avatarAttr != null && !avatarAttr.toString().equals("null")) ? avatarAttr.toString() : null;

            // 获取其他 GitHub 信息
            Object companyAttr = oauthUser.getAttribute("company");
            String company = (companyAttr != null && !companyAttr.toString().equals("null")) ? companyAttr.toString() : null;

            Object blogAttr = oauthUser.getAttribute("blog");
            String blog = (blogAttr != null && !blogAttr.toString().equals("null")) ? blogAttr.toString() : null;

            Object locationAttr = oauthUser.getAttribute("location");
            String location = (locationAttr != null && !locationAttr.toString().equals("null")) ? locationAttr.toString() : null;

            Object bioAttr = oauthUser.getAttribute("bio");
            String bio = (bioAttr != null && !bioAttr.toString().equals("null")) ? bioAttr.toString() : null;

            Object htmlUrlAttr = oauthUser.getAttribute("html_url");
            String htmlUrl = (htmlUrlAttr != null && !htmlUrlAttr.toString().equals("null")) ? htmlUrlAttr.toString() : null;

            // 获取更多 GitHub 信息
            Object twitterAttr = oauthUser.getAttribute("twitter_username");
            String twitterUsername = (twitterAttr != null && !twitterAttr.toString().equals("null")) ? twitterAttr.toString() : null;

            Object publicReposAttr = oauthUser.getAttribute("public_repos");
            Integer publicRepos = (publicReposAttr != null) ? Integer.parseInt(publicReposAttr.toString()) : 0;

            Object publicGistsAttr = oauthUser.getAttribute("public_gists");
            Integer publicGists = (publicGistsAttr != null) ? Integer.parseInt(publicGistsAttr.toString()) : 0;

            Object followersAttr = oauthUser.getAttribute("followers");
            Integer followers = (followersAttr != null) ? Integer.parseInt(followersAttr.toString()) : 0;

            Object followingAttr = oauthUser.getAttribute("following");
            Integer following = (followingAttr != null) ? Integer.parseInt(followingAttr.toString()) : 0;

            Object typeAttr = oauthUser.getAttribute("type");
            String type = (typeAttr != null) ? typeAttr.toString() : "User";

            Object hireableAttr = oauthUser.getAttribute("hireable");
            Boolean hireable = (hireableAttr != null) ? Boolean.parseBoolean(hireableAttr.toString()) : false;

            Object createdAtAttr = oauthUser.getAttribute("created_at");
            String createdAt = (createdAtAttr != null) ? createdAtAttr.toString() : null;

            System.out.println("GitHub 用户信息: id=" + githubId + ", username=" + username + ", name=" + name + ", company=" + company + ", email=" + email + ", avatar=" + avatarUrl + ", followers=" + followers + ", following=" + following);

            // 使用 username@github 的格式作为唯一标识
            String loginUsername = username + "@github";

            // 获取角色（默认为 EDITOR）
            List<String> roles = new ArrayList<>();
            roles.add("EDITOR");

            // 构建 GitHub 用户资料（添加到 JWT）
            Map<String, Object> additionalClaims = new HashMap<>();
            additionalClaims.put("github_id", githubId);
            additionalClaims.put("github_username", username);
            additionalClaims.put("provider", "github");
            if (name != null && !name.equals("null")) {
                additionalClaims.put("name", name);
            }
            if (email != null && !email.equals("null")) {
                additionalClaims.put("email", email);
            }
            if (avatarUrl != null && !avatarUrl.equals("null")) {
                additionalClaims.put("avatar", avatarUrl);
            }
            if (company != null && !company.equals("null")) {
                additionalClaims.put("company", company);
            }
            if (blog != null && !blog.equals("null")) {
                additionalClaims.put("blog", blog);
            }
            if (location != null && !location.equals("null")) {
                additionalClaims.put("location", location);
            }
            if (bio != null && !bio.equals("null")) {
                additionalClaims.put("bio", bio);
            }
            if (htmlUrl != null && !htmlUrl.equals("null")) {
                additionalClaims.put("html_url", htmlUrl);
            }
            if (twitterUsername != null && !twitterUsername.equals("null")) {
                additionalClaims.put("twitter", twitterUsername);
            }
            additionalClaims.put("public_repos", publicRepos);
            additionalClaims.put("public_gists", publicGists);
            additionalClaims.put("followers", followers);
            additionalClaims.put("following", following);
            additionalClaims.put("account_type", type);
            additionalClaims.put("hireable", hireable);
            if (createdAt != null && !createdAt.equals("null")) {
                additionalClaims.put("created_at", createdAt);
            }

            // 生成 JWT token（包含 GitHub 用户资料）
            String jwtToken = jwtUtils.generateToken(loginUsername, roles, additionalClaims);

            // 调试：解析 JWT 并打印 payload
            String[] jwtParts = jwtToken.split("\\.");
            if (jwtParts.length == 3) {
                try {
                    String payloadJson = new String(java.util.Base64.getUrlDecoder().decode(jwtParts[1]));
                    System.out.println("JWT Payload: " + payloadJson);
                } catch (Exception e) {
                    System.out.println("无法解析 JWT payload");
                }
            }

            System.out.println("GitHub OAuth2 登录成功: username=" + loginUsername + ", name=" + name + ", email=" + email);

            // 重定向到前端回调页面，带上 token
            String redirectUrl = frontendUrl + "/oauth/callback?token=" + jwtToken;
            System.out.println("重定向到: " + redirectUrl);
            response.sendRedirect(redirectUrl);
        } else {
            // 不是 OAuth2 认证，降级到默认行为
            response.sendRedirect("/uaa/login");
        }
    }
}
