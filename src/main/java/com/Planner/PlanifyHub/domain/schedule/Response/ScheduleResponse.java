package com.Planner.PlanifyHub.domain.schedule.Response;

import com.Planner.PlanifyHub.domain.schedule.Entity.Schedule;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;
@AllArgsConstructor
@Getter
public class ScheduleResponse {
    private final List<Schedule> schedules;
}
