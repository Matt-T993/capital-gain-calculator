package com.fdmgroup.cgt_tracker.config;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class CookieUtil {

    @Value("${cookie.domain:localhost}")
    private String cookieDomain;

    public Cookie createCookie(String name, String value) {
        Cookie cookie = new Cookie(name, value);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setDomain(cookieDomain);
        cookie.setAttribute("SameSite", "None");
        return cookie;
    }

    public void invalidateCookie(HttpServletResponse response, String cookieName) {
        Cookie cookie = createCookie(cookieName, null);
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }

    public Map<String, String> getTokensFromCookies(Cookie[] cookies) {
        Map<String, String> tokens = new HashMap<>();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("SESSION-TOKEN")) {
                    tokens.put("sessionToken", cookie.getValue());
                } else if (cookie.getName().equals("REMEMBER-ME-TOKEN")) {
                    tokens.put("rememberMeToken", cookie.getValue());
                }
            }
        }

        return tokens;
    }
    
    public String extractTokenFromHeader(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

}
