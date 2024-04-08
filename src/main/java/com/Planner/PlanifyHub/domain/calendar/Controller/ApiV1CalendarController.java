package com.Planner.PlanifyHub.domain.calendar.Controller;

import com.Planner.PlanifyHub.domain.calendar.Entity.Calendar;
import com.Planner.PlanifyHub.domain.calendar.Request.CreateRequest;
import com.Planner.PlanifyHub.domain.calendar.Request.UpdateRequest;
import com.Planner.PlanifyHub.domain.calendar.Response.CalendarResponse;
import com.Planner.PlanifyHub.domain.calendar.Response.CreateResponse;
import com.Planner.PlanifyHub.domain.calendar.Response.UpdateResponse;
import com.Planner.PlanifyHub.domain.calendar.Service.CalendarService;
import com.Planner.PlanifyHub.global.RsData.RsData;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/Calendars")
public class ApiV1CalendarController {

    private final CalendarService calendarService;

    @PostMapping("")
    public RsData<CreateResponse> create(@Valid @RequestBody CreateRequest createRequest) {
        RsData<Calendar>  CalendarRs = this.calendarService.create(createRequest.getTitle(), createRequest.getContent(),createRequest.getColor(),createRequest.getStart_date(),createRequest.getEnd_date());

        if (CalendarRs.isFail()) return (RsData) CalendarRs;

        return RsData.of(
                CalendarRs.getResultCode(),
                CalendarRs.getMsg(),
                new CreateResponse(CalendarRs.getData())
        );
    }

    @GetMapping("/{id}")
    public RsData<Calendar> getCalendar (@PathVariable("id") Long id) {
        return calendarService.getCalendar(id).map(calendar -> RsData.of(
                "S-1",
                "성공",
                calendar
        )).orElseGet(() -> RsData.of(
                "F-1",
                "%d 번 스케줄은 존재하지 않습니다.".formatted(id),
                null
        ));
    }
    @GetMapping("")
    public RsData<CalendarResponse> getCalendars() {
        List<Calendar> calendars = this.calendarService.getList();
        return RsData.of("S-1", "성공", new CalendarResponse(calendars));
    }


    @PatchMapping("/{id}")
    public RsData update(@Valid @RequestBody UpdateRequest updateRequest, @PathVariable("id") Long id) {
        Optional<Calendar> optionalCalendar = this.calendarService.findById(id);

        if (optionalCalendar.isEmpty()) return RsData.of(
                "F-1",
                "%d번 스케줄은 존재하지 않습니다.".formatted(id),
                null
        );

        // 회원 권한 체크 canModify();

        RsData<Calendar> updateRs = this.calendarService.update(optionalCalendar.get(), updateRequest.getTitle(), updateRequest.getContent(),updateRequest.getColor(),updateRequest.getStart_date(),updateRequest.getEnd_date());

        return RsData.of(
                updateRs.getResultCode(),
                updateRs.getMsg(),
                new UpdateResponse(updateRs.getData())
        );
    }


    @DeleteMapping("/{id}")
    public RsData<CreateResponse> delete(@PathVariable("id") Long id) {
        calendarService.delete(id);
        return RsData.of(
                "S-1",
                "삭제가 완료되었습니다."
        );
    }




}
