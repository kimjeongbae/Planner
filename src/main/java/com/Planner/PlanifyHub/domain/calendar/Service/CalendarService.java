package com.Planner.PlanifyHub.domain.calendar.Service;

import com.Planner.PlanifyHub.domain.calendar.Entity.Calendar;
import com.Planner.PlanifyHub.domain.calendar.Repository.CalendarRepository;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CalendarService {

    private final CalendarRepository calendarRepository;

    public List<Calendar> getList() {
        return this.calendarRepository.findAll();
    }
    public Optional<Calendar> getCalendar(Long id) {
        return this.calendarRepository.findById(id);
    }


}
