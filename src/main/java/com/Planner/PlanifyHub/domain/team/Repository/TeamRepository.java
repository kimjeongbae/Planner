package com.Planner.PlanifyHub.domain.team.Repository;

import com.Planner.PlanifyHub.domain.team.Entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamRepository extends JpaRepository<Team, Long> {
}
