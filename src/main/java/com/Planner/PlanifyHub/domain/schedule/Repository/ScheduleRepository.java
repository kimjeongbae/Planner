package com.Planner.PlanifyHub.domain.schedule.Repository;

import com.Planner.PlanifyHub.domain.schedule.Entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
}
