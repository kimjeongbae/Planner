package com.Planner.PlanifyHub.domain.project.DTO;

import com.Planner.PlanifyHub.domain.issue.Entity.Issue;
import com.Planner.PlanifyHub.domain.project.Entity.Project;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ProjectDTO {
    private Long id;
    private String title;
    private String content;
    private String state;

    public ProjectDTO(Project project) {

        this.id = project.getId();
        this.title = project.getTitle();
        this.content = project.getContent();
        this.state = project.getState();
    }
}
