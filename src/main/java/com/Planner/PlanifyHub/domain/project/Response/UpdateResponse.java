package com.Planner.PlanifyHub.domain.project.Response;

import com.Planner.PlanifyHub.domain.project.Entity.Project;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UpdateResponse {
    private final Project project;
}
