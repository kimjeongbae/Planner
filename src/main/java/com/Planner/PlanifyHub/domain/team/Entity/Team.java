package com.Planner.PlanifyHub.domain.team.Entity;

import com.Planner.PlanifyHub.global.jpa.BaseEntity;
import jakarta.persistence.Entity;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@ToString(callSuper = true)
public class Team extends BaseEntity {
    private String name;
    private String content;

}
