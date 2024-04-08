package com.Planner.PlanifyHub.domain.calendar.Entity;

import com.Planner.PlanifyHub.global.jpa.BaseEntity;
import jakarta.persistence.Entity;
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
public class Calendar extends BaseEntity {

    private String title;
    private String content;
    private String color;
    private LocalDate start_date;
    private LocalDate end_date;

}
