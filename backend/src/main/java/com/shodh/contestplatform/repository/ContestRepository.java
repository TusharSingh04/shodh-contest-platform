package com.shodh.contestplatform.repository;

import com.shodh.contestplatform.model.Contest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ContestRepository extends JpaRepository<Contest, Long> {
    List<Contest> findByStatus(Contest.ContestStatus status);
    List<Contest> findByStatusOrderByCreatedAtDesc(Contest.ContestStatus status);
}
