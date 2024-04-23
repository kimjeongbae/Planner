package com.Planner.PlanifyHub.domain.member.Repository;

import com.Planner.PlanifyHub.domain.member.Entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByUsername(String username);
    Optional<Member> findByEmail(String email);
    Optional<Member> findByRefreshToken(String refreshToken);

}
