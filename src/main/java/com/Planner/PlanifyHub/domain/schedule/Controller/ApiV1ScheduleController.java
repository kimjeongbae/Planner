package com.Planner.PlanifyHub.domain.schedule.Controller;



import com.Planner.PlanifyHub.domain.schedule.Entity.Schedule;
import com.Planner.PlanifyHub.domain.schedule.Request.CreateRequest;
import com.Planner.PlanifyHub.domain.schedule.Request.UpdateRequest;
import com.Planner.PlanifyHub.domain.schedule.Response.CreateResponse;
import com.Planner.PlanifyHub.domain.schedule.Response.ScheduleResponse;
import com.Planner.PlanifyHub.domain.schedule.Response.UpdateResponse;
import com.Planner.PlanifyHub.domain.schedule.Service.ScheduleService;
import com.Planner.PlanifyHub.global.RsData.RsData;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/Schedules")
public class ApiV1ScheduleController {

    private final ScheduleService scheduleService;

    @PostMapping("")
    public RsData<CreateResponse> create(@Valid @RequestBody CreateRequest createRequest) {
        RsData<Schedule> ScheduleRs = this.scheduleService.create(createRequest.getAuthor() ,createRequest.getTitle(), createRequest.getContent(),createRequest.getColor(),createRequest.getStart_date(),createRequest.getEnd_date());

        if (ScheduleRs.isFail()) return (RsData) ScheduleRs;

        return RsData.of(
                ScheduleRs.getResultCode(),
                ScheduleRs.getMsg(),
                new CreateResponse(ScheduleRs.getData())
        );
    }

    @GetMapping("/{id}")
    public RsData<Schedule> getSchedule (@PathVariable("id") Long id) {
        return scheduleService.getSchedule(id).map(schedule -> RsData.of(
                "S-01",
                "Success 조회 성공",
                schedule
        )).orElseGet(() -> RsData.of(
                "F-01",
                "Bad Request %d 번 스케줄은 존재하지 않습니다.".formatted(id),
                null
        ));
    }
    @GetMapping("")
    public RsData<ScheduleResponse> getSchedules() {
        List<Schedule> schedules = this.scheduleService.getList();
        return RsData.of("S-01", "Success 요청 성공", new ScheduleResponse(schedules));
    }


    @PatchMapping("/{id}")
    public RsData update(@Valid @RequestBody UpdateRequest updateRequest, @PathVariable("id") Long id) {
        Optional<Schedule> optionalSchedule = this.scheduleService.findById(id);

        if (optionalSchedule.isEmpty()) return RsData.of(
                "F-01",
                "Bad Request %d번 스케줄은 존재하지 않습니다.".formatted(id),
                null
        );

        // 회원 권한 체크 canModify();

        RsData<Schedule> updateRs = this.scheduleService.update(optionalSchedule.get(), updateRequest.getTitle(), updateRequest.getContent(),updateRequest.getColor(),updateRequest.getStart_date(),updateRequest.getEnd_date());

        return RsData.of(
                updateRs.getResultCode(),
                updateRs.getMsg(),
                new UpdateResponse(updateRs.getData())
        );
    }


    @DeleteMapping("/{id}")
    public RsData<CreateRequest> delete(@PathVariable("id") Long id) {
        scheduleService.delete(id);
        return RsData.of(
                "S-01",
                "Success 삭제가 완료되었습니다."
        );
    }

}
