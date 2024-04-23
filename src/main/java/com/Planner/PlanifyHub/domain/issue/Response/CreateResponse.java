package com.Planner.PlanifyHub.domain.issue.Response;

import com.Planner.PlanifyHub.domain.issue.Entity.Issue;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CreateResponse {
    private final Issue issue;
}
