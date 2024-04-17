package com.Planner.PlanifyHub.global.security.filter;

import com.Planner.PlanifyHub.domain.member.Entity.Member;
import com.Planner.PlanifyHub.domain.member.Service.MemberService;
import com.Planner.PlanifyHub.global.RsData.RsData;
import com.Planner.PlanifyHub.global.jwt.JwtProvider;
import com.Planner.PlanifyHub.global.rq.Rq;
import com.Planner.PlanifyHub.global.security.SecurityUser;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class JwtAuthorizationFilter extends OncePerRequestFilter {
    private final Rq rq;
    private final MemberService memberService;

    @Override
    @SneakyThrows
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) {
        // 로그인, 로그아웃 제외
        if (request.getRequestURI().equals("/api/v1/members/login") || request.getRequestURI().equals("/api/v1/members/logout")) {
            filterChain.doFilter(request, response);
            return;
        }

        String accessToken = rq.getCookieValue("accessToken", "");

        if (!accessToken.isBlank()) {
            if (!memberService.validateToken(accessToken)) {
                String refreshToken = rq.getCookieValue("refreshToken", "");

                RsData<String> rs = memberService.refreshAccessToken(refreshToken);
                accessToken = rs.getData();
                rq.setCrossDomainCookie("accessToken", accessToken);
            }


            SecurityUser securityUser = memberService.getUserFromAccessToken(accessToken);
            rq.setLogin(securityUser);
        }
        filterChain.doFilter(request, response);
    }

}