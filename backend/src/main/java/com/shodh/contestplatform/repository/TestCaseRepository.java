package com.shodh.contestplatform.repository;

import com.shodh.contestplatform.model.TestCase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TestCaseRepository extends JpaRepository<TestCase, Long> {
    List<TestCase> findByQuestionId(Long questionId);
    List<TestCase> findByQuestionIdAndIsSample(Long questionId, Boolean isSample);
}
