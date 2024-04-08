package com.Planner.PlanifyHub.domain.calendar.Service;

import com.Planner.PlanifyHub.domain.calendar.Entity.Calendar;
import com.Planner.PlanifyHub.domain.calendar.Repository.CalendarRepository;
import com.Planner.PlanifyHub.global.RsData.RsData;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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

    @Transactional
    public RsData<Calendar> create(String title, String content, String color, LocalDate start_date, LocalDate end_date) {
        Calendar calendar = Calendar.builder()
                .title(title)
                .content(content)
                .color(color)
                .start_date(start_date)
                .end_date(end_date)
                .build();

        this.calendarRepository.save(calendar);

        return RsData.of(
                "S-3",
                "스케줄이 생성 되었습니다.",
                calendar
        );
    }

    public Optional<Calendar> findById(Long id) {
        return calendarRepository.findById(id);
    }

    public RsData<Calendar> update(Calendar calendar, String title, String content,String color, LocalDate start_date, LocalDate end_date) {
        calendar.setTitle(title);
        calendar.setContent(content);
        calendar.setColor(color);
        calendar.setStart_date(start_date);
        calendar.setEnd_date(end_date);
        calendarRepository.save(calendar);

        return RsData.of(
                "S-4",
                "스케줄이 수정 되었습니다.",
                calendar
        );
    }

    public void delete(Long id) {
        this.calendarRepository.deleteById(id);
    }


}
