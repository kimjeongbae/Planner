package com.Planner.PlanifyHub.domain.member.Request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class JoinRequest {
    @NotBlank
    private String username;
    @NotBlank
    private String nickname;
    @NotBlank
    private String password;
    @NotBlank
    private String password2;
    @NotBlank
    private String email;
}
