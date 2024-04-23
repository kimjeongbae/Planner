package com.Planner.PlanifyHub.domain.issue.Response;

import com.Planner.PlanifyHub.domain.issue.DTO.IssueDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;


@Getter
@AllArgsConstructor
public class IssueResponse {
    private final IssueDTO issue;
}
