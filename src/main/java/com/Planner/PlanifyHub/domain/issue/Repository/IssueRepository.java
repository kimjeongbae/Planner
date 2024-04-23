package com.Planner.PlanifyHub.domain.issue.Repository;

import com.Planner.PlanifyHub.domain.issue.Entity.Issue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IssueRepository extends JpaRepository<Issue,Long> {
}
