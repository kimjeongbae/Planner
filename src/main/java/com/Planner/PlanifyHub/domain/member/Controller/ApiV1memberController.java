package com.Planner.PlanifyHub.domain.member.Controller;


import com.Planner.PlanifyHub.domain.member.DTO.MemberDto;
import com.Planner.PlanifyHub.domain.member.Entity.Member;
import com.Planner.PlanifyHub.domain.member.Request.JoinRequest;
import com.Planner.PlanifyHub.domain.member.Request.LoginRequest;
import com.Planner.PlanifyHub.domain.member.Response.JoinResponse;
import com.Planner.PlanifyHub.domain.member.Response.LoginResponse;
import com.Planner.PlanifyHub.domain.member.Response.MeResponse;
import com.Planner.PlanifyHub.domain.member.Service.MemberService;
import com.Planner.PlanifyHub.global.RsData.RsData;
import com.Planner.PlanifyHub.global.rq.Rq;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/members")
@RequiredArgsConstructor
public class ApiV1memberController {
    private final MemberService memberService;
    private final PasswordEncoder passwordEncoder;
    private final Rq rq;

    @PostMapping("/join")
    @ResponseBody
    public RsData<JoinResponse> signUp(@Valid JoinRequest joinRequest, @RequestParam(value = "thumbnail", required = false) MultipartFile thumbnailImg) throws IOException {
        Optional<Member> existingUsername = memberService.findByUsername(joinRequest.getUsername());
        if (existingUsername.isPresent()) {
            return RsData.of("F-06", "Validation Error 해당 사용자명이 이미 존재합니다");
        }
        Optional<Member> existingEmail = memberService.findByEmail(joinRequest.getEmail());
        if (existingEmail.isPresent()) {
            return RsData.of("F-06", "Validation Error 해당 이메일 이미 존재합니다");
        }
        if (!joinRequest.getPassword().equals(joinRequest.getPassword2())) {
            return RsData.of("F-06", "Validation Error 비밀번호가 서로 일치하지 않습니다");
        }
        try {
            if (thumbnailImg == null) {
                throw new IllegalArgumentException("이미지가 없습니다.");
            }
        String hashedPassword = passwordEncoder.encode(joinRequest.getPassword());
        Member member = memberService.join(joinRequest.getUsername(), joinRequest.getNickname() ,hashedPassword, joinRequest.getEmail(),thumbnailImg);
        return RsData.of("S-07", "Completed 회원가입이 완료되었습니다.", new JoinResponse(member));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/login")
    public RsData<LoginResponse> login (@Valid @RequestBody LoginRequest LoginRequest) {

        RsData<MemberService.AuthAndMakeTokensResponseBody> authAndMakeTokensRs = memberService.authAndMakeTokens(LoginRequest.getUsername(), LoginRequest.getPassword());

        // 토큰 쿠키에 등록
        rq.setCrossDomainCookie("accessToken", authAndMakeTokensRs.getData().getAccessToken());
        rq.setCrossDomainCookie("refreshToken", authAndMakeTokensRs.getData().getRefreshToken());

        return RsData.of(
                authAndMakeTokensRs.getResultCode(),
                authAndMakeTokensRs.getMsg(),
                new LoginResponse(new MemberDto(authAndMakeTokensRs.getData().getMember()))
        );
    }

    @PostMapping("/logout")
    public RsData<Void> logout () {
        rq.removeCrossDomainCookie("accessToken");
        rq.removeCrossDomainCookie("refreshToken");

        return RsData.of("200", "로그아웃 성공");
    }

        @GetMapping("/me")
        public RsData<MeResponse> getMe () {
            Member member = rq.getMember();

            return RsData.of(
                    "S-2",
                    "성공",
                    new MeResponse(new MemberDto(member))
            );
    }




}