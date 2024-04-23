package com.Planner.PlanifyHub.domain.project.Controller;

import com.Planner.PlanifyHub.domain.project.DTO.ProjectDTO;
import com.Planner.PlanifyHub.domain.project.Entity.Project;
import com.Planner.PlanifyHub.domain.project.Request.CreateRequest;
import com.Planner.PlanifyHub.domain.project.Request.UpdateRequest;
import com.Planner.PlanifyHub.domain.project.Response.CreateResponse;
import com.Planner.PlanifyHub.domain.project.Response.ProjectResponse;
import com.Planner.PlanifyHub.domain.project.Response.ProjectsResponse;
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
        RsData<Project> ProjectRs = this.projectService.create(createRequest.getAuthor() ,createRequest.getTitle(), createRequest.getContent(), createRequest.getState());

        if (ProjectRs.isFail()) return (RsData) ProjectRs;

        return RsData.of(
                ProjectRs.getResultCode(),
                ProjectRs.getMsg(),
                new CreateResponse(ProjectRs.getData())
        );
    }

    @GetMapping("/{id}")
    public RsData<ProjectResponse> getProject(@PathVariable("id") Long id) {
        return projectService.getProject(id).map(project -> RsData.of(
                "S-01",
                "Success 조회 성공",
                new ProjectResponse(new ProjectDTO(project))
        )).orElseGet(() -> RsData.of(
                "F-01",
                "Bad Request %d 번 프로젝트는 존재하지 않습니다.".formatted(id),
                null
        ));
    }
    @GetMapping("")
    public RsData<ProjectsResponse> getProjects() {
        List<ProjectDTO> projectDTOList = this.projectService
                .getList()
                .stream()
                .map(project -> new ProjectDTO(project))
                .toList();
        return RsData.of("S-01", "성공", new ProjectsResponse(projectDTOList));
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

        RsData<Project> updateRs = this.projectService.update(optionalProject.get(), updateRequest.getTitle(), updateRequest.getContent(), updateRequest.getState());

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
