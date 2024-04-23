package com.Planner.PlanifyHub.domain.issue.Request;

import com.Planner.PlanifyHub.domain.member.Entity.Member;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateRequest {
    @ManyToOne
    private Member author;
    @NotBlank
    private String title;
    @NotBlank
    private String content;
    @NotBlank
    private String state;
}
