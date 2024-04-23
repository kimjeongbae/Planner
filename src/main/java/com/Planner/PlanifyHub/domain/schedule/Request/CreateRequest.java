package com.Planner.PlanifyHub.domain.schedule.Request;

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
    private String title;
    @NotBlank
    private String content;
    @NotBlank
    private String color;
    private LocalDate start_date;
    private LocalDate end_date;
}
