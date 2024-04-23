package com.Planner.PlanifyHub.domain.team.Response;

import com.Planner.PlanifyHub.domain.team.Entity.Team;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class CreateResponse {
    private final Team team;
}
