package com.Planner.PlanifyHub.domain.project.Response;

import com.Planner.PlanifyHub.domain.project.DTO.ProjectDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class ProjectsResponse {

    private final List<ProjectDTO> projects;
}
