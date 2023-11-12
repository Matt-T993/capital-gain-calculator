package com.fdmgroup.cgt_tracker.config;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.auth0.jwt.exceptions.JWTVerificationException;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CookieUtil cookieUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            Map<String, String> tokens = cookieUtil.getTokensFromCookies(request.getCookies());
            
            String sessionToken = tokens.get("sessionToken");
            String rememberMeToken = tokens.get("rememberMeToken");
            
            if(sessionToken == null) {
            	 sessionToken = cookieUtil.extractTokenFromHeader(request);
            }

            if (sessionToken == null && rememberMeToken == null) {
                SecurityContextHolder.clearContext();
                filterChain.doFilter(request, response);
                return;
            }
            if (rememberMeToken != null && jwtUtil.isTokenExpired(rememberMeToken)) {
                cookieUtil.invalidateCookie(response, "REMEMBER-ME-TOKEN");
                rememberMeToken = null;
            }

            if (sessionToken != null) {
                if (jwtUtil.isTokenExpired(sessionToken) && jwtUtil.isRememberMeTokenValid(rememberMeToken)) {
                    String username = jwtUtil.extractUsername(sessionToken);
                    sessionToken = jwtUtil.createSessionToken(username);
                    Cookie refreshedSessionCookie = cookieUtil.createCookie("SESSION-TOKEN", sessionToken);
                    response.addCookie(refreshedSessionCookie);
                }

                if (jwtUtil.verifyToken(sessionToken) != null) {
                    String username = jwtUtil.extractUsername(sessionToken);
                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                            username, null, new ArrayList<>());
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                } else {
                    SecurityContextHolder.clearContext();
                    response.sendError(HttpStatus.UNAUTHORIZED.value(), "Invalid session token. Please login again.");
                    return;
                }
            }

        } catch (JWTVerificationException e) {
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.getWriter().write("{\"error\": \"Invalid token\"}");
            return;
        }

        filterChain.doFilter(request, response);
    }

}
