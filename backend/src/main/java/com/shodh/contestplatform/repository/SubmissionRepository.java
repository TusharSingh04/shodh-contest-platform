package com.shodh.contestplatform.repository;

import com.shodh.contestplatform.model.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    List<Submission> findByUserId(Long userId);
    List<Submission> findByQuestionId(Long questionId);
    List<Submission> findByUserIdAndQuestionId(Long userId, Long questionId);
    List<Submission> findByUserIdOrderBySubmittedAtDesc(Long userId);
}
