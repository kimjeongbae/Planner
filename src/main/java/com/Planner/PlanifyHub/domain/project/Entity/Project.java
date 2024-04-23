package com.Planner.PlanifyHub.domain.project.Entity;

import com.Planner.PlanifyHub.domain.issue.Entity.Issue;
import com.Planner.PlanifyHub.domain.member.Entity.Member;
import com.Planner.PlanifyHub.domain.team.Entity.Team;
import com.Planner.PlanifyHub.global.jpa.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@ToString(callSuper = true)
public class Project extends BaseEntity {
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    @JsonIgnore
    private Member member;

    private String title;
    private String content;
    private String state;

    @ManyToOne
    @JoinColumn(name = "team_id")
    private Team team;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Issue> issues;


}
