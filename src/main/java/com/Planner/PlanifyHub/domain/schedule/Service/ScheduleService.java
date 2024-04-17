package com.Planner.PlanifyHub.domain.schedule.Service;

import com.Planner.PlanifyHub.domain.member.Entity.Member;
import com.Planner.PlanifyHub.domain.schedule.Entity.Schedule;
import com.Planner.PlanifyHub.domain.schedule.Repository.ScheduleRepository;
import com.Planner.PlanifyHub.global.RsData.RsData;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;

    public List<Schedule> getList() {
        return this.scheduleRepository.findAll();
    }

    public Optional<Schedule> getSchedule(Long id) {
        return this.scheduleRepository.findById(id);
    }

    @Transactional
    public RsData<Schedule> create(Member member, String title, String content, String color, LocalDate start_date, LocalDate end_date) {
        Schedule schedule = Schedule.builder()
                .author(member)
                .title(title)
                .content(content)
                .color(color)
                .start_date(start_date)
                .end_date(end_date)
                .build();

        this.scheduleRepository.save(schedule);

        return RsData.of(
                "S-3",
                "스케줄이 생성 되었습니다.",
                schedule
        );
    }

    public Optional<Schedule> findById(Long id) {
        return scheduleRepository.findById(id);
    }

    public RsData<Schedule> update(Schedule schedule, String title, String content,String color, LocalDate start_date, LocalDate end_date) {
        schedule.setTitle(title);
        schedule.setContent(content);
        schedule.setColor(color);
        schedule.setStart_date(start_date);
        schedule.setEnd_date(end_date);
        scheduleRepository.save(schedule);

        return RsData.of(
                "S-4",
                "스케줄이 수정 되었습니다.",
                schedule
        );
    }

    public void delete(Long id) {
        this.scheduleRepository.deleteById(id);
    }


}
