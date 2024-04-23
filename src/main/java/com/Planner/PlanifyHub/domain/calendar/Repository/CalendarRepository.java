package com.Planner.PlanifyHub.domain.calendar.Repository;

import com.Planner.PlanifyHub.domain.calendar.Entity.Calendar;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CalendarRepository extends JpaRepository<Calendar, Long> {
}
