package com.Planner.PlanifyHub.domain.issue.DTO;

import com.Planner.PlanifyHub.domain.issue.Entity.Issue;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class IssueDTO {
    private Long id;
    private String title;
    private String content;

    public IssueDTO(Issue issue) {

        this.id = issue.getId();
        this.title = issue.getTitle();
        this.content = issue.getContent();
    }

}
