package com.Planner.PlanifyHub.domain.project.Request;

import com.Planner.PlanifyHub.domain.member.Entity.Member;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UpdateRequest {
    @ManyToOne
    private Member author;
    @NotBlank
    private String title;
    @NotBlank
    private String content;
}
