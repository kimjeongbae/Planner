package com.Planner.PlanifyHub.domain.project.Response;

import com.Planner.PlanifyHub.domain.project.DTO.ProjectDTO;


import lombok.AllArgsConstructor;
import lombok.Getter;


@Getter
@AllArgsConstructor
public class ProjectResponse {
    private final ProjectDTO project;
}
