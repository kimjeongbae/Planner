package com.Planner.PlanifyHub.domain.project.Repository;

import com.Planner.PlanifyHub.domain.project.Entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project,Long> {
}
