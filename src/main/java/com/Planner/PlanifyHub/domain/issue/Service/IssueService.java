package com.Planner.PlanifyHub.domain.issue.Service;

import com.Planner.PlanifyHub.domain.issue.Entity.Issue;
import com.Planner.PlanifyHub.domain.issue.Repository.IssueRepository;
import com.Planner.PlanifyHub.domain.member.Entity.Member;
import com.Planner.PlanifyHub.global.RsData.RsData;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class IssueService {

    private final IssueRepository issueRepository;

    public List<Issue> getList() {
        return this.issueRepository.findAll();
    }

    public Optional<Issue> getIsuue(Long id) {
        return this.issueRepository.findById(id);
    }

    @Transactional
    public RsData<Issue> create(Member member, String title, String content, String state) {
        Issue issue = Issue.builder()
                .author(member)
                .title(title)
                .content(content)
                .state(state)

                .build();

        this.issueRepository.save(issue);

        return RsData.of(
                "S-01",
                "Success 이슈가 생성 되었습니다.",
                issue
        );
    }

    public Optional<Issue> findById(Long id) {
        return issueRepository.findById(id);
    }

    public RsData<Issue> update(Issue issue, String title, String content,String state) {
        issue.setTitle(title);
        issue.setContent(content);
        issue.setState(state);
        issueRepository.save(issue);

        return RsData.of(
                "S-03",
                "Updated 이슈가 수정 되었습니다.",
                issue
        );
    }

    public void delete(Long id) {
        this.issueRepository.deleteById(id);
    }
}
