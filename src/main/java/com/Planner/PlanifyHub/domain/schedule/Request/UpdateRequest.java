package com.Planner.PlanifyHub.domain.schedule.Request;

import lombok.Data;

import java.time.LocalDate;
@Data
public class UpdateRequest {
    private String title;
    private String content;
    private String color;
    private LocalDate start_date;
    private LocalDate end_date;
}
