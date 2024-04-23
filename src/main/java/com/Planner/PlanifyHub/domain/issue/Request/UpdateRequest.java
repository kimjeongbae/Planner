package com.Planner.PlanifyHub.domain.issue.Request;

import lombok.Data;

@Data
public class UpdateRequest {
    private String title;
    private String content;
    private String state;
}
