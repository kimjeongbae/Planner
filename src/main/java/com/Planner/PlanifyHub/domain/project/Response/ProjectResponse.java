package com.Planner.PlanifyHub.domain.project.Response;

import com.Planner.PlanifyHub.domain.project.Entity.Project;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class ProjectResponse {
    private final List<Project> projects;
}
