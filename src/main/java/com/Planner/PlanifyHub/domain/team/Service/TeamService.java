package com.Planner.PlanifyHub.domain.team.Service;

import com.Planner.PlanifyHub.domain.member.Entity.Member;
import com.Planner.PlanifyHub.domain.schedule.Entity.Schedule;
import com.Planner.PlanifyHub.domain.team.Entity.Team;
import com.Planner.PlanifyHub.domain.team.Repository.TeamRepository;
import com.Planner.PlanifyHub.global.RsData.RsData;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class TeamService {
    private final TeamRepository teamRepository;

    public List<Team> getList() {
        return this.teamRepository.findAll();
    }

    public Optional<Team> getTeam(Long id) {

        return this.teamRepository.findById(id);
    }

    @Transactional
    public RsData<Team> create(Member member, String name, String content) {
        Team team = Team.builder()
                .author(member)
                .name(name)
                .content(content)
                .build();

        this.teamRepository.save(team);

        return RsData.of(
                "S-01",
                "Success 팀이 생성 되었습니다.",
                team
        );
    }

    public void delete(Long id) {
        this.teamRepository.deleteById(id);
    }
}
