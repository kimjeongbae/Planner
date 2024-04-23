package com.Planner.PlanifyHub.domain.issue.Response;

import com.Planner.PlanifyHub.domain.issue.DTO.IssueDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class IssuesResponse {
    private final List<IssueDTO> issues;
}
