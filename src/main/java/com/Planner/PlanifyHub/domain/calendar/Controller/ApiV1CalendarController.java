package com.Planner.PlanifyHub.domain.calendar.Controller;

import com.Planner.PlanifyHub.domain.calendar.Entity.Calendar;
import com.Planner.PlanifyHub.domain.calendar.Response.CalendarResponse;
import com.Planner.PlanifyHub.domain.calendar.Service.CalendarService;
import com.Planner.PlanifyHub.global.RsData.RsData;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/Calendars")
public class ApiV1CalendarController {

    private final CalendarService calendarService;

    @GetMapping("/{id}")
    public RsData<Calendar> getCalendar (@PathVariable("id") Long id) {
        return calendarService.getCalendar(id).map(calendar -> RsData.of(
                "S-01",
                "Success 조회 성공",
                calendar
        )).orElseGet(() -> RsData.of(
                "F-01",
                "Bad Request %d 번 플래너는 존재하지 않습니다.".formatted(id),
                null
        ));
    }
    @GetMapping("")
    public RsData<CalendarResponse> getCalendars() {
        List<Calendar> calendars = this.calendarService.getList();
        return RsData.of("S-01", "Success 요청 성공", new CalendarResponse(calendars));
    }


}
