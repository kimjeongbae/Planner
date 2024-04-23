package com.Planner.PlanifyHub.domain.issue.Entity;

import com.Planner.PlanifyHub.domain.member.Entity.Member;
import com.Planner.PlanifyHub.domain.project.Entity.Project;
import com.Planner.PlanifyHub.global.jpa.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@ToString(callSuper = true)
public class Issue extends BaseEntity {
    @ManyToOne
    private Member author;
    private String title;
    private String content;
    private String state;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;
}
