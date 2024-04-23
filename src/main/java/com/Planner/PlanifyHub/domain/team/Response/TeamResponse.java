package com.Planner.PlanifyHub.domain.team.Response;

import com.Planner.PlanifyHub.domain.team.Entity.Team;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
public class TeamResponse {
    private final List<Team> teams;
}
