package com.Planner.PlanifyHub.domain.team.Entity;

import com.Planner.PlanifyHub.domain.member.Entity.Member;
import com.Planner.PlanifyHub.global.jpa.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@ToString(callSuper = true)
public class Team extends BaseEntity {
    @ManyToOne
    private Member author;
    private String name;
    private String content;

}
