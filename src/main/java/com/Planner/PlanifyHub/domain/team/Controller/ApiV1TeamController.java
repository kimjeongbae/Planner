package com.Planner.PlanifyHub.domain.team.Controller;

import com.Planner.PlanifyHub.domain.schedule.Entity.Schedule;

import com.Planner.PlanifyHub.domain.team.Entity.Team;
import com.Planner.PlanifyHub.domain.team.Request.CreateRequest;
import com.Planner.PlanifyHub.domain.team.Response.CreateResponse;
import com.Planner.PlanifyHub.domain.team.Service.TeamService;
import com.Planner.PlanifyHub.global.RsData.RsData;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/vi/Teams")
public class ApiV1TeamController {

    private final TeamService teamService;

    @PostMapping("")
    public RsData<CreateResponse> create(@Valid @RequestBody CreateRequest createRequest) {
        RsData<Team> TeamRs = this.teamService.create(createRequest.getAuthor(), createRequest.getName(), createRequest.getContent());

        if (TeamRs.isFail()) return (RsData) TeamRs;

        return RsData.of(
                TeamRs.getResultCode(),
                TeamRs.getMsg(),
                new CreateResponse(TeamRs.getData())
        );
    }

    @DeleteMapping("/{id}")
    public RsData<CreateRequest> delete(@PathVariable("id") Long id) {
        teamService.delete(id);
        return RsData.of(
                "S-01",
                "Success 팀 삭제가 완료되었습니다."
        );
    }
}
