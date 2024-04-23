package com.Planner.PlanifyHub.domain.calendar.Response;

import com.Planner.PlanifyHub.domain.calendar.Entity.Calendar;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
public class CalendarResponse {
    private final List<Calendar> calendars;
}
