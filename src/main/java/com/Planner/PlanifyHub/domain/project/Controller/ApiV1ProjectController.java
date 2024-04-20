package com.Planner.PlanifyHub.domain.project.Controller;

import com.Planner.PlanifyHub.domain.project.Entity.Project;
import com.Planner.PlanifyHub.domain.project.Request.CreateRequest;
import com.Planner.PlanifyHub.domain.project.Request.UpdateRequest;
import com.Planner.PlanifyHub.domain.project.Response.CreateResponse;
import com.Planner.PlanifyHub.domain.project.Response.ProjectResponse;
import com.Planner.PlanifyHub.domain.project.Response.UpdateResponse;
import com.Planner.PlanifyHub.domain.project.Service.ProjectService;

import com.Planner.PlanifyHub.global.RsData.RsData;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/Projects")
public class ApiV1ProjectController {
    private final ProjectService projectService;

    @PostMapping("")
    public RsData<CreateResponse> create(@Valid @RequestBody CreateRequest createRequest) {
        RsData<Project> ProjectRs = this.projectService.create(createRequest.getAuthor() ,createRequest.getTitle(), createRequest.getContent());

        if (ProjectRs.isFail()) return (RsData) ProjectRs;

        return RsData.of(
                ProjectRs.getResultCode(),
                ProjectRs.getMsg(),
                new CreateResponse(ProjectRs.getData())
        );
    }

    @GetMapping("/{id}")
    public RsData<Project> getProject (@PathVariable("id") Long id) {
        return projectService.getProject(id).map(schedule -> RsData.of(
                "S-01",
                "Success 조회 성공",
                schedule
        )).orElseGet(() -> RsData.of(
                "F-01",
                "Bad Request %d 번 프로젝트는 존재하지 않습니다.".formatted(id),
                null
        ));
    }
    @GetMapping("")
    public RsData<ProjectResponse> getProjects() {
        List<Project> projects = this.projectService.getList();
        return RsData.of("S-01", "Success 요청 성공", new ProjectResponse(projects));
    }


    @PatchMapping("/{id}")
    public RsData update(@Valid @RequestBody UpdateRequest updateRequest, @PathVariable("id") Long id) {
        Optional<Project> optionalProject = this.projectService.findById(id);

        if (optionalProject.isEmpty()) return RsData.of(
                "F-01",
                "Bad Request %d번 프로젝트는 존재하지 않습니다.".formatted(id),
                null
        );

        // 회원 권한 체크 canModify();

        RsData<Project> updateRs = this.projectService.update(optionalProject.get(), updateRequest.getTitle(), updateRequest.getContent());

        return RsData.of(
                updateRs.getResultCode(),
                updateRs.getMsg(),
                new UpdateResponse(updateRs.getData())
        );
    }


    @DeleteMapping("/{id}")
    public RsData<CreateRequest> delete(@PathVariable("id") Long id) {
        projectService.delete(id);
        return RsData.of(
                "S-01",
                "Success 삭제가 완료되었습니다."
        );
    }

}
