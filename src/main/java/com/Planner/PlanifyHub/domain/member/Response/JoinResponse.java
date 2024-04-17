package com.Planner.PlanifyHub.domain.member.Response;

import com.Planner.PlanifyHub.domain.member.Entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class JoinResponse {
    private final Member member;
}
