package com.Planner.PlanifyHub.domain.schedule.Response;

import com.Planner.PlanifyHub.domain.schedule.Entity.Schedule;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class UpdateResponse {
    private final Schedule schedule;
}
