package com.Planner.PlanifyHub.domain.issue.Controller;

import com.Planner.PlanifyHub.domain.issue.DTO.IssueDTO;
import com.Planner.PlanifyHub.domain.issue.Entity.Issue;
import com.Planner.PlanifyHub.domain.issue.Request.CreateRequest;
import com.Planner.PlanifyHub.domain.issue.Request.UpdateRequest;
import com.Planner.PlanifyHub.domain.issue.Response.CreateResponse;
import com.Planner.PlanifyHub.domain.issue.Response.IssueResponse;
import com.Planner.PlanifyHub.domain.issue.Response.IssuesResponse;
import com.Planner.PlanifyHub.domain.issue.Response.UpdateResponse;
import com.Planner.PlanifyHub.domain.issue.Service.IssueService;
import com.Planner.PlanifyHub.global.RsData.RsData;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/Issues")
public class ApiV1IssueController {

    private final IssueService issueService;

    @PostMapping("")
    public RsData<CreateResponse> create(@Valid @RequestBody CreateRequest createRequest) {
        RsData<Issue> IssueRs = this.issueService.create(createRequest.getAuthor() ,createRequest.getTitle(), createRequest.getContent(),createRequest.getState());

        if (IssueRs.isFail()) return (RsData) IssueRs;

        return RsData.of(
                IssueRs.getResultCode(),
                IssueRs.getMsg(),
                new CreateResponse(IssueRs.getData())
        );
    }

    @GetMapping("/{id}")
    public RsData<IssueResponse> getIssue(@PathVariable("id") Long id) {
        return issueService.getIsuue(id).map(issue -> RsData.of(
                "S-01",
                "Success 조회 성공",
                new IssueResponse(new IssueDTO(issue))
        )).orElseGet(() -> RsData.of(
                "F-01",
                "Bad Request %d 번 이슈는 존재하지 않습니다.".formatted(id),
                null
        ));
    }
    @GetMapping("")
    public RsData<IssuesResponse> getIssues() {
        List<IssueDTO> issueDTOList = this.issueService
                .getList()
                .stream()
                .map(issues -> new IssueDTO(issues))
                .toList();
        return RsData.of("S-01", "성공", new IssuesResponse(issueDTOList));
    }


    @PatchMapping("/{id}")
    public RsData update(@Valid @RequestBody UpdateRequest updateRequest, @PathVariable("id") Long id) {
        Optional<Issue> optionalIssue = this.issueService.findById(id);

        if (optionalIssue.isEmpty()) return RsData.of(
                "F-01",
                "Bad Request %d번 이슈는 존재하지 않습니다.".formatted(id),
                null
        );

        // 회원 권한 체크 canModify();

        RsData<Issue> updateRs = this.issueService.update(optionalIssue.get(), updateRequest.getTitle(), updateRequest.getContent(),updateRequest.getState());

        return RsData.of(
                updateRs.getResultCode(),
                updateRs.getMsg(),
                new UpdateResponse(updateRs.getData())
        );
    }


    @DeleteMapping("/{id}")
    public RsData<CreateRequest> delete(@PathVariable("id") Long id) {
        issueService.delete(id);
        return RsData.of(
                "S-01",
                "Success 삭제가 완료되었습니다."
        );
    }
}
