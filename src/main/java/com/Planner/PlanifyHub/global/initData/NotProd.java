package com.Planner.PlanifyHub.global.initData;

import com.Planner.PlanifyHub.domain.calendar.Service.CalendarService;
import com.Planner.PlanifyHub.domain.member.Entity.Member;
import com.Planner.PlanifyHub.domain.member.Service.MemberService;
import com.Planner.PlanifyHub.domain.schedule.Service.ScheduleService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;

@Configuration
@Profile({"dev", "test"})
public class NotProd {
    @Bean
    CommandLineRunner initData(ScheduleService scheduleService, MemberService memberService, PasswordEncoder passwordEncoder) {
        String password = passwordEncoder.encode("1234");
        return args -> {
            // 회원 3명 추가
            Member user1 = memberService.join("user1","nickname1", password, "test@test.com");
            Member user2 = memberService.join("user2","nickname2", password, "test1@test.com");
            Member admin  = memberService.join("admin", "nickname3", password, "admin@test.com");


            // 작성자 회원 추가
            scheduleService.create(user1,"제목 1", "내용 1", "red", LocalDate.of(2024, 4, 7),LocalDate.of(2024, 4, 10));
            scheduleService.create(user1,"제목 2", "내용 2", "yellow", LocalDate.of(2024, 4, 7),LocalDate.of(2024, 4, 10));
            scheduleService.create(user2,"제목 3", "내용 3", "blue", LocalDate.of(2024, 4, 7),LocalDate.of(2024, 4, 10));
            scheduleService.create(user2,"제목 4", "내용 4", "purple", LocalDate.of(2024, 4, 7),LocalDate.of(2024, 4, 10));
            scheduleService.create(admin,"제목 5", "내용 5", "yellow", LocalDate.of(2024, 4, 7),LocalDate.of(2024, 4, 10));
        };
    }
}
