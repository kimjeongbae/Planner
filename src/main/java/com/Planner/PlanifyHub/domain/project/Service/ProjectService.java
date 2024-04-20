package com.Planner.PlanifyHub.domain.project.Service;

import com.Planner.PlanifyHub.domain.member.Entity.Member;
import com.Planner.PlanifyHub.domain.project.Entity.Project;
import com.Planner.PlanifyHub.domain.project.Repository.ProjectRepository;
import com.Planner.PlanifyHub.global.RsData.RsData;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProjectService {
    private final ProjectRepository projectRepository;

    public List<Project> getList() {
        return this.projectRepository.findAll();
    }

    public Optional<Project> getProject(Long id) {
        return this.projectRepository.findById(id);
    }

    @Transactional
    public RsData<Project> create(Member member, String title, String content) {
        Project project = Project.builder()
                .member(member)
                .title(title)
                .content(content)
                .build();

        this.projectRepository.save(project);

        return RsData.of(
                "S-01",
                "Success 프로젝트가 생성 되었습니다.",
                project
        );
    }

    public Optional<Project> findById(Long id) {
        return projectRepository.findById(id);
    }

    public RsData<Project> update(Project project, String title, String content) {
        project.setTitle(title);
        project.setContent(content);
        projectRepository.save(project);

        return RsData.of(
                "S-03",
                "Updated 프로젝트가 수정 되었습니다.",
                project
        );
    }

    public void delete(Long id) {
        this.projectRepository.deleteById(id);
    }
}
