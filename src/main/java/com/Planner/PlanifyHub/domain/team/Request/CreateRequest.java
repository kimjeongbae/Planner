package com.Planner.PlanifyHub.domain.team.Request;

import com.Planner.PlanifyHub.domain.member.Entity.Member;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDate;

@Data
public class CreateRequest {
    @ManyToOne
    private Member author;
    @NotBlank
    private String name;
    @NotBlank
    private String content;
}
