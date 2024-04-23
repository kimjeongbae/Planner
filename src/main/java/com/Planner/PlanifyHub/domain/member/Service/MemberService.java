package com.Planner.PlanifyHub.domain.member.Service;

import com.Planner.PlanifyHub.domain.calendar.Entity.Calendar;
import com.Planner.PlanifyHub.domain.member.Entity.Member;
import com.Planner.PlanifyHub.domain.member.Repository.MemberRepository;
import com.Planner.PlanifyHub.global.RsData.RsData;
import com.Planner.PlanifyHub.global.exceptions.GlobalException;
import com.Planner.PlanifyHub.global.jwt.JwtProvider;
import com.Planner.PlanifyHub.global.security.SecurityUser;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.*;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final JwtProvider jwtProvider;
    private final PasswordEncoder passwordEncoder;
    @Value("${custom.fileDirPath}")
    private String fileDirPath;

    public Member join(String username, String nickname, String hashedPassword, String email, MultipartFile thumbnail) throws IOException {
        String thumbnailRelPath;
        if (thumbnail != null && !thumbnail.isEmpty()) {
            thumbnailRelPath = "member/" + UUID.randomUUID().toString() + ".jpg";
            File thumbnailFile = new File(fileDirPath + "/" + thumbnailRelPath);
            try {
                thumbnail.transferTo(thumbnailFile);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        } else {
            // 기본 이미지 경로 설정
            thumbnailRelPath = "default_profile.jpg";
        }
        // Member 객체 생성
        Member member = Member.builder()
                .username(username)
                .nickname(nickname)
                .password(hashedPassword)
                .email(email)
                .thumbnailImg(thumbnailRelPath)
                .build();
        Calendar calendar = Calendar.builder().member(member).build();
        member.setCalendar(calendar);
        String refreshToken = jwtProvider.genRefreshToken(member);
        member.setRefreshToken(refreshToken);
        memberRepository.save(member);
        return member;
    }

    public SecurityUser getUserFromAccessToken(String accessToken) {
        Map<String, Object> payloadBody = jwtProvider.getClaims(accessToken);

        long id = (int) payloadBody.get("id");
        String username = (String) payloadBody.get("username");
        List<GrantedAuthority> authorities = new ArrayList<>();

        return new SecurityUser(
                id,
                username,
                "",
                authorities
        );
    }

    public boolean validateToken(String token) {
        return jwtProvider.verify(token);
    }

    public RsData<String> refreshAccessToken(String refreshToken) {
        Member member = memberRepository.findByRefreshToken(refreshToken).orElseThrow(() -> new GlobalException("400-1", "존재하지 않는 리프레시 토큰입니다."));
        String accessToken = jwtProvider.genAccessToken(member);
        return RsData.of("200-1", "토큰 갱신 성공", accessToken);
    }

    public Optional<Member> findByUsername(String username) {
        return this.memberRepository.findByUsername(username);
    }

    public Optional<Member> findByEmail(String email) {
        return this.memberRepository.findByEmail(email);
    }

    @AllArgsConstructor
    @Getter
    public static class AuthAndMakeTokensResponseBody {
        private Member member;
        private String accessToken;
        private String refreshToken;
    }

    @Transactional
    public RsData<AuthAndMakeTokensResponseBody> authAndMakeTokens(String username, String password) {
        // 회원 존재유무,
        Member member = this.memberRepository.findByUsername(username).orElseThrow(() -> new GlobalException("400-1", "해당 유저가 존재하지 않습니다."));

        // 비밀번호 일치 여부
        if (!passwordEncoder.matches(password, member.getPassword())) {
            throw  new GlobalException("400-2", "비밀번호가 일치 하지 않습니다.");
        }

        //리프레시토큰 가지고오기
        String refreshToken = member.getRefreshToken();

        // 회원데이터, 시간 설정 및 토큰 생성
        String accessToken = jwtProvider.genToken(member, 60 * 60 * 5);

        // 토큰 출력
        // System.out.println("accessToken :" + accessToken);
        return RsData.of("200-1", "로그인 성공", new AuthAndMakeTokensResponseBody(member, accessToken, refreshToken));
    }
}