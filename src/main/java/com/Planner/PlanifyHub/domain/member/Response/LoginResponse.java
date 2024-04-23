package com.Planner.PlanifyHub.domain.member.Response;

import com.Planner.PlanifyHub.domain.member.DTO.MemberDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginResponse {
    private MemberDto memberDto;
}
