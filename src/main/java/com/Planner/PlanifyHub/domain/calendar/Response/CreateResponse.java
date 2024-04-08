package com.Planner.PlanifyHub.domain.calendar.Response;

import com.Planner.PlanifyHub.domain.calendar.Entity.Calendar;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class CreateResponse {
    private final Calendar calendar;
}
